import { SolutionFn } from "../../utils/contract"

const NUMERIC_KEYPAD = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
  ["-1", "0", "A"],
]

const ROBOT_KEYPAD = [
  ["-1", "^", "A"],
  ["<", "v", ">"],
]

const findShortestPaths = (matrix: string[][], start: [number, number], end: [number, number]) => {
  const distance: number[][] = Array.from({ length: matrix.length }, (_, i) =>
    Array.from({ length: matrix[i].length }, () => Number.POSITIVE_INFINITY),
  )
  const predecessors: [number, number][][][] = Array.from({ length: matrix.length }, (_, i) =>
    Array.from({ length: matrix[i].length }, () => []),
  )

  distance[start[0]][start[1]] = 0
  const queue: [number, number][] = [start]

  while (queue.length > 0) {
    const [x, y] = queue.shift()!

    const neighboursDirections = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ]

    for (const [i, j] of neighboursDirections) {
      const [xx, yy] = [x + i, y + j]

      if (xx < 0 || xx >= matrix.length || yy < 0 || yy >= matrix[x].length || matrix[xx][yy] === "-1") {
        continue
      }

      const newDist = distance[x][y] + 1

      if (newDist < distance[xx][yy]) {
        distance[xx][yy] = newDist
        predecessors[xx][yy] = [[x, y]]
        queue.push([xx, yy])
      } else if (newDist === distance[xx][yy]) {
        predecessors[xx][yy].push([x, y])
      }
    }
  }

  if (distance[end[0]][end[1]] === Number.POSITIVE_INFINITY) {
    return [] // No path found
  }

  const paths: string[][] = []

  const backtrack = (current: [number, number], path: string[]) => {
    if (current[0] === start[0] && current[1] === start[1]) {
      paths.push(path.slice().reverse())
      return
    }

    for (const [px, py] of predecessors[current[0]][current[1]]) {
      const [diffI, diffJ] = [px - current[0], py - current[1]]
      if (diffI === 0 && diffJ === -1) path.push(">")
      else if (diffI === 0 && diffJ === 1) path.push("<")
      else if (diffI === -1 && diffJ === 0) path.push("v")
      else path.push("^")

      backtrack([px, py], path)
      path.pop() // Backtrack
    }
  }

  backtrack(end, [])
  return paths
}

const solution: SolutionFn = async (input: string[]) => {
  const codesList = input.map((row) => [...row])
  const lengthOfShortestSentences: number[] = []

  for (const singleCodesLine of codesList) {
    const numericPaths: string[][][] = []

    // console.log(singleCodesLine)

    let numericStartIndexX = null
    let numericStartIndexY = null
    let numericEndIndexX = null
    let numericEndIndexY = null

    for (const code of singleCodesLine) {
      numericStartIndexX = numericEndIndexX ?? 3
      numericStartIndexY = numericEndIndexY ?? 2
      numericEndIndexX = NUMERIC_KEYPAD.findIndex((row) => row.includes(code))
      numericEndIndexY = NUMERIC_KEYPAD[numericEndIndexX].findIndex((r) => r === code)

      const numericKeyPadPaths = findShortestPaths(
        NUMERIC_KEYPAD,
        [numericStartIndexX, numericStartIndexY],
        [numericEndIndexX, numericEndIndexY],
      ).map((path) => [...path, "A"])

      numericPaths.push(numericKeyPadPaths)
    }

    console.log("numericPaths")
    console.log(numericPaths)

    const robotPaths1: string[][][] = []

    let robot1StartIndexX = null
    let robot1StartIndexY = null
    let robot1EndIndexX = null
    let robot1EndIndexY = null

    for (const paths of numericPaths) {
      for (const nestedPaths of paths) {
        for (const code of nestedPaths) {
          robot1StartIndexX = robot1EndIndexX ?? 0
          robot1StartIndexY = robot1EndIndexY ?? 2
          robot1EndIndexX = ROBOT_KEYPAD.findIndex((row) => row.includes(code))
          robot1EndIndexY = ROBOT_KEYPAD[robot1EndIndexX].findIndex((r) => r === code)

          const robotKeyPadPaths = findShortestPaths(
            ROBOT_KEYPAD,
            [robot1StartIndexX, robot1StartIndexY],
            [robot1EndIndexX, robot1EndIndexY],
          ).map((path) => [...path, "A"])

          robotPaths1.push(robotKeyPadPaths)
        }
      }
    }

    console.log("robotPaths1")
    console.log(robotPaths1)

    const robotPaths2: string[][][] = []

    let robot2StartIndexX = null
    let robot2StartIndexY = null
    let robot2EndIndexX = null
    let robot2EndIndexY = null

    for (const paths of robotPaths1) {
      for (const nestedPaths of paths) {
        for (const code of nestedPaths) {
          robot2StartIndexX = robot2EndIndexX ?? 0
          robot2StartIndexY = robot2EndIndexY ?? 2
          robot2EndIndexX = ROBOT_KEYPAD.findIndex((row) => row.includes(code))
          robot2EndIndexY = ROBOT_KEYPAD[robot2EndIndexX].findIndex((r) => r === code)

          const robotKeyPadPaths = findShortestPaths(
            ROBOT_KEYPAD,
            [robot2StartIndexX, robot2StartIndexY],
            [robot2EndIndexX, robot2EndIndexY],
          ).map((path) => [...path, "A"])

          robotPaths2.push(robotKeyPadPaths)
        }
      }
    }

    console.log("robotPaths2")
    console.log(robotPaths2)

    // const minLengthArray = robotPaths2.reduce((minArr, currentArr) => {
    //   return currentArr.length < minArr.length ? currentArr : minArr
    // }, robotPaths2[0])
    //
    // console.log(minLengthArray)
  }

  const complexities = lengthOfShortestSentences.map((length, index) => {
    const numericPartOfCode = +codesList[index].join("").replaceAll("A", "")

    return length * numericPartOfCode
  })

  const sumOfComplexities = complexities.reduce((a, b) => a + b, 0)

  return sumOfComplexities.toString()

  return ""
}

export default solution
