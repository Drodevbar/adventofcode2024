import { SolutionFn } from "../../utils/contract"

const solution: SolutionFn = async (input: string[]) => {
  let safeReports = 0

  for (const report of input) {
    const levels = report.split(" ").map((level) => +level)

    let isSafe = true
    let trend: "increasing" | "decreasing" | undefined
    for (let i = 0; i < levels.length - 1; i++) {
      const [a, b] = [levels[i], levels[i + 1]]

      if (a === b) {
        isSafe = false
        break
      }

      const diff = a - b
      if (Math.abs(diff) > 3) {
        isSafe = false
        break
      }

      const newTrend = a < b ? "increasing" : "decreasing"
      if (trend === undefined) {
        trend = newTrend
      }

      if (trend !== newTrend) {
        isSafe = false
        break
      }
    }

    safeReports += isSafe ? 1 : 0
  }

  return safeReports.toString()
}

export default solution
