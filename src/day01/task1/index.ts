import { SolutionFn } from "../../utils/contract"

const NUMBERS_SEPARATOR = "   "

const solution: SolutionFn = async (input: string[]) => {
  const list = input.map((i) => i.split(NUMBERS_SEPARATOR))
  const leftList = list.map((i) => +i[0])
  const rightList = list.map((i) => +i[1])

  const leftListDesc = leftList.toSorted((a, b) => b - a)
  const rightListDesc = rightList.toSorted((a, b) => b - a)

  const distances = leftListDesc.map((l, index) => Math.abs(l - rightListDesc[index]))
  const distancesSum = distances.reduce((a, b) => a + b, 0)

  return distancesSum.toString()
}

export default solution
