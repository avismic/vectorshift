import json
import re
from collections import deque
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from nodes import text_node, input_node, llm_node, json_node, change_case_node, conditional_node, math_node, matrix_mult_node, hash_node

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

node_executors = {
    'text': text_node,
    'customInput': input_node,
    'llm': llm_node,
    'json': json_node,
    'changeCase': change_case_node,
    'conditional': conditional_node,
    'math': math_node,
    'matrixMult': matrix_mult_node,
    'hash': hash_node,
}

def has_cycle(graph, node, visiting, visited):
    visiting.add(node)
    for neighbor in graph.get(node, []):
        if neighbor in visiting:
            return True
        if neighbor not in visited:
            if has_cycle(graph, neighbor, visiting, visited):
                return True
    visiting.remove(node)
    visited.add(node)
    return False

def check_is_dag(nodes, edges):
    if not nodes:
        return True
    graph = {node['id']: [] for node in nodes}
    node_ids = set(graph.keys())
    for edge in edges:
        source, target = edge.get('source'), edge.get('target')
        if source in node_ids and target in node_ids:
            graph[source].append(target)
    visiting = set()
    visited = set()
    for node_id in node_ids:
        if node_id not in visited:
            if has_cycle(graph, node_id, visiting, visited):
                return False
    return True

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    data = json.loads(pipeline)
    nodes = data.get('nodes', [])
    edges = data.get('edges', [])
    num_nodes = len(nodes)
    num_edges = len(edges)
    is_dag = check_is_dag(nodes, edges)
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag,
    }

@app.post('/pipelines/run')
def run_pipeline(pipeline: str = Form(...)):
    data = json.loads(pipeline)
    nodes_list = data.get('nodes', [])
    edges = data.get('edges', [])
    
    nodes = {node['id']: node for node in nodes_list}
    adj = {node_id: [] for node_id in nodes}
    in_degree = {node_id: 0 for node_id in nodes}
    edge_map = {(edge['source'], edge['target']): edge for edge in edges}

    for edge in edges:
        source, target = edge['source'], edge['target']
        if source in adj and target in in_degree:
            adj[source].append(target)
            in_degree[target] += 1

    queue = deque([node_id for node_id, degree in in_degree.items() if degree == 0])
    
    print("\n--- Starting Pipeline Run ---")
    while queue:
        node_id = queue.popleft()
        current_node = nodes[node_id]
        node_type = current_node.get('type')

        print(f"Processing node: {node_id} (type: {node_type})")

        if node_type in node_executors:
            executor = node_executors[node_type]
            result = executor.execute(current_node, nodes, edges)
            print(f"  > Node {node_id} executed. Result: {result}")

            if node_type == 'conditional':
                condition_met = result.get('condition_met', False)
                passthrough_value = result.get('passthrough_value')
                handle_to_follow = 'true-output' if condition_met else 'false-output'
                print(f"  > Condition result: {condition_met}. Following '{handle_to_follow}' path.")

                for neighbor_id in adj[node_id]:
                    edge = edge_map.get((node_id, neighbor_id))
                    if not edge: continue
                    
                    source_handle = edge.get('sourceHandle', '')
                    if handle_to_follow in source_handle:
                        print(f"    > Routing to {neighbor_id}")
                        neighbor_node = nodes[neighbor_id]
                        if 'data' not in neighbor_node: neighbor_node['data'] = {}
                        neighbor_node['data']['value'] = passthrough_value
                        
                        in_degree[neighbor_id] -= 1
                        if in_degree[neighbor_id] == 0:
                            queue.append(neighbor_id)
            else:
                for neighbor_id in adj[node_id]:
                    neighbor_node = nodes[neighbor_id]
                    edge = edge_map.get((node_id, neighbor_id))
                    if not edge: continue

                    source_handle = edge.get('sourceHandle')
                    value_to_pass = None

                    if source_handle:
                        parts = source_handle.split('-')
                        if len(parts) > 2:
                            key = parts[-3] 
                            if isinstance(result, dict) and key in result:
                                value_to_pass = result[key]
                    
                    if value_to_pass is None:
                        value_to_pass = result.get('value') if isinstance(result, dict) else result

                    if 'data' not in neighbor_node: neighbor_node['data'] = {}
                    if 'value' in neighbor_node['data']:
                        if value_to_pass is not None:
                           neighbor_node['data']['value'] = value_to_pass
                    else:
                        neighbor_node['data']['value'] = value_to_pass
                    
                    in_degree[neighbor_id] -= 1
                    if in_degree[neighbor_id] == 0:
                        queue.append(neighbor_id)
    
    print("--- Pipeline Run Finished ---\n")
    return {"nodes": list(nodes.values())}