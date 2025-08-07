def execute(node, nodes, edges):
    data = node.get("data", {})
    
    input_text = str(data.get("value", ""))
    
    operation = data.get("operation", "uppercase") 

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
        result_text = input_text

    return {"value": result_text}
