import {useStateStore} from "@/stores/states.js";
import collision from "@/game/collision.js";

export default {
  shiftCurrentBlock(direction) {
    const gameState = useStateStore()
    if (gameState.state.currentBlock == null) {
      return
    }

    if (!collision.hasCollision(gameState.state.field, gameState.state.currentBlock, direction))
    {
      gameState.state.currentBlock.shift(direction)
    }
  },
  rotateCurrentBlock(isClockwise = true) {
    const gameState = useStateStore()
    if (gameState.state.currentBlock == null) {
      return
    }

    if (collision.canRotate(gameState.state.field, gameState.state.currentBlock, isClockwise)) {
      gameState.state.currentBlock.rotate(isClockwise)
    }
  },
  changeFastDropStatus(newStatus) {
    const gameState = useStateStore()
    gameState.state.isFastDropOn = newStatus
  }
}
