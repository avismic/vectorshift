import json
import re
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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