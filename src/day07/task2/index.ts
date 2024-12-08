import { SolutionFn } from "../../utils/contract"

const generateCombinationsWithRepetitions = (length: number): string[][] => {
  if (length === 0) return [[]]

  const smallerCombinations = generateCombinationsWithRepetitions(length - 1)
  return smallerCombinations.flatMap((comb) => [
    [...comb, "*"],
    [...comb, "+"],
    [...comb, "||"],
  ])
}

const solution: SolutionFn = async (input: string[]) => {
  const results = input.map((line) => +line.split(":")[0])
  const numbers = input.map((line) =>
    line
      .split(":")[1]
      .trim()
      .split(" ")
      .map((val) => +val),
  )

  let sum = 0

  for (let i = 0; i < results.length; i++) {
    const currentResult = results[i]
    const currentNumbers = numbers[i]

    const operationsCombinations = generateCombinationsWithRepetitions(currentNumbers.length - 1)

    for (const operations of operationsCombinations) {
      let current = currentNumbers[0]
      for (let j = 0; j < operations.length; j++) {
        const nextNumber = currentNumbers[j + 1]

        if (operations[j] === "*") {
          current *= nextNumber
        } else if (operations[j] === "+") {
          current += nextNumber
        } else {
          current = +`${current}${nextNumber}`
        }
      }

      if (current === currentResult) {
        sum += currentResult
        break
      }
    }
  }

  return sum.toString()
}

export default solution
