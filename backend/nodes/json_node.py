import json

def execute(node, nodes, edges):
    data = node.get("data", {})
    
    json_string = data.get("value")

    if not json_string:
        json_string = data.get("sampleJson", "{}")

    try:
        parsed_json = json.loads(json_string)
        return parsed_json
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON in node {node['id']}: {json_string}")
        return {}
