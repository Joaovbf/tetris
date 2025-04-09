import initialState from "@/game/initialState.js";
import {useStateStore} from "@/stores/states.js";
import blockChooser from "@/game/block-chooser.js";
import collision from "@/game/collision.js";
import EnumDirections from "@/game/models/enums/EnumDirections.js";
import {Direction} from "@/game/models/Direction.js";
import fieldManager from "@/game/field-manager.js";
import scoreManager from "@/game/score-manager.js";
import controls from "@/game/controls.js";
import fallManager from "@/game/fall-manager.js";
import animationManager from "@/game/animation-manager.js";
import EnumTypeAnimation from "@/game/models/enums/EnumTypeAnimation.js";

export default {
  idGameLoop: null,
  idTimerLoop: null,
  frameTime: 16,
  resetGame() {
    const gameState = useStateStore()
    if (gameState.state.isGameRunning){
      this.pauseGame()
    }

    gameState.state = {...initialState}
    gameState.state.field.map((row) => row.fill(false))
    this.startGame()
  },

  pauseGame() {
    clearInterval(this.idGameLoop);
    clearInterval(this.idTimerLoop)
    const gameState = useStateStore()
    gameState.state.isGameRunning = false
    gameState.state.isLoopRunning = false
  },

  resumeGame() {
    const gameState = useStateStore()
    gameState.state.isGameRunning = true
    this.idGameLoop = setInterval((gameState) => this.gameLoop(gameState), this.frameTime, gameState)
    this.idTimerLoop = setInterval((gameState) => gameState.state.time++, 1000, gameState)
  },

  startGame() {
    const gameState = useStateStore()

    gameState.state.nextBlock = blockChooser.nextBlock()
    gameState.state.isGameRunning = true
    gameState.state.isGameStarted = true
    this.idGameLoop = setInterval((gameState) => this.gameLoop(gameState), this.frameTime, gameState)
    this.idTimerLoop = setInterval((gameState) => gameState.state.time++, 1000, gameState)
  },

  endGame() {
    clearInterval(this.idGameLoop);
    clearInterval(this.idTimerLoop)
    const gameState = useStateStore()
    gameState.state.isGameRunning = false
    gameState.state.isLoopRunning = false
    gameState.state.isGameEnded = true
  },

  async gameLoop(gameState) {
    if (gameState.state.isLoopRunning) {
      return;
    }
    gameState.state.isLoopRunning = true;

    if (gameState.state.currentBlock == null) {
      gameState.state.currentBlock = gameState.state.nextBlock
      gameState.state.nextBlock = blockChooser.nextBlock()
      if (collision.hasCollision(gameState.state.field, gameState.state.currentBlock)) {
        //todo: game-over
        this.endGame()
        await animationManager.executeAnimation(EnumTypeAnimation.END_GAME)
      }
    }

    const currentBlock = gameState.state.currentBlock

    if (gameState.state.inputBuffer.length > 0) {
      const input = gameState.state.inputBuffer.shift()

      const action = controls.getFunctionByEvent(input)

      if (action != null) {
        action()
      }
    }

    if(++gameState.state.fallTimer >= fallManager.frameCountToFall(gameState.state.level, gameState.state.isFastDropOn)) {
      gameState.state.fallTimer = 0

      if (collision.hasCollision(gameState.state.field, currentBlock, new Direction(EnumDirections.DOWN))) {
        fieldManager.attachBlockToField(currentBlock)
        gameState.state.currentBlock = null;

        const lineCount = fieldManager.hasLine()
        if (lineCount > 0) {
          gameState.state.score += scoreManager.earnedPoints(gameState.state.level, lineCount)
          gameState.state.lineCount += lineCount
          fieldManager.clearLines()

          const calculatedLevel = scoreManager.levelByCompletedLines(gameState.state.lineCount)
          if (gameState.state.level !== calculatedLevel) {
            gameState.state.level = calculatedLevel
            fallManager.calculateFrameCountToFall()
          }
        }

      } else {
        gameState.state.currentBlock.down()
      }
    }

    gameState.state.isLoopRunning = false;
  }
}
