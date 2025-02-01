import os
import sys
import subprocess
from query_openai import query_llm

with open("moving_api.py", "r") as file:
    python_input = file.read() + "\n" + "\n" + query_llm("The robot moves forwards 10 times and backwards 5 times")

command = "python3 -c {}".format(python_input)
print("command is : ", command)
result = subprocess.run(command, shell=True, capture_output=True, text=True).stdout
print(result)


