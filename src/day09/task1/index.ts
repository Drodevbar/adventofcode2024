import { SolutionFn } from "../../utils/contract"

const generateDiskBlocks = (diskMap: number[]) => {
  let blockIndex = 0

  return diskMap.flatMap((val, index) => {
    const block = Array.from({ length: val }, () => (index % 2 === 0 ? blockIndex : "."))

    if (index % 2 === 0) blockIndex++

    return block
  })
}

const solution: SolutionFn = async (input: string[]) => {
  const diskMap = [...input[0]].map((val) => +val)
  const diskBlocks = generateDiskBlocks(diskMap)

  for (let i = diskBlocks.length - 1; i >= 0; i--) {
    if (diskBlocks[i] === ".") continue

    for (let j = 0; j < i; j++) {
      if (diskBlocks[j] !== ".") continue

      diskBlocks[j] = diskBlocks[i]
      diskBlocks[i] = "."
      break
    }
  }

  const firstDotIndex = diskBlocks.findIndex((val) => val === ".")

  const checkSum = (diskBlocks.slice(0, firstDotIndex) as number[]).reduce((acc, val, index) => acc + val * index, 0)

  return checkSum.toString()
}

export default solution
