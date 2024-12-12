import { SolutionFn } from "../../utils/contract"

// 0 (1)
// 1 blink: 1 (1)
// 2 blinks: 2024 (1)
// 3 blinks: 20 and 24 (2)
// 4 blinks: 2 and 0, 2 and 4 (4)
// 5 blinks: 4048 and 1, 4048 and 8096 (4)
// 6 blinks: 40 and 48, 0, 40 and 48, 80 and 96 (7)
// 7 blinks: 4 and 0, 4 and 8, 1, 4 and 0, 4 and 8, 8 and 0, 9 and 6 (13)
// 8 blinks: ... (13)

// 8 (1)
// 1 blink: 16192 (1)
// 2 blinks: 32772608 (1)
// 3 blinks: 3277 and 2608 (2)
// 4 blinks: 32 and 77, 26 and 8 (4)
// 5 blinks: 3 and 2, 7 and 7, 2 and 6, 16192 (7)

const processStone = (stone: string, blinks: number, stonesAndBlinksToProcessedStonesLength: Map<string, number>): number => {
  if (blinks === 0) {
    return 1
  }

  const cacheKey = `s=${stone};b=${blinks}`
  const cacheHit = stonesAndBlinksToProcessedStonesLength.get(cacheKey)
  if (cacheHit) return cacheHit

  let result: number

  if (stone === "0") {
    result = processStone("1", blinks - 1, stonesAndBlinksToProcessedStonesLength)
  } else if (stone.length % 2 === 0) {
    result =
      processStone(stone.slice(0, stone.length / 2), blinks - 1, stonesAndBlinksToProcessedStonesLength) +
      processStone((+stone.slice(stone.length / 2)).toString(), blinks - 1, stonesAndBlinksToProcessedStonesLength)
  } else {
    result = processStone((+stone * 2024).toString(), blinks - 1, stonesAndBlinksToProcessedStonesLength)
  }

  stonesAndBlinksToProcessedStonesLength.set(cacheKey, result)
  return result
}

const solution: SolutionFn = async (input: string[]) => {
  const stones = input[0].split(" ")
  const stonesAndBlinksToProcessedStonesLength: Map<string, number> = new Map()

  const sumOfStones = stones.reduce((acc, stone) => acc + processStone(stone, 75, stonesAndBlinksToProcessedStonesLength), 0)

  return sumOfStones.toString()
}

export default solution
