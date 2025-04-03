<script setup>
  import engine from '@/game/engine.js'
  import { useStateStore } from "@/stores/states.js";
  import {computed, onMounted, reactive} from 'vue';
  import fieldManager from "@/game/field-manager.js";
  import input from "@/game/input.js"
  import fallManager from "../../game/fall-manager.js";
  import {useAnimationObserverStore} from "@/stores/animation-observer.js";
  import animationManager from "@/game/animation-manager.js";
  import EnumTypeAnimation from "@/game/models/enums/EnumTypeAnimation.js";

  const gameState = useStateStore()
  const animation = useAnimationObserverStore()

  const computedField = computed(() => occupationMapToString(fieldManager.showFieldWithBlock(gameState.state.field, gameState.state.currentBlock)))

  const computedNextBlock = computed(() => occupationMapToString(gameState.state.nextBlock?.occupationMap()))

  const computedTime = computed(() => {
    let seconds = gameState.state.time % 60
    let minutes = Math.floor(gameState.state.time / 60)
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return minutes + ":" + seconds
  } )

  //todo: colocar essa animação numa classe
  animationManager.subscribe(async () => {
    const gameState = useStateStore()
    for (const field of gameState.state.field) {
      field.fill(true)
      await animationManager.sleep(200)
    }
  }, EnumTypeAnimation.END_GAME)

  function occupationMapToString(occupationMap) {
    return occupationMap?.map((row) => row.map((occupied) => occupied ? "[ ]" : "   ").join("")).join("\n")
  }

  onMounted(() => {
    window.addEventListener('keydown', input.handleKeyboardEvent);
    window.addEventListener('keyup', input.handleKeyboardEvent);
  });
</script>

<template>
  <div id="render-wrapper">
    <div id="game-screen">
      <pre>{{ computedField }}</pre>
    </div>

    <div id="game-status">
      <div>
        <h3>Próxima Peça</h3>
        <div id="next-piece">
          <pre>{{ computedNextBlock }}</pre>
        </div>
      </div>
      <div>
        <h3>Nível</h3>
        <p>{{ gameState.state.level }}</p>
      </div>
      <div>
        <h3>Tempo</h3>
        <p>{{ computedTime }}</p>
      </div>
      <div>
        <h3>Pontuação</h3>
        <p>{{ gameState.state.score }}</p>
      </div>
      <div>
        <button v-if="gameState.state.isGameStarted" v-on:click.prevent="engine.resetGame">Reiniciar Jogo</button>

        <button v-if="gameState.state.isGameRunning" v-on:click.prevent="engine.pauseGame">Pausar Jogo</button>
        <button v-else-if="gameState.state.isGameStarted && !gameState.state.isGameEnded" v-on:click.prevent="engine.resumeGame">Retomar Jogo</button>
        <button v-else-if="!gameState.state.isGameStarted && !gameState.state.isGameEnded" v-on:click.prevent="engine.startGame">Iniciar Jogo</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  div#game-screen {
    display: flex;
    height: 70vh;
    aspect-ratio: 3/5;
    background-color: black;
  }

  div#game-screen pre {
    color: white;
    margin: auto;
    padding: 4px;
    border: 1px solid white;
  }

  div#render-wrapper {
    display: flex;
    justify-content: space-around;
    min-width: 50vw;
  }

  div#game-status {
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    border: 1px solid black;
    padding: 4px 8px;
    min-width: 150px;
  }

  div#next-piece {
    display: flex;
    background-color: black;
    color: white;
    font-size: 3vh;
    padding: 3px 5px;
    min-height: 150px;
  }

  div#next-piece pre {
    margin: auto;
  }
</style>
