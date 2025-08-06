def execute(node, nodes, edges):
    value = node.get('data', {}).get('value', '')
    return {'value': value}