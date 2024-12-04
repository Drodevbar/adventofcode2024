import { SolutionFn } from "../../utils/contract"

const isXMas = (i: number, j: number, matrix: string[][]): boolean => {
  if (i + 2 >= matrix.length || j + 2 >= matrix[i].length) {
    return false
  }

  const isFirstMas =
    (matrix[i][j] === "M" && matrix[i + 1][j + 1] === "A" && matrix[i + 2][j + 2] === "S") ||
    (matrix[i][j] === "S" && matrix[i + 1][j + 1] === "A" && matrix[i + 2][j + 2] === "M")

  const isSecondMas =
    (matrix[i][j + 2] === "M" && matrix[i + 1][j + 1] === "A" && matrix[i + 2][j] === "S") ||
    (matrix[i][j + 2] === "S" && matrix[i + 1][j + 1] === "A" && matrix[i + 2][j] === "M")

  return isFirstMas && isSecondMas
}

const solution: SolutionFn = async (input: string[]) => {
  const matrix = input.map((val) => [...val])

  let xmasCounter = 0

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      xmasCounter += isXMas(i, j, matrix) ? 1 : 0
    }
  }

  return xmasCounter.toString()
}

export default solution
