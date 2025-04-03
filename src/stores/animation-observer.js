import {defineStore} from "pinia";
import {reactive} from "vue";

export const useAnimationObserverStore = defineStore('animation-observer',  () =>{
  const observerData = reactive({
    //todo: fazer controle para garantir que a animação rode até o fim sem com seus handlers sem reiniciar o jogo novamente
    isAnimationRunning: false,
    currentAnimation: null,
    handlers: {}
  })

  return { observerData }
})
