import {useStateStore} from "@/stores/states.js";
import {KeyBoardEvent} from "@/game/models/KeyboardEvent.js";

export default {
  handleKeyboardEvent(event) {
    const gameState = useStateStore()
    if (gameState.state.inputBuffer.length < 10) {
      gameState.state.inputBuffer.push(new KeyBoardEvent(event.type, event.key))
    }
  }
}
