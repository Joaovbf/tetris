import {IBlock} from "@/game/models/blocks/IBlock.js";
import {JBlock} from "@/game/models/blocks/JBlock.js";
import {LBlock} from "@/game/models/blocks/LBlock.js";
import {OBlock} from "@/game/models/blocks/OBlock.js";
import {SBlock} from "@/game/models/blocks/SBlock.js";
import {TBlock} from "@/game/models/blocks/TBlock.js";
import {ZBlock} from "@/game/models/blocks/ZBlock.js";
import EnumDirections from "@/game/models/enums/EnumDirections.js";
import {Direction} from "@/game/models/Direction.js";

export default {
  blocks: [
    IBlock, JBlock, LBlock, OBlock, SBlock, TBlock, ZBlock
  ],
  nextBlock() {
    const blockClass = this.blocks[Math.floor(Math.random() * this.blocks.length)]
    const directionsValues = Object.values(EnumDirections)
    const direction = directionsValues[Math.floor(Math.random() * directionsValues.length)]
    return new blockClass(new Direction(direction))
  }
}
