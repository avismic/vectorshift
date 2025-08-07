import hashlib
import hmac

def execute(node, nodes, edges):
    data = node.get("data", {})
    
    input_text = data.get("input_text", "")
    algorithm = data.get("algorithm", "sha256")
    secret_key = data.get("secret_key", "")

    print(f"  > Hash Node: Hashing '{input_text}' with {algorithm}")

    if not hasattr(hashlib, algorithm):
        error_msg = f"Error: Unsupported algorithm '{algorithm}'"
        print(f"    > {error_msg}")
        return {"value": error_msg}

    text_bytes = input_text.encode('utf-8')
    key_bytes = secret_key.encode('utf-8')

    if secret_key:
        print(f"    > Computing HMAC with secret key.")
        h = hmac.new(key_bytes, text_bytes, getattr(hashlib, algorithm))
    
    else:
        hasher = getattr(hashlib, algorithm)
        h = hasher(text_bytes)

    result_hash = h.hexdigest()
    return {"value": result_hash}
