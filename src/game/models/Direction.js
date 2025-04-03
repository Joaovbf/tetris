import EnumDirections from "@/game/models/enums/EnumDirections.js";

export class Direction {
  internalValue;

  constructor(initialDirection = null) {
    if (initialDirection !== null && !this.isValid(initialDirection)) {
      throw "Invalid Value"
    }

    this.internalValue = initialDirection ?? EnumDirections.UP
  }

  set value(direction) {
    if (this.isValid(direction)) {
      this.internalValue = direction
    }
  }

  get value() {
    return this.internalValue
  }

  valueOnXAxis() {
    return this.internalValue === EnumDirections.LEFT ?
      -1 :
      (this.internalValue === EnumDirections.RIGHT ? 1 : 0)
  }

  valueOnYAxis() {
    return this.internalValue === EnumDirections.UP ?
      -1 :
      (this.internalValue === EnumDirections.DOWN ? 1 : 0)
  }

  next() {
    const enumValues = Object.values(EnumDirections)
    return enumValues[enumValues.indexOf(this.internalValue) + 1] ?? EnumDirections.UP
  }

  previous () {
    const enumValues = Object.values(EnumDirections)
    return enumValues[enumValues.indexOf(this.internalValue) - 1] ?? EnumDirections.LEFT
  }

  isValid(direction) {
    return Object.values(EnumDirections).includes(direction)
  }
}
