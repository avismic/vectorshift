import numpy as np
import json

def execute(node, nodes, edges):
    """
    Parses two matrix strings, multiplies them using numpy,
    and returns the result as a string.
    """
    data = node.get("data", {})
    
    # Get the raw text for Matrix A and Matrix B from the node's data
    matrix_a_str = data.get("matrix_a", "[]")
    matrix_b_str = data.get("matrix_b", "[]")

    print(f"  > Matrix Mult Node: Multiplying A={matrix_a_str} and B={matrix_b_str}")

    try:
        # Use json.loads to safely parse the string into a list of lists
        matrix_a = np.array(json.loads(matrix_a_str))
        matrix_b = np.array(json.loads(matrix_b_str))

        # Perform matrix multiplication using numpy's dot product function
        result_matrix = np.dot(matrix_a, matrix_b)

        # Convert the resulting numpy array back to a list of lists, then to a string
        result_str = json.dumps(result_matrix.tolist())
        
        print(f"    > Result: {result_str}")
        return {"value": result_str}

    except json.JSONDecodeError:
        error_msg = "Error: Invalid matrix format. Use JSON array format, e.g., [[1, 2], [3, 4]]"
        print(f"    > {error_msg}")
        return {"value": error_msg}
    except ValueError as e:
        # This catches errors from numpy, like mismatched dimensions
        error_msg = f"Error: {e}"
        print(f"    > {error_msg}")
        return {"value": error_msg}

