import { SolutionFn } from "../../utils/contract"

const MUL_REGEX_PATTERN = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/g

const solution: SolutionFn = async (input: string[]) => {
  const results = [...input.join().matchAll(MUL_REGEX_PATTERN)]

  const multipliedNumbersList = results.map(
    (value) => +value[1] * +value[2]
  )

  const sumOfMultipliedNumbers = multipliedNumbersList.reduce((a, b) => a + b, 0)

  return sumOfMultipliedNumbers.toString()
}

export default solution
