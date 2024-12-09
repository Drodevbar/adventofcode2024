import { SolutionFn } from "../../utils/contract"

const SYMBOL_PATTERN = /[a-zA-Z0-9]/

const fitsInBoundaries = (x: number, y: number, matrix: string[][]): boolean => {
  return x >= 0 && y >= 0 && x < matrix.length && y < matrix[0].length
}

const generateAntinodes = (locations: number[][], matrix: string[][]): number[][] => {
  const antinodes: number[][] = []

  for (let i = 0; i < locations.length; i++) {
    for (let j = 0; j < locations.length; j++) {
      if (i === j) {
        continue
      }

      const diffX = locations[i][0] - locations[j][0]
      const diffY = locations[i][1] - locations[j][1]

      let antinodeX = locations[i][0]
      let antinodeY = locations[i][1]
      let fits = false

      do {
        antinodeX += diffX
        antinodeY += diffY

        fits = fitsInBoundaries(antinodeX, antinodeY, matrix)

        if (fits) {
          antinodes.push([antinodeX, antinodeY])
        }
      } while (fits)
    }
  }

  return antinodes
}

const solution: SolutionFn = async (input: string[]) => {
  const matrix = input.map((line) => [...line])
  const symbolToLocations: Map<string, number[][]> = new Map()

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const current = matrix[i][j]
      if (SYMBOL_PATTERN.test(current)) {
        symbolToLocations.set(current, symbolToLocations.get(current) ? [...symbolToLocations.get(current), [i, j]] : [[i, j]])
      }
    }
  }

  const uniqueAntinodes: Set<string> = new Set()

  for (const locations of symbolToLocations.values()) {
    const antinodes = generateAntinodes(locations, matrix)

    antinodes.forEach((node) => {
      uniqueAntinodes.add(`${node[0]}:${node[1]}`)
    })

    locations.forEach((location) => {
      uniqueAntinodes.add(`${location[0]}:${location[1]}`)
    })
  }

  return uniqueAntinodes.size.toString()
}

export default solution
