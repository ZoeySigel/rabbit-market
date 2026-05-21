export function powerSet(originalSet) {
  const subSets = []

  const numberOfCombinations = 2 ** originalSet.length

  for (let combinationIndex = 0; combinationIndex < numberOfCombinations; combinationIndex++) {
    const subSet = []

    for (let setElementIndex = 0; setElementIndex < originalSet.length; setElementIndex++) {
      if (combinationIndex & (1 << setElementIndex)) {
        subSet.push(originalSet[setElementIndex])
      }
    }

    subSets.push(subSet)
  }

  return subSets
}
