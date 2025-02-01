import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from query_openai import print_line_numbers

def test_print_line_numbers():
    code = '''for _ in range(10):
    forwards()

for _ in range(5):
    backwards()'''
    
    print("original code : \n", code)
    print("code with prints : \n ", print_line_numbers(code))


if __name__== "__main__":
    test_print_line_numbers()