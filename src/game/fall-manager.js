import {useStateStore} from "@/stores/states.js";


export default {
  frameCountToFall() {
    const gameState = useStateStore()
    if (gameState.state.isFastDropOn) {
      return 2
    }

    return Math.floor(gameState.state.frameCountToFall)
  },
  calculateFrameCountToFall() {
    const gameState = useStateStore()
    gameState.state.frameCountToFall = gameState.state.frameCountToFall * 0.9
  }
}
