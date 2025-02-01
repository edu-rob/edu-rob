from pydantic import BaseModel

from enum import Enum

class Test(BaseModel):
    test_response: str | None = None

class ExecutionResponse(BaseModel):
    code: str | None = None
    robot_commands: str | None = None
    error: str | None = None
