import openai
import os
from dotenv import load_dotenv


def query_llm(prompt):
    """
    Queries openai API and returns a ChatGPT python generated file for getting 
    the machine instructions (FORWARDS, BACKWARDS, LEFT, RIGHT)
    """
    
    load_dotenv()
    openai_api_key = os.getenv("OPENAI_API_KEY")
    client = openai.OpenAI(api_key=openai_api_key)
    prompt = "While there is no boundary, go forward"

    with open("moving_instances.py", "r") as file:
        moving_definition = file.read()
    
    messages=[
    {"role": "system", "content": "You are a coding assistant that only outputs function code in python.\
      You do not explain the code, only give the function, and do not include comments."},
    {"role": "user", "content": f"Write a python code in one script for the instruction \"{prompt}\"\
     Only the following functions are allowed : \npython{moving_definition}\
     Only the following keywords are allowed : if, else, for"}
    ]

    response = client.chat.completions.create(model="gpt-4o",messages=messages)
    #print(messages)

    return response.choices[0].message.content


if __name__ == "__main__":
    query_llm("The robot moves forwards 10 times and backwards 5 times")