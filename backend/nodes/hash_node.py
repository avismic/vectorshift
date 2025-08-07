import hashlib
import hmac

def execute(node, nodes, edges):
    """
    Computes a cryptographic hash or HMAC for the given input text.
    """
    data = node.get("data", {})
    
    input_text = data.get("input_text", "")
    algorithm = data.get("algorithm", "sha256")
    secret_key = data.get("secret_key", "")

    print(f"  > Hash Node: Hashing '{input_text}' with {algorithm}")

    # Ensure the chosen algorithm is supported by hashlib
    if not hasattr(hashlib, algorithm):
        error_msg = f"Error: Unsupported algorithm '{algorithm}'"
        print(f"    > {error_msg}")
        return {"value": error_msg}

    # Encode strings to bytes, which is required for hashing
    text_bytes = input_text.encode('utf-8')
    key_bytes = secret_key.encode('utf-8')

    # --- HMAC (Keyed-Hash) Logic ---
    if secret_key:
        print(f"    > Computing HMAC with secret key.")
        # Create an HMAC object with the key, text, and algorithm
        h = hmac.new(key_bytes, text_bytes, getattr(hashlib, algorithm))
    
    # --- Standard Hash Logic ---
    else:
        # Get the constructor for the chosen algorithm (e.g., hashlib.sha256)
        hasher = getattr(hashlib, algorithm)
        h = hasher(text_bytes)

    # Return the hexadecimal representation of the hash
    result_hash = h.hexdigest()
    return {"value": result_hash}
