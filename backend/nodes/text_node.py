import re

def execute(node, nodes, edges):
    template = node.get('data', {}).get('text', '')
    
    def replace_variable(match):
        variable_name = match.group(1)
        return str(node.get('data', {}).get(variable_name, ''))

    resolved_text = re.sub(r'\{\{([a-zA-Z0-9_]+)\}\}', replace_variable, template)
    
    return {'value': resolved_text}