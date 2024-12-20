import { SolutionFn } from "../../utils/contract"

const findShortestPath = (matrix: string[][], start: [number, number], end: [number, number]): number => {
  const visited: boolean[][] = Array.from({ length: matrix.length }, (_, i) => Array.from({ length: matrix[i].length }, () => false))
  const distance: number[][] = Array.from({ length: matrix.length }, (_, i) =>
    Array.from({ length: matrix[i].length }, () => Number.POSITIVE_INFINITY),
  )

  distance[start[0]][start[1]] = 0
  const queue: [number, number][] = [start]

  while (queue.length > 0 && distance[end[0]][end[1]] === Number.POSITIVE_INFINITY) {
    const [x, y] = queue.shift()

    for (const [i, j] of [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ]) {
      const [xx, yy] = [x + i, y + j]

      if (xx < 0 || xx >= matrix.length || yy < 0 || yy >= matrix[x].length || visited[xx][yy] || matrix[xx][yy] === "#") {
        continue
      }

      visited[xx][yy] = true
      distance[xx][yy] = distance[x][y] + 1
      queue.push([xx, yy])
    }
  }

  return distance[end[0]][end[1]]
}

const solution: SolutionFn = async (input: string[]) => {
  const matrix = input.map((row) => [...row])

  const startIndexX = matrix.findIndex((row) => row.includes("S"))
  const startIndexY = matrix[startIndexX].findIndex((cell) => cell === "S")
  const endIndexX = matrix.findIndex((row) => row.includes("E"))
  const endIndexY = matrix[endIndexX].findIndex((cell) => cell === "E")

  const cheatsFreeShortestPath = findShortestPath(matrix, [startIndexX, startIndexY], [endIndexX, endIndexY])

  const shortestPaths: number[] = []

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] !== "#") {
        continue
      }

      matrix[i][j] = "."
      const shortestPath = findShortestPath(matrix, [startIndexX, startIndexY], [endIndexX, endIndexY])
      if (shortestPath <= cheatsFreeShortestPath - 100) {
        shortestPaths.push(shortestPath)
      }
      matrix[i][j] = "#"
    }
  }

  return shortestPaths.length.toString()
}

export default solution
