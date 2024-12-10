import { SolutionFn } from "../../utils/contract"

const getAdjacentEdges = (matrix: number[][], current: number[]) => {
  const adjacentEdges: number[][] = []

  const [x, y] = current
  const currentVal = matrix[x][y]

  if (x - 1 >= 0 && matrix[x - 1][y] === currentVal + 1) {
    adjacentEdges.push([x - 1, y])
  }

  if (x + 1 < matrix.length && matrix[x + 1][y] === currentVal + 1) {
    adjacentEdges.push([x + 1, y])
  }

  if (y - 1 >= 0 && matrix[x][y - 1] === currentVal + 1) {
    adjacentEdges.push([x, y - 1])
  }

  if (y + 1 < matrix[x].length && matrix[x][y + 1] === currentVal + 1) {
    adjacentEdges.push([x, y + 1])
  }

  return adjacentEdges
}

const performDfsReturningScore = (matrix: number[][], current: number[], visited: Set<string>, visitedEndVertices: Set<string>): number => {
  if (matrix[current[0]][current[1]] === 9 && !visitedEndVertices.has(`${current[0]}:${current[1]}`)) {
    visitedEndVertices.add(`${current[0]}:${current[1]}`)
    return 1
  }

  visited.add(`${current[0]}:${current[1]}`)

  const adjacentEdges = getAdjacentEdges(matrix, current)

  let score = 0

  for (const edge of adjacentEdges) {
    if (!visited.has(`${edge[0]}:${edge[1]}`)) {
      score += performDfsReturningScore(matrix, edge, visited, visitedEndVertices)
    }
  }

  return score
}

const solution: SolutionFn = async (input: string[]) => {
  const matrix = input.map((line) => [...line.split("").map((val) => +val)])

  const startingPoints: number[][] = []

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 0) {
        startingPoints.push([i, j])
      }
    }
  }

  const scores = startingPoints.map((point) => performDfsReturningScore(matrix, point, new Set(), new Set()))

  const scoresSum = scores.reduce((a, b) => a + b, 0)

  return scoresSum.toString()
}

export default solution
