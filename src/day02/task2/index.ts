import { SolutionFn } from "../../utils/contract"

const isReportSafe = (levels: number[]): boolean => {
  let trend: "increasing" | "decreasing" | undefined

  for (let i = 0; i < levels.length - 1; i++) {
    const [a, b] = [levels[i], levels[i + 1]]

    if (a === b) {
      return false
    }

    const diff = a - b
    if (Math.abs(diff) > 3) {
      return false
    }

    const newTrend = a < b ? "increasing" : "decreasing"
    if (trend === undefined) {
      trend = newTrend
    }

    if (trend !== newTrend) {
      return false
    }
  }

  return true
}

const solution: SolutionFn = async (input: string[]) => {
  let safeReports = 0

  for (const report of input) {
    const levels = report.split(" ").map((level) => +level)

    let isSafe = isReportSafe(levels)

    if (!isSafe) {
      for (let i = 0; i < levels.length; i++) {
        isSafe = isReportSafe([...levels.slice(0, i), ...levels.slice(i + 1)])

        if (isSafe) break
      }
    }

    safeReports += isSafe ? 1 : 0
  }

  return safeReports.toString()
}

export default solution
