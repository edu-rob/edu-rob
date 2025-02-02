# import subprocess
# from backend_api.edu_rob.query_openai import query_llm
#
# with open("robot_api.py", "r") as file:
#     python_input = file.read() + "\n" + "\n" + query_llm("The robot moves forwards 10 times and backwards 5 times")
#
# command = "python3 -c \"{}\"".format(python_input)
# print("COMMAND : ", command)
# result = subprocess.run(command, shell=True, capture_output=True, text=True).stdout
# print("RESULT : ")
# print(result)
#
#
