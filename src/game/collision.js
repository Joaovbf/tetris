export default {
  hasCollision(field, block, direction = null) {
    const occupationMap = block.occupationMap()
    let row = block.position.row
    let col = block.position.col

    let directionX = 0
    let directionY = 0
    if (direction != null) {
      directionY = direction.valueOnYAxis()
      directionX = direction.valueOnXAxis()
    }

    for (var indexY in occupationMap) {
      indexY = parseInt(indexY)
      for (var indexX in occupationMap[indexY]) {
        indexX = parseInt(indexX)
        const yFieldPos = row + indexY + directionY
        const xFieldPos = col + indexX + directionX
        if (
          occupationMap[indexY][indexX] &&
          (
            field.length <= yFieldPos ||
            0 > yFieldPos ||
            field[yFieldPos].length <= xFieldPos ||
            0 > xFieldPos ||
            field[yFieldPos][xFieldPos]
          )
        ) {
          return true
        }
      }
    }

    return false
  },
  canRotate(field, block, isClockwise = true) {
    const clonedBlock = block.clone()
    clonedBlock.rotate(isClockwise)

    return !this.hasCollision(field, clonedBlock)
  }
}
