def execute(node, nodes, edges):
    data = node.get("data", {})
    
    input_a = str(data.get("value", ""))  
    input_b = str(data.get("comparison_value", "")) 
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
        result = False

    return {"passthrough_value": data.get("value"), "condition_met": result}
