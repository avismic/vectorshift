def execute(node, nodes, edges):
    data = node.get("data", {})
    
    operation = data.get("operation", "add")
    
    try:
        input_a = float(data.get("A", 0))
    except (ValueError, TypeError):
        input_a = 0

    try:
        input_b = float(data.get("B", 0))
    except (ValueError, TypeError):
        input_b = 0

    print(f"  > Math Node: Calculating {input_a} {operation} {input_b}")

    result = 0
    if operation == 'add':
        result = input_a + input_b
    elif operation == 'subtract':
        result = input_a - input_b
    elif operation == 'multiply':
        result = input_a * input_b
    elif operation == 'divide':
        if input_b != 0:
            result = input_a / input_b
        else:
            result = 0
            print("  > Warning: Division by zero.")
    return {"value": result}
