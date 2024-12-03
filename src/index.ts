import path from "node:path"
import { readInput } from "./utils/read-input"
import { SolutionFn } from "./utils/contract"

(async () => {
  const dayNumber = process.argv
    .find((key) => key.includes("day"))
    ?.split("=")
    ?.pop()
  const taskNumber = process.argv
    .find((key) => key.includes("task"))
    ?.split("=")
    ?.pop()

  if (!dayNumber || !taskNumber) {
    console.log("Error: missing 'day'/'task' parameters")
    process.exit(1)
  }

  const inputPath = path.resolve(process.cwd(), `src/day${dayNumber}/input.txt`)
  const input = await readInput(inputPath)

  const solutionFxPath = path.resolve(process.cwd(), `src/day${dayNumber}/task${taskNumber}/index.ts`)
  const { default: solutionFn } = (await import(solutionFxPath)) as { default: SolutionFn }

  console.log(`Solving task ${taskNumber} for day ${dayNumber}...`)

  const timerStart = Date.now()
  const answer = await solutionFn(input)
  const timerStop = Date.now()

  console.log(`Answer: ${answer}`)
  console.log(`Elapsed time: ${timerStop - timerStart}ms`)
  process.exit(0)
})()
