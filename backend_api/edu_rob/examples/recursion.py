# 6. Recursion
def recursive_square(depth):
    if depth == 0:
        return

    for _ in range(4):
        forwards()
        right()
    recursive_square(depth - 1)

recursive_square(3)