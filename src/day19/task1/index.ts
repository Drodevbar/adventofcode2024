import { SolutionFn } from "../../utils/contract"

const solution: SolutionFn = async (input: string[]) => {
  const towelPatterns = new Set(input[0].split(", "))
  const designs = input
    .slice(2)
    .filter((line) => line !== "")
    .map((line) => [...line])

  let sumOfPossibleDesigns = 0

  for (const design of designs) {
    const memo: boolean[] = Array.from({ length: design.length + 1 }, () => false)
    memo[0] = true

    for (let i = 0; i < design.length; i++) {
      if (!memo[i]) {
        continue
      }

      for (const towel of towelPatterns.values()) {
        if (i + towel.length <= design.length && design.slice(i, i + towel.length).join("") === towel) {
          memo[i + towel.length] = true
        }
      }
    }

    if (memo[design.length]) {
      sumOfPossibleDesigns++
    }
  }

  return sumOfPossibleDesigns.toString()
}

export default solution
