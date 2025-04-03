import {Block} from "@/game/models/Block.js";
import EnumDirections from "@/game/models/enums/EnumDirections.js";

export class IBlock extends Block{
  constructor(direction) {
    super(direction)
  }

  occupationMaps = [
    [
      [false, true, false, false],
      [false, true, false, false],
      [false, true, false, false],
      [false, true, false, false],
    ],
    [
      [false, false, false, false],
      [false, false, false, false],
      [true, true, true, true],
      [false, false, false, false],
    ],
    [
      [false, false, true, false],
      [false, false, true, false],
      [false, false, true, false],
      [false, false, true, false],
    ],
    [
      [false, false, false, false],
      [true, true, true, true],
      [false, false, false, false],
      [false, false, false, false],
    ],
  ]

  occupationMap() {
    return this.occupationMaps[this.orientation.value]
  }

}
