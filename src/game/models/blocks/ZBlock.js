import {Block} from "@/game/models/Block.js";

export class ZBlock extends Block{
  constructor(direction) {
    super(direction)
  }

  occupationMaps = [
    [
      [false, false, false, false],
      [true, true, false, false],
      [false, true, true, false],
      [false, false, false, false]
    ],
    [
      [false, true, false, false],
      [true, true, false, false],
      [true, false, false, false],
      [false, false, false, false],
    ],
    [
      [false, false, false, false],
      [true, true, false, false],
      [false, true, true, false],
      [false, false, false, false]
    ],

    [
      [false, true, false, false],
      [true, true, false, false],
      [true, false, false, false],
      [false, false, false, false],
    ],
  ]

  occupationMap() {
    return this.occupationMaps[this.orientation.value]
  }
}
