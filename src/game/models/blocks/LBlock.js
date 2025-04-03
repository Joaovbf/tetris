import {Block} from "@/game/models/Block.js";

export class LBlock extends Block{
  constructor(direction) {
    super(direction)
  }
  occupationMaps = [
    [
      [false, true, false, false],
      [false, true, false, false],
      [false, true, true, false],
      [false, false, false, false]
    ],
    [
      [false, false, false, false],
      [false, true, true, true],
      [false, true, false, false],
      [false, false, false, false],
    ],
    [
      [false, false, false, false],
      [false, true, true, false],
      [false, false, true, false],
      [false, false, true, false],
    ],
    [
      [false, false, false, false],
      [false, false, true, false],
      [true, true, true, false],
      [false, false, false, false],
    ],
  ]

  occupationMap() {
    return this.occupationMaps[this.orientation.value]
  }
}
