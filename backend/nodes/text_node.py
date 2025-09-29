import re

def execute(node, nodes, edges):
    """
    Executes the text node by resolving a template string and returning
    separate output values for the resolved string and each variable.
    """
    data = node.get('data', {})
    template = data.get('text', '')
    
    # This will hold all our output values, keyed by handle name
    output_data = {}

    # This function will run for each {{variable}} found
    def replace_variable(match):
        variable_name = match.group(1)
        # Get the value for the variable from the node's data
        variable_value = str(data.get(variable_name, ''))
        # Store this variable's value for its own specific output handle
        output_data[variable_name] = variable_value
        return variable_value

    # Run the replacement on the template to get the final string
    resolved_text = re.sub(r'\{\{([a-zA-Z0-9_]+)\}\}', replace_variable, template)
    
    # The main output handle is named 'main' in the frontend. Store the full text here.
    output_data['main'] = resolved_text
    
    # Also set a default 'value' to the full resolved text for generic connections.
    output_data['value'] = resolved_text
    
    return output_data