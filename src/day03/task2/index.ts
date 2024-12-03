import { SolutionFn } from "../../utils/contract"

const DO_REGEX_PATTERN = /do\(\)(.+?)don't\(\)|do\(\)(.+)/g
const MUL_REGEX_PATTERN = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/g

const solution: SolutionFn = async (input: string[]) => {
  const singleLineInput = input.join()
  const firstDoIndexOf = singleLineInput.indexOf("do()")
  const firstDontIndexOf = singleLineInput.indexOf("don't()")

  const doResults = [...singleLineInput.matchAll(DO_REGEX_PATTERN)]
  const doString = singleLineInput.slice(0, Math.min(firstDoIndexOf, firstDontIndexOf)) + doResults.map((res) => res[1] ?? res[2]).join()

  const results = [...doString.matchAll(MUL_REGEX_PATTERN)]

  const multipliedNumbersList = results.map(
    (value) => +value[1] * +value[2]
  )

  const sumOfMultipliedNumbers = multipliedNumbersList.reduce((a, b) => a + b, 0)

  return sumOfMultipliedNumbers.toString()
}

export default solution
