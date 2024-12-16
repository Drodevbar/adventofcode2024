import { SolutionFn } from "../../utils/contract"

const getAdjacentEdges = (matrix: string[][], current: [number, number]) => {
  const adjacentEdges: [number, number][] = []

  const [x, y] = current
  const currentVal = matrix[x][y]

  if (x - 1 >= 0 && matrix[x - 1][y] === currentVal) {
    adjacentEdges.push([x - 1, y])
  }

  if (x + 1 < matrix.length && matrix[x + 1][y] === currentVal) {
    adjacentEdges.push([x + 1, y])
  }

  if (y - 1 >= 0 && matrix[x][y - 1] === currentVal) {
    adjacentEdges.push([x, y - 1])
  }

  if (y + 1 < matrix[x].length && matrix[x][y + 1] === currentVal) {
    adjacentEdges.push([x, y + 1])
  }

  return adjacentEdges
}

const performDfsReturningAreaAndPerimeter = (
  matrix: string[][],
  current: [number, number],
  visited: boolean[][],
): { area: number; perimeter: number } => {
  visited[current[0]][current[1]] = true

  let area = 1
  let perimeter = 4

  const adjacentEdges = getAdjacentEdges(matrix, current)
  perimeter -= adjacentEdges.length

  for (const edge of adjacentEdges) {
    if (!visited[edge[0]][edge[1]]) {
      const result = performDfsReturningAreaAndPerimeter(matrix, edge, visited)
      area += result.area
      perimeter += result.perimeter
    }
  }

  return { area, perimeter }
}

const solution: SolutionFn = async (input: string[]) => {
  const matrix = input.map((line) => [...line.split("")])
  const visited = matrix.map((line) => line.map(() => false))
  const areasAndPerimeters: [number, number][] = []

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (!visited[i][j]) {
        const { area, perimeter } = performDfsReturningAreaAndPerimeter(matrix, [i, j], visited)
        areasAndPerimeters.push([area, perimeter])
      }
    }
  }

  const price = areasAndPerimeters.reduce((acc, [area, perimeter]) => acc + area * perimeter, 0)

  return price.toString()
}

export default solution
