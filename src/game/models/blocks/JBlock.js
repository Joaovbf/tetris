import {Block} from "@/game/models/Block.js";

export class JBlock extends Block{
  constructor(direction) {
    super(direction)
  }

  occupationMaps = [
    [
      [false, false, false, false],
      [false, false, true, false],
      [false, false, true, false],
      [false, true, true, false],
    ],
    [
      [false, false, false, false],
      [false, true, false, false],
      [false, true, true, true],
      [false, false, false, false],
    ],
    [
      [false, false, false, false],
      [false, false, true, true],
      [false, false, true, false],
      [false, false, true, false],
    ],
    [
      [false, false, false, false],
      [false, false, false, false],
      [false, true, true, true],
      [false, false, false, true],
    ],
  ]


  occupationMap() {
    return this.occupationMaps[this.orientation.value]
  }
}
