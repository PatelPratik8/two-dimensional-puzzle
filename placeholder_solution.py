#!/usr/bin/env python3
import sys
from dataclasses import dataclass
from typing import TextIO


# To run this from the terminal:
# python placeholder_solution.py < ./tests/eval-3-3-12.puzzle

@dataclass
class Brick:
    colours: []
    scores: []


def read_input(input_stream: TextIO):
    lines = input_stream.readlines()

    assert len(lines) > 0, "Input is empty"
    problem_data = lines[0].split()
    assert len(problem_data) == 3, "Problem description is invalid"

    num_colors = int(problem_data[0])
    num_columns = int(problem_data[1])
    num_bricks = int(problem_data[2])

    bricks: list[Brick] = []
    for idx, block_data in enumerate(lines[1:]):
        data = list(map(int, block_data.split()))

        bricks.append(
            Brick(
                colours=data[::2],
                scores=data[1::2],
            )
        )

    return num_colors, num_columns, bricks


def main():
    num_colors, num_columns, bricks = read_input(sys.stdin)

    # A placeholder algorithm
    # Print the score of the first brick
    print(sum(bricks[0].scores))

    # Print the index of the first brick
    print("0")


if __name__ == '__main__':
    main()
