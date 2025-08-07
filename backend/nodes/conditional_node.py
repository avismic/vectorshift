def execute(node, nodes, edges):
    """
    Performs a comparison and returns the boolean result.
    This result is used by the pipeline runner to decide the flow path.
    """
    data = node.get("data", {})
    
    # Get the input value, the value to compare against, and the operator
    input_a = str(data.get("value", ""))  # The value from the connected node
    input_b = str(data.get("comparison_value", "")) # The value typed into the node
    operator = data.get("operator", "==")

    print(f"  > Conditional Node: Comparing '{input_a}' {operator} '{input_b}'")

    try:
        if operator == '==':
            result = input_a == input_b
        elif operator == '!=':
            result = input_a != input_b
        elif operator == '>':
            result = float(input_a) > float(input_b)
        elif operator == '<':
            result = float(input_a) < float(input_b)
        elif operator == '>=':
            result = float(input_a) >= float(input_b)
        elif operator == '<=':
            result = float(input_a) <= float(input_b)
        elif operator == 'contains':
            result = input_b in input_a
        elif operator == 'not contains':
            result = input_b not in input_a
        else:
            result = False
    except (ValueError, TypeError):
        # Handle cases where conversion to float fails for non-numeric strings
        result = False

    # Return the original input value and the boolean result of the comparison
    return {"passthrough_value": data.get("value"), "condition_met": result}
