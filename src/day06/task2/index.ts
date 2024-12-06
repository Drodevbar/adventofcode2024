import { SolutionFn } from "../../utils/contract"

type Direction = "left" | "right" | "up" | "down"

const OBSTRUCTION = "#"
const GUARD = "^"

const isInfinityLoop = (x: number, y: number, matrix: string[][]): boolean => {
  const distinctPositionsSet = new Set<string>()

  let direction: Direction = "up"
  let xx = x
  let yy = y
  let moves = 0

  while (xx > 0 && xx < matrix.length - 1 && yy > 0 && yy < matrix[0].length - 1) {
    moves++
    distinctPositionsSet.add(`${xx}:${yy}`)

    switch (direction) {
      case "up":
        if (matrix[xx - 1][yy] !== OBSTRUCTION) xx--
        else direction = "right"
        break
      case "right":
        if (matrix[xx][yy + 1] !== OBSTRUCTION) yy++
        else direction = "down"
        break
      case "down":
        if (matrix[xx + 1][yy] !== OBSTRUCTION) xx++
        else direction = "left"
        break
      case "left":
        if (matrix[xx][yy - 1] !== OBSTRUCTION) yy--
        else direction = "up"
        break
      default:
        throw new Error("Whoops!")
    }

    if (moves > 100_000) {
      return true
    }
  }

  return false
}

const solution: SolutionFn = async (input: string[]) => {
  const matrix = input.map((line) => [...line])
  const guardXIndex = matrix.findIndex((line) => line.includes(GUARD))
  const guardYIndex = matrix[guardXIndex].findIndex((val) => val === GUARD)

  let infinityLoopsCount = 0

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (![OBSTRUCTION, GUARD].includes(matrix[i][j])) {
        const modifiedMatrix = matrix.map((row) => [...row])
        modifiedMatrix[i][j] = OBSTRUCTION
        if (isInfinityLoop(guardXIndex, guardYIndex, modifiedMatrix)) {
          infinityLoopsCount++
        }
      }
    }
  }

  return infinityLoopsCount.toString()
}

export default solution
