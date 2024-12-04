import { SolutionFn } from "../../utils/contract"

const countXmasWords = (i: number, j: number, matrix: string[][]): number => {
  const isXmasSentence = (letters: string[]): boolean => {
    return letters[0] === "X" && letters[1] === "M" && letters[2] === "A" && letters[3] === "S"
  }

  let counter = 0

  // right
  counter += j + 3 < matrix[i].length && isXmasSentence([matrix[i][j], matrix[i][j + 1], matrix[i][j + 2], matrix[i][j + 3]]) ? 1 : 0
  // left
  counter += j - 3 >= 0 && isXmasSentence([matrix[i][j], matrix[i][j - 1], matrix[i][j - 2], matrix[i][j - 3]]) ? 1 : 0
  // up
  counter += i + 3 < matrix.length && isXmasSentence([matrix[i][j], matrix[i + 1][j], matrix[i + 2][j], matrix[i + 3][j]]) ? 1 : 0
  // down
  counter += i - 3 >= 0 && isXmasSentence([matrix[i][j], matrix[i - 1][j], matrix[i - 2][j], matrix[i - 3][j]]) ? 1 : 0
  // diagonal right up
  counter +=
    i + 3 < matrix.length &&
    j + 3 < matrix[i].length &&
    isXmasSentence([matrix[i][j], matrix[i + 1][j + 1], matrix[i + 2][j + 2], matrix[i + 3][j + 3]])
      ? 1
      : 0
  // diagonal right down
  counter +=
    i - 3 >= 0 &&
    j + 3 < matrix[i].length &&
    isXmasSentence([matrix[i][j], matrix[i - 1][j + 1], matrix[i - 2][j + 2], matrix[i - 3][j + 3]])
      ? 1
      : 0
  // diagonal left down
  counter +=
    i - 3 >= 0 && j - 3 >= 0 && isXmasSentence([matrix[i][j], matrix[i - 1][j - 1], matrix[i - 2][j - 2], matrix[i - 3][j - 3]]) ? 1 : 0
  // diagonal left up
  counter +=
    i + 3 < matrix.length && j - 3 >= 0 && isXmasSentence([matrix[i][j], matrix[i + 1][j - 1], matrix[i + 2][j - 2], matrix[i + 3][j - 3]])
      ? 1
      : 0

  return counter
}

const solution: SolutionFn = async (input: string[]) => {
  const matrix = input.map((val) => [...val])

  let xmasCounter = 0

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      xmasCounter += countXmasWords(i, j, matrix)
    }
  }

  return xmasCounter.toString()
}

export default solution
