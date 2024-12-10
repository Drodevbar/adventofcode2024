import { SolutionFn } from "../../utils/contract"

type DiskEntity = {
  startIndexExclusive: number
  endIndexExclusive: number
  length: number
  symbol: number | "."
}

const generateDiskBlocksData = (diskMap: number[]) => {
  const freeSpaces: DiskEntity[] = []
  const blocks: DiskEntity[] = []
  const diskBlocksArray: (number | ".")[] = []

  let blockIndex = 0
  let lastIndex = 0

  diskMap.forEach((val, index) => {
    if (index % 2 === 0) {
      blocks.push({
        startIndexExclusive: lastIndex,
        endIndexExclusive: lastIndex + val - 1,
        length: val,
        symbol: blockIndex,
      })
      diskBlocksArray.push(...Array.from({ length: val }, () => blockIndex))
      blockIndex++
    } else {
      freeSpaces.push({
        startIndexExclusive: lastIndex,
        endIndexExclusive: lastIndex + val - 1,
        length: val,
        symbol: ".",
      })
      diskBlocksArray.push(...Array.from({ length: val }, () => "." as const))
    }

    lastIndex += val
  })

  return {
    freeSpaces,
    blocks,
    length: lastIndex,
    diskBlocksArray,
  }
}

const solution: SolutionFn = async (input: string[]) => {
  const diskMap = [...input[0]].map((val) => +val)
  const diskBlocksData = generateDiskBlocksData(diskMap)
  const fragmentedDiskBlocks = [...diskBlocksData.diskBlocksArray]

  for (let i = diskBlocksData.blocks.length - 1; i >= 0; i--) {
    const currentBlock = diskBlocksData.blocks[i]

    for (let j = 0; j < diskBlocksData.freeSpaces.length; j++) {
      const currentFreeSpaces = diskBlocksData.freeSpaces[j]

      if (currentBlock.startIndexExclusive <= currentFreeSpaces.startIndexExclusive) {
        break
      }

      if (currentFreeSpaces.length >= currentBlock.length) {
        for (let n = 0; n < currentBlock.length; n++) {
          fragmentedDiskBlocks[currentFreeSpaces.startIndexExclusive + n] = currentBlock.symbol
          fragmentedDiskBlocks[currentBlock.startIndexExclusive + n] = "."
        }

        currentFreeSpaces.length -= currentBlock.length

        if (currentFreeSpaces.length > 0) {
          currentFreeSpaces.startIndexExclusive += currentBlock.length
        }

        break
      }
    }
  }

  const checkSum = fragmentedDiskBlocks.reduce((acc: number, val, index) => {
    if (val === ".") {
      return acc
    }

    return acc + val * index
  }, 0)

  return checkSum.toString()
}

export default solution
