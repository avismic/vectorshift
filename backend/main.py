import json
import re
from collections import deque
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from nodes import text_node, input_node, llm_node

print("--- LOADING LATEST main.py CODE ---")

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
    
    # Use a dictionary for quick node lookups by ID
    nodes = {node['id']: node for node in nodes_list}

    # --- Topological Sort Implementation ---
    # 1. Build adjacency list and calculate in-degrees for each node
    adj = {node_id: [] for node_id in nodes}
    in_degree = {node_id: 0 for node_id in nodes}
    for edge in edges:
        source, target = edge['source'], edge['target']
        if source in adj and target in in_degree:
            adj[source].append(target)
            in_degree[target] += 1

    # 2. Initialize a queue with all nodes that have an in-degree of 0
    # These are the starting nodes of the pipeline (e.g., Input, LLM with no inputs)
    queue = deque([node_id for node_id, degree in in_degree.items() if degree == 0])
    
    # 3. Process the pipeline
    while queue:
        node_id = queue.popleft()
        current_node = nodes[node_id]
        node_type = current_node.get('type')

        # Execute the node's logic if it has an executor function
        if node_type in node_executors:
            executor = node_executors[node_type]
            # The result is the data to be passed to the next node(s)
            result = executor.execute(current_node, nodes, edges)

            # For each neighbor of the current node...
            for neighbor_id in adj[node_id]:
                neighbor_node = nodes[neighbor_id]
                # ...update its data with the result from the current node
                if 'data' not in neighbor_node:
                    neighbor_node['data'] = {}
                neighbor_node['data'].update(result)
                
                # ...decrement its in-degree and if it becomes 0, add to queue
                in_degree[neighbor_id] -= 1
                if in_degree[neighbor_id] == 0:
                    queue.append(neighbor_id)

    return {"nodes": list(nodes.values())}

