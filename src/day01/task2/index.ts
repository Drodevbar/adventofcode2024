import { SolutionFn } from "../../utils/contract"

const NUMBERS_SEPARATOR = "   "

const solution: SolutionFn = async (input: string[]) => {
  const list = input.map((i) => i.split(NUMBERS_SEPARATOR))
  const leftList = list.map((i) => +i[0])
  const rightList = list.map((i) => +i[1])

  const rightListNumberToOccurrences = rightList.reduce((acc, i) => {
    acc.set(i, (acc.get(i) ?? 0) + 1)
    return acc
  }, new Map<number, number>())

  const similarities = leftList.map((i) => i * (rightListNumberToOccurrences.get(i) || 0))
  const similaritiesSum = similarities.reduce((a, b) => a + b, 0)

  return similaritiesSum.toString()
}

export default solution
