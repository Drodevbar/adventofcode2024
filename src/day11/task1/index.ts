import { SolutionFn } from "../../utils/contract"

const processStone = (stone: string) => {
  if (stone === "0") {
    return ["1"]
  }

  if (stone.length % 2 === 0) {
    return [stone.slice(0, stone.length / 2), (+stone.slice(stone.length / 2)).toString()]
  }

  return [(+stone * 2024).toString()]
}

const solution: SolutionFn = async (input: string[]) => {
  const stones = input[0].split(" ")

  let modifiedStones = [...stones]

  for (let i = 0; i < 25; i++) {
    const tmpStones: string[] = []

    for (let j = 0; j < modifiedStones.length; j++) {
      tmpStones.push(...processStone(modifiedStones[j]))
    }

    modifiedStones = tmpStones
  }

  return modifiedStones.length.toString()
}

export default solution
