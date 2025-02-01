from fastapi import FastAPI, HTTPException
from tempfile import NamedTemporaryFile

from . import schemas

app = FastAPI()

@app.get("/", response_model=schemas.Test)
def test():
    return schemas.Test(test_response="this is a test")

@app.post("/api/run-code", response_model=schemas.ExecutionResponse)
def run_code(code: str | None = None):
    if code is None:
        raise HTTPException(status_code=400, detail="No code provided")
    # TODO
    return schemas.ExecutionResponse()


