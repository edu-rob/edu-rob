import os

import openai
from dotenv import load_dotenv
from .constants import ROBOT_API_FILE

# In this file, functions for treating strings and querying the OpenAI API are defined

def md_to_python(md):
    """
    Removes the ```python from the markdown code block
    """
    return md.replace("```python", "").replace("```", "")


def query_llm(prompt):
    """
    Queries openai API and returns a ChatGPT-generated script (as a string) for getting 
    the machine instructions (FORWARDS, BACKWARDS, LEFT, RIGHT)
    """

    load_dotenv()
    openai_api_key = os.getenv("OPENAI_API_KEY")
    client = openai.OpenAI(api_key=openai_api_key)

    with open(ROBOT_API_FILE, "r") as file:
        moving_definition = file.read()
        
    messages=[
    {"role": "system", "content": f"You are a coding assistant that only outputs function code in python.\
    You do not explain the code, only give the function, and do not include comments.  \
    Only the following functions are allowed : \npython{moving_definition}. Do not define any other functions. \
    The functions specified above will move a robot. Make any scripts as simple as possible. \
    Only the following keywords are allowed : if, else, for, while. Make the query the most instructive possible to teach those keywords"},
    {"role": "user", "content": f"Write a python code in one script for the instruction {prompt}. Include the correct number of instructions"}
    ]

    response = client.chat.completions.create(model="gpt-4o",messages=messages)

    return md_to_python(response.choices[0].message.content)


if __name__ == "__main__":
    print(query_llm("The robot moves forwards 10 times and backwards 5 times using a while loop"))
    print(query_llm("The robot moves forwards 10 times and turns to the right every two steps"))