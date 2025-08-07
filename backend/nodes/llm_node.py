import os
import time
import threading
import re
from dotenv import load_dotenv
from google import genai

load_dotenv()

API_KEY = os.getenv("GOOGLE_API_KEY")
MODEL   = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
CPM     = int(os.getenv("GEMINI_CPM", "30"))

if not API_KEY:
    raise RuntimeError("GOOGLE_API_KEY missing in environment")

_MIN_INTERVAL = 60.0 / CPM
_last_call    = 0.0
_rate_lock    = threading.Lock()

client = genai.Client(api_key=API_KEY)

VAR_RE = re.compile(r'\{\{([a-zA-Z0-9_]+)\}\}')

def execute(node, nodes, edges):
    data = node.get("data", {})
    raw_template = data.get("prompt", "").strip()
    if not raw_template:
        raise ValueError(f"LLM node {node['id']} has empty prompt")

    def replace_variable(match):
        var = match.group(1)
        return str(data.get(var, ""))

    resolved_prompt = VAR_RE.sub(replace_variable, raw_template)

    with _rate_lock:
        global _last_call
        now = time.time()
        delta = now - _last_call
        if delta < _MIN_INTERVAL:
            time.sleep(_MIN_INTERVAL - delta)
        _last_call = time.time()

    response = client.models.generate_content(
        model=MODEL,
        contents=resolved_prompt
    )

    text = response.text or ""
    return {"value": text}
