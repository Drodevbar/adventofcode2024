import { SolutionFn } from "../../utils/contract"

type Direction = "left" | "right" | "up" | "down"

const OBSTRUCTION = "#"
const GUARD = "^"

const countDistinctPositions = (x: number, y: number, matrix: string[][]): number => {
  const distinctPositionsSet = new Set<string>()

  let direction: Direction = "up"
  let xx = x
  let yy = y

  while (xx > 0 && xx < matrix.length - 1 && yy > 0 && yy < matrix[0].length - 1) {
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
  }

  return distinctPositionsSet.size + 1
}

const solution: SolutionFn = async (input: string[]) => {
  const matrix = input.map((line) => [...line])
  const guardXIndex = matrix.findIndex((line) => line.includes(GUARD))
  const guardYIndex = matrix[guardXIndex].findIndex((val) => val === GUARD)

  return countDistinctPositions(guardXIndex, guardYIndex, matrix).toString()
}

export default solution
