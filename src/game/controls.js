import moveManager from "@/game/move-manager.js";
import {Direction} from "@/game/models/Direction.js";
import EnumDirections from "@/game/models/enums/EnumDirections.js";

export default {
  getFunctionByEvent(keyboardEvent) {
    const keys = [keyboardEvent.key, keyboardEvent.event]
    return this[keys.join("|")]
  },
  "ArrowRight|keydown": () => moveManager.shiftCurrentBlock(new Direction(EnumDirections.RIGHT)),
  "ArrowLeft|keydown": () => moveManager.shiftCurrentBlock(new Direction(EnumDirections.LEFT)),
  "ArrowDown|keydown": () => moveManager.changeFastDropStatus(true),
  "ArrowDown|keyup": () => moveManager.changeFastDropStatus(false),
  "ArrowUp|keydown": () => moveManager.rotateCurrentBlock()
}
