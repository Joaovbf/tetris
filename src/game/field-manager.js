import {useStateStore} from "@/stores/states.js";

export default {
  hasLine() {
    const gameState = useStateStore()
    const field = gameState.state.field

    let lines = 0
    for (const row of field) {
      if (row.every((occupied) => occupied)) {
        lines++
      }
    }

    return lines
  },
  attachBlockToField(block) {
    const gameState = useStateStore()
    if (gameState.state.currentBlock == null) {
      return
    }
    const occupationMap = gameState.state.currentBlock.occupationMap()
    const field = gameState.state.field
    let row = block.position.row
    let col = block.position.col

    for (var indexY in occupationMap) {
      indexY = parseInt(indexY)
      for (var indexX in occupationMap[indexY]) {
        indexX = parseInt(indexX)
        if (occupationMap[indexY][indexX]) {
          field[row + indexY][col + indexX] = true
        }
      }
    }
  },
  clearLines() {
    const gameState = useStateStore()
    const field = gameState.state.field

    for (const key in field) {
      if (field[key].every((occupied) => occupied)) {
        field[key].fill(false)
        const newArray = []
        for (let i = 0; i < 10; i++) {
          newArray.push(false)
        }
        field.splice(key, 1)
        field.unshift(newArray)
        //setTimeout(() => field.unshift(newArray))
      }
    }
  },
  showFieldWithBlock(field, block) {
    const cloneField = JSON.parse(JSON.stringify(field))
    if (block === null) {
      return cloneField
    }
    const blockOccupationMap = block.occupationMap()
    let row = block.position.row
    let col = block.position.col

    for (var indexY in blockOccupationMap) {
      indexY = parseInt(indexY)
      for (var indexX in blockOccupationMap[indexY]) {
        indexX = parseInt(indexX)
        if (blockOccupationMap[indexY][indexX]) {
          cloneField[row + indexY][col + indexX] = cloneField[row + indexY][col + indexX] ? true : blockOccupationMap[indexY][indexX]
        }
      }
    }

    return cloneField
  }
}
