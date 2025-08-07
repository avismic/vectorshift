def execute(node, nodes, edges):
    """
    Takes an input string and transforms its case based on the
    selected operation from the node's data.
    """
    data = node.get("data", {})
    
    # Get the input string from the connected node
    input_text = str(data.get("value", ""))
    
    # Get the desired operation from the node's dropdown
    operation = data.get("operation", "uppercase") # Default to uppercase

    print(f"  > Change Case Node: Applying '{operation}' to '{input_text}'")

    if operation == 'uppercase':
        result_text = input_text.upper()
    elif operation == 'lowercase':
        result_text = input_text.lower()
    elif operation == 'titlecase':
        result_text = input_text.title()
    elif operation == 'capitalize':
        result_text = input_text.capitalize()
    else:
        # If the operation is unknown, return the original text
        result_text = input_text

    # Return the transformed text in the standard format
    return {"value": result_text}
