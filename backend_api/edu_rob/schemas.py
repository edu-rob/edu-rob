from pydantic import BaseModel

from enum import Enum

class ExampleResponse(BaseModel):
    name: str
    contents: str

class Execute(BaseModel):
    code: str

class ExecutionResponse(BaseModel):
    robot_commands: list[str]
    error: str | None = None

class Generate(BaseModel):
    prompt: str

class GenerationResponse(ExecutionResponse):
    code: str | None = None
