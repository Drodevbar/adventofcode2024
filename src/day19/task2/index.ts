import { SolutionFn } from "../../utils/contract"

const solution: SolutionFn = async (input: string[]) => {
  const towelPatterns = new Set(input[0].split(", "))
  const designs = input
    .slice(2)
    .filter((line) => line !== "")
    .map((line) => [...line])

  let sumOfDifferentWays = 0

  for (const design of designs) {
    const memo: number[] = Array.from({ length: design.length + 1 }, () => 0)
    memo[0] = 1

    for (let i = 0; i < design.length; i++) {
      if (memo[i] === 0) {
        continue
      }

      for (const towel of towelPatterns.values()) {
        if (i + towel.length <= design.length && design.slice(i, i + towel.length).join("") === towel) {
          memo[i + towel.length] += memo[i]
        }
      }
    }

    sumOfDifferentWays += memo[design.length]
  }

  return sumOfDifferentWays.toString()
}

export default solution
