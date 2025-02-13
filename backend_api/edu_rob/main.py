import os
import sys


from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from io import StringIO

from . import schemas
from .query_openai import query_llm
from .constants import FUNCTION_SET, ROBOT_API_FILE, EXAMPLES_FOLDER

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def print_line_numbers(code: str) -> str:
    """
    Adds line numbers to the code
    """
    code_result = ""
    for i, line in enumerate(code.split("\n")):
        code_result += line + "\n"
        if any(func in line for func in FUNCTION_SET):
            white_char_len = len(line) - len(line.lstrip())
            code_result += f"{line[:white_char_len]}print(\"#{i}\")\n"

    return code_result

def execute_code(code: str) -> tuple[str, str]:
    with open(ROBOT_API_FILE, "r") as file:
        old_stdout = sys.stdout
        old_stderr = sys.stderr

        new_stdout = StringIO()
        new_stderr = StringIO()

        sys.stdout = new_stdout
        sys.stderr = new_stderr

        exec(file.read() + "\n" + code)

        result = new_stdout.getvalue().strip()[:-1]
        error = new_stderr.getvalue().strip()

        sys.stdout = old_stdout
        sys.stderr.stderr = old_stderr

        return result, error

@app.get("/api/examples/")
def get_examples() -> list[schemas.ExampleResponse]:
    examples = []
    for filename in os.listdir(EXAMPLES_FOLDER):
        with open(os.path.join(EXAMPLES_FOLDER, filename), "r") as file:
            examples.append(schemas.ExampleResponse(name=filename, contents=file.read()))
    return examples

@app.post("/api/execute", response_model=schemas.ExecutionResponse)
def run_code(execute: schemas.Execute, debug: bool = False):
    code = print_line_numbers(execute.code) if debug else execute.code

    robot_commands, err = execute_code(code)

    return schemas.ExecutionResponse(robot_commands=robot_commands.split(","), err=err)

@app.post("/api/generate", response_model=schemas.GenerationResponse)
def generate_code(generate: schemas.Generate, debug: bool = False):
    gen_code = query_llm(generate.prompt)
    code = print_line_numbers(gen_code) if debug else gen_code
    print(code)
    robot_commands, err = execute_code(code)
    return schemas.GenerationResponse(robot_commands=robot_commands.split(","), err=err, code=gen_code)


# app.mount("/", SPAStaticFiles(directory=".//app/build", html=True), name="frontend")

if __name__ == "__main__":
    print(print_line_numbers(
"""for i in range(10):
    forwards()
    if (i + 1) % 2 == 0:
        right()
    else:
        left()
    """))

