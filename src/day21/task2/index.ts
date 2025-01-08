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

const findShortestPath = (matrix: string[][], start: [number, number], end: [number, number]) => {
  const visited: boolean[][] = Array.from({ length: matrix.length }, (_, i) => Array.from({ length: matrix[i].length }, () => false))
  const distance: number[][] = Array.from({ length: matrix.length }, (_, i) =>
    Array.from({ length: matrix[i].length }, () => Number.POSITIVE_INFINITY),
  )
  const previous: ([number, number] | null)[][] = Array.from({ length: matrix.length }, (_, i) =>
    Array.from({ length: matrix[i].length }, () => null),
  )

  distance[start[0]][start[1]] = 0
  visited[start[0]][start[1]] = true
  const queue: [number, number][] = [start]
  previous[start[0]][start[1]] = null

  while (queue.length > 0 && distance[end[0]][end[1]] === Number.POSITIVE_INFINITY) {
    const [x, y] = queue.shift()

    const neighboursDirections = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ]

    for (const [i, j] of neighboursDirections) {
      const [xx, yy] = [x + i, y + j]

      if (
        xx < 0 ||
        xx >= matrix.length ||
        yy < 0 ||
        yy >= matrix[x].length ||
        visited[xx][yy] ||
        matrix[xx][yy] === "-1" ||
        distance[end[0]][end[1]] !== Number.POSITIVE_INFINITY
      ) {
        continue
      }

      visited[xx][yy] = true
      distance[xx][yy] = distance[x][y] + 1
      queue.push([xx, yy])
      previous[xx][yy] = [x, y]
    }
  }

  const path: string[] = []
  let ptr = end

  do {
    const tmp = ptr
    ptr = previous[tmp[0]][tmp[1]]

    if (ptr === null) {
      continue
    }

    const [diffI, diffJ] = [ptr[0] - tmp[0], ptr[1] - tmp[1]]

    if (diffI === 0 && diffJ === -1) path.push(">")
    else if (diffI === 0 && diffJ === 1) path.push("<")
    else if (diffI === -1 && diffJ === 0) path.push("v")
    else path.push("^")
  } while (ptr !== null)

  return path.reverse().sort()
}

const solution: SolutionFn = async (input: string[]) => {
  const codesList = input.map((row) => [...row])
  const lengthOfShortestSentences: number[] = []

  for (const singleCodesLine of codesList) {
    const numericPath: string[] = []

    console.log(singleCodesLine)

    let numericStartIndexX = null
    let numericStartIndexY = null
    let numericEndIndexX = null
    let numericEndIndexY = null

    for (const code of singleCodesLine) {
      numericStartIndexX = numericEndIndexX ?? 3
      numericStartIndexY = numericEndIndexY ?? 2
      numericEndIndexX = NUMERIC_KEYPAD.findIndex((row) => row.includes(code))
      numericEndIndexY = NUMERIC_KEYPAD[numericEndIndexX].findIndex((r) => r === code)

      // console.log("numericEndIndexX", numericEndIndexX)
      // console.log("numericEndIndexY", numericEndIndexY)

      const numericKeyPadPath = findShortestPath(
        NUMERIC_KEYPAD,
        [numericStartIndexX, numericStartIndexY],
        [numericEndIndexX, numericEndIndexY],
      )

      numericPath.push(...numericKeyPadPath)
      numericPath.push("A")
    }

    const robotPath1: string[] = []

    let robot1StartIndexX = null
    let robot1StartIndexY = null
    let robot1EndIndexX = null
    let robot1EndIndexY = null

    for (const code of numericPath) {
      robot1StartIndexX = robot1EndIndexX ?? 0
      robot1StartIndexY = robot1EndIndexY ?? 2
      robot1EndIndexX = ROBOT_KEYPAD.findIndex((row) => row.includes(code))
      robot1EndIndexY = ROBOT_KEYPAD[robot1EndIndexX].findIndex((r) => r === code)

      const robotKeyPadPath = findShortestPath(ROBOT_KEYPAD, [robot1StartIndexX, robot1StartIndexY], [robot1EndIndexX, robot1EndIndexY])

      robotPath1.push(...robotKeyPadPath)
      robotPath1.push("A")
    }

    const robotPath2: string[] = []

    let robot2StartIndexX = null
    let robot2StartIndexY = null
    let robot2EndIndexX = null
    let robot2EndIndexY = null

    for (const code of robotPath1) {
      robot2StartIndexX = robot2EndIndexX ?? 0
      robot2StartIndexY = robot2EndIndexY ?? 2
      robot2EndIndexX = ROBOT_KEYPAD.findIndex((row) => row.includes(code))
      robot2EndIndexY = ROBOT_KEYPAD[robot2EndIndexX].findIndex((r) => r === code)

      const robotKeyPadPath = findShortestPath(ROBOT_KEYPAD, [robot2StartIndexX, robot2StartIndexY], [robot2EndIndexX, robot2EndIndexY])

      robotPath2.push(...robotKeyPadPath)
      robotPath2.push("A")
    }

    console.log(numericPath.join(""))
    console.log(robotPath1.join(""))
    console.log(robotPath2.join(""))

    lengthOfShortestSentences.push(robotPath2.length)
  }

  const complexities = lengthOfShortestSentences.map((length, index) => {
    const numericPartOfCode = +codesList[index].join("").replaceAll("A", "")

    console.log("index", index)
    console.log("numericPartOfCode", numericPartOfCode)
    console.log("length", length)

    return length * numericPartOfCode
  })

  const sumOfComplexities = complexities.reduce((a, b) => a + b, 0)

  return sumOfComplexities.toString()
}

export default solution
