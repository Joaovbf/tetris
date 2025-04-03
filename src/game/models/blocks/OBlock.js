import {Block} from "@/game/models/Block.js";

export class OBlock extends Block{
  constructor(direction) {
    super(direction)
  }

  occupationMap() {
    return [
      [false, false, false, false],
      [false, true, true, false],
      [false, true, true, false],
      [false, false, false, false],
    ]
  }
}
