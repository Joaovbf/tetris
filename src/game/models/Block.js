import EnumDirections from "@/game/models/enums/EnumDirections.js";
import {Direction} from "@/game/models/Direction.js";

/**
 * This is an abstract class
 * @constructor
 */
export class Block{
  position = {
    row: 0,
    col: 4
  }

  orientation;

  offset = {
    X: 0,
    Y: 0
  }

  constructor(direction) {
    this.orientation = direction
  }

  shift(direction) {
    if (direction.value === EnumDirections.LEFT) {
      this.position.col--
    } else if (direction.value === EnumDirections.RIGHT) {
      this.position.col++
    }
  }

  rotate(isClockwise) {
      this.orientation.value = isClockwise ? this.orientation.next() : this.orientation.previous()
  }

  down() {
    this.position.row++
  }

  occupationMap() {
      throw "Method not Implemented"
  }

  clone() {
    const clone = new this.constructor(new Direction(this.orientation.value))
    clone.position = {...this.position}
    clone.offset = {...this.offset}
    return clone
  }
}
