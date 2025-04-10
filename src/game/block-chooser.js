import {IBlock} from "@/game/models/blocks/IBlock.js";
import {JBlock} from "@/game/models/blocks/JBlock.js";
import {LBlock} from "@/game/models/blocks/LBlock.js";
import {OBlock} from "@/game/models/blocks/OBlock.js";
import {SBlock} from "@/game/models/blocks/SBlock.js";
import {TBlock} from "@/game/models/blocks/TBlock.js";
import {ZBlock} from "@/game/models/blocks/ZBlock.js";
import EnumDirections from "@/game/models/enums/EnumDirections.js";
import {Direction} from "@/game/models/Direction.js";
import {useStateStore} from "@/stores/states.js";

export default {
  blocks: [
    IBlock, JBlock, LBlock, OBlock, SBlock, TBlock, ZBlock
  ],
  decay: 0.8,
  defaultWeight: 100,
  nextBlock() {
    const gameState = useStateStore()
    let blockClass = null;

    const weightedBlocks = this.blocks.map(item => {
      const count = gameState.state.blocksCount[item.name] || 0;
      const adjustedWeight = this.defaultWeight * Math.pow(this.decay, count);
      return { constructor: item, adjustedWeight };
    });

    const totalWeight = weightedBlocks.reduce((sum, item) => sum + item.adjustedWeight, 0);
    const rand = Math.random() * totalWeight;

    let cumulative = 0;
    for (let item of weightedBlocks) {
      cumulative += item.adjustedWeight;
      if (rand <= cumulative) {
         blockClass = item.constructor;
         break;
      }
    }

    if (blockClass == null) {
      throw "Bloco não selecionado"
    }

    const directionsValues = Object.values(EnumDirections)
    const direction = directionsValues[Math.floor(Math.random() * directionsValues.length)]
    if (gameState.state.blocksCount[blockClass.name]) {
      gameState.state.blocksCount[blockClass.name]++
    } else {
      gameState.state.blocksCount[blockClass.name] = 1
    }

    return new blockClass(new Direction(direction))
  }
}
