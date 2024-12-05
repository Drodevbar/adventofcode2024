import { SolutionFn } from "../../utils/contract"

const isSmallerThanTheRest = (currentIndex: number, smallerOnes: number[], updatesLine: number[]): boolean => {
  for (let i = 0; i < currentIndex; i++) {
    if (smallerOnes.includes(updatesLine[i])) {
      return false
    }
  }

  return true
}

const isLineCorrectlyOrdered = (updatesLine: number[], numberToSmallerOnesMap: Map<number, number[]>): boolean => {
  for (let i = 0; i < updatesLine.length; i++) {
    const smallerOnes = numberToSmallerOnesMap.get(updatesLine[i])

    if (!smallerOnes) {
      continue
    }

    if (!isSmallerThanTheRest(i, smallerOnes, updatesLine)) {
      return false
    }
  }

  return true
}

const solution: SolutionFn = async (input: string[]) => {
  const gapIndex = input.findIndex((line) => line.length === 0)
  const pageOrderingRulesRaw = input.slice(0, gapIndex)
  const updatesRaw = input.slice(gapIndex + 1)

  const numberToSmallerOnesMap = pageOrderingRulesRaw.reduce((map, line) => {
    const [first, second] = line.split("|").map((val) => +val)
    map.set(first, map.get(first) ? [...map.get(first), second] : [second])

    return map
  }, new Map<number, number[]>())
  const updatesList = updatesRaw.map((line) => line.split(",").map((val) => +val))

  const correctlyOrderedUpdatesList: number[][] = []

  for (const updatesLine of updatesList) {
    if (isLineCorrectlyOrdered(updatesLine, numberToSmallerOnesMap)) {
      correctlyOrderedUpdatesList.push(updatesLine)
    }
  }

  const sumOfMiddleElements = correctlyOrderedUpdatesList.map((list) => list[Math.floor(list.length / 2)]).reduce((a, b) => a + b, 0)

  return sumOfMiddleElements.toString()
}

export default solution
