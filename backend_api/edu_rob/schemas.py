from pydantic import BaseModel

class ExampleResponse(BaseModel):
    name: str
    contents: str

class Execute(BaseModel):
    code: str

class ExecutionResponse(BaseModel):
    robot_commands: str | None = None
    error: str | None = None

class Generate(BaseModel):
    prompt: str

class GenerationResponse(ExecutionResponse):
    code: str | None = None
