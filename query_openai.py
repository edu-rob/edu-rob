import openai

import os

from dotenv import load_dotenv


load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")


client = openai.OpenAI(api_key=openai_api_key)


prompt = "While there is no boundary, go forward"



response = client.chat.completions.create(

model="gpt-4o",

messages=[

{"role": "system", "content": "You are a coding assistant that only outputs function code in python. You do not explain the code, only give the function, and do not include comments."},

{"role": "user", "content": f"Write the python code for {prompt}"}

]

)


print(response.choices[0].message.content)