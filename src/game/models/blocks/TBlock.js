import {Block} from "@/game/models/Block.js";

export class TBlock extends Block{
  constructor(direction) {
    super(direction)
  }

  occupationMaps = [
    [
      [true, true, true, false],
      [false, true, false, false],
      [false, false, false, false],
      [false, false, false, false]
    ],
    [
      [false, true, false, false],
      [true, true, false, false],
      [false, true, false, false],
      [false, false, false, false],
    ],
    [
      [false, true, false, false],
      [true, true, true, false],
      [false, false, false, false],
      [false, false, false, false],
    ],
    [
      [false, true, false, false],
      [false, true, true, false],
      [false, true, false, false],
      [false, false, false, false],
    ],
  ]

  occupationMap() {
    return this.occupationMaps[this.orientation.value]
  }
}
