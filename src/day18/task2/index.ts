import { SolutionFn } from "../../utils/contract"

const GRID_SIZE = 70

// BFS
const isPathPossible = (matrix: string[][]): boolean => {
  const visited: boolean[][] = Array.from({ length: matrix.length }, (_, i) => Array.from({ length: matrix[i].length }, () => false))
  const distance: number[][] = Array.from({ length: matrix.length }, (_, i) =>
    Array.from({ length: matrix[i].length }, () => Number.POSITIVE_INFINITY),
  )

  distance[0][0] = 0
  const queue: [number, number][] = [[0, 0]]

  while (queue.length > 0 && distance[matrix.length - 1][matrix.length - 1] === Number.POSITIVE_INFINITY) {
    const [x, y] = queue.shift()

    for (const [i, j] of [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ]) {
      const [xx, yy] = [x + i, y + j]

      if (xx < 0 || xx >= matrix.length || yy < 0 || yy >= matrix[x].length || visited[xx][yy] || matrix[xx][yy] !== ".") {
        continue
      }

      visited[xx][yy] = true
      distance[xx][yy] = distance[x][y] + 1
      queue.push([xx, yy])
    }
  }

  return distance[matrix.length - 1][matrix.length - 1] !== Number.POSITIVE_INFINITY
}

const solution: SolutionFn = async (input: string[]) => {
  const matrix = Array.from({ length: GRID_SIZE + 1 }, () => Array.from({ length: GRID_SIZE + 1 }, () => "."))
  const bytesCoords = input.map((row) => row.split(",").map((i) => +i)) as [number, number][]

  let blockingCoords = [-1, -1]

  for (let i = 0; i < bytesCoords.length; i++) {
    const [x, y] = bytesCoords[i]
    matrix[x][y] = "#"

    if (!isPathPossible(matrix)) {
      blockingCoords = [x, y]
      break
    }
  }

  return `${blockingCoords[0]},${blockingCoords[1]}`
}

export default solution
