import json
import sys
import urllib.error
import urllib.request
import uuid


base = sys.argv[1].rstrip("/")
email = f"ci-{uuid.uuid4().hex}@tsdcem.ac.in"
password = "Ci-Smoke-Pass-123!"


def request(path, method="GET", payload=None, token=None, expected=200):
    body = None if payload is None else json.dumps(payload).encode()
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    req = urllib.request.Request(base + path, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=15) as response:
            status, data = response.status, response.read()
    except urllib.error.HTTPError as error:
        status, data = error.code, error.read()
    if status != expected:
        raise RuntimeError(f"{method} {path}: expected {expected}, received {status}: {data.decode()}")
    return json.loads(data) if data else None


registered = request("/auth/register", "POST", {
    "name": "CI Smoke Student",
    "email": email,
    "password": password,
    "department": "Engineering",
    "year": "2",
}, expected=201)
token = registered["token"]
identity = request("/auth/me", token=token)
assert identity["email"] == email, identity

post = request("/posts", "POST", {
    "title": "CI persisted post",
    "content": "Created by the authenticated smoke test",
    "category": "GENERAL",
}, token=token, expected=201)
posts = request("/posts", token=token)
assert any(item["id"] == post["id"] for item in posts), post

request("/posts", token=None, expected=401)
print("Backend smoke test passed: registration, JWT identity, protected CRUD, and unauthenticated rejection.")
