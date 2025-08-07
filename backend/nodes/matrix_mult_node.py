import numpy as np
import json

def execute(node, nodes, edges):
    data = node.get("data", {})
    
    matrix_a_str = data.get("matrix_a", "[]")
    matrix_b_str = data.get("matrix_b", "[]")

    print(f"  > Matrix Mult Node: Multiplying A={matrix_a_str} and B={matrix_b_str}")

    try:
        matrix_a = np.array(json.loads(matrix_a_str))
        matrix_b = np.array(json.loads(matrix_b_str))

        result_matrix = np.dot(matrix_a, matrix_b)

        result_str = json.dumps(result_matrix.tolist())
        
        print(f"    > Result: {result_str}")
        return {"value": result_str}

    except json.JSONDecodeError:
        error_msg = "Error: Invalid matrix format. Use JSON array format, e.g., [[1, 2], [3, 4]]"
        print(f"    > {error_msg}")
        return {"value": error_msg}
    except ValueError as e:
        error_msg = f"Error: {e}"
        print(f"    > {error_msg}")
        return {"value": error_msg}

