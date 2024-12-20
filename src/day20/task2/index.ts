import { SolutionFn } from "../../utils/contract"

const findShortestPath = (matrix: string[][], start: [number, number], end: [number, number]) => {
  const visited: boolean[][] = Array.from({ length: matrix.length }, (_, i) => Array.from({ length: matrix[i].length }, () => false))
  const distance: number[][] = Array.from({ length: matrix.length }, (_, i) =>
    Array.from({ length: matrix[i].length }, () => Number.POSITIVE_INFINITY),
  )

  distance[start[0]][start[1]] = 0
  visited[start[0]][start[1]] = true
  const queue: [number, number][] = [start]
  const path: [number, number][] = [start]

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
      path.push([xx, yy])
    }
  }

  return path
}

const solution: SolutionFn = async (input: string[]) => {
  const matrix = input.map((row) => [...row])

  const startIndexX = matrix.findIndex((row) => row.includes("S"))
  const startIndexY = matrix[startIndexX].findIndex((cell) => cell === "S")
  const endIndexX = matrix.findIndex((row) => row.includes("E"))
  const endIndexY = matrix[endIndexX].findIndex((cell) => cell === "E")

  const cheatsFreeShortestPath = findShortestPath(matrix, [startIndexX, startIndexY], [endIndexX, endIndexY])
  const distanceWithoutCheating = cheatsFreeShortestPath.length - 1

  const shortestPaths: number[] = []

  cheatsFreeShortestPath.slice(0, -1).forEach(([x, y], currIndex) => {
    const manhattanDistances: number[][] = Array.from({ length: matrix.length }, () => Array.from({ length: matrix.length }, () => -1))

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        manhattanDistances[i][j] = Math.abs(i - x) + Math.abs(j - y)
      }
    }

    for (let leap = 2; leap <= 20; leap++) {
      const pointsWithMatchingDistance: [number, number][] = []

      for (let u = 0; u < matrix.length; u++) {
        for (let v = 0; v < matrix[u].length; v++) {
          if (manhattanDistances[u][v] === leap && matrix[u][v] !== "#") {
            pointsWithMatchingDistance.push([u, v])
          }
        }
      }

      pointsWithMatchingDistance.forEach((leapPoint) => {
        const index = cheatsFreeShortestPath.findIndex((p) => p[0] === leapPoint[0] && p[1] === leapPoint[1])

        if (index !== -1) {
          const distance = currIndex + distanceWithoutCheating - index + leap

          if (distance <= distanceWithoutCheating - 100) {
            shortestPaths.push(distance)
          }
        }
      })
    }
  })

  return shortestPaths.length.toString()
}

export default solution
