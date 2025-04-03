import {useAnimationObserverStore} from "@/stores/animation-observer.js";

export default {
  async executeAnimation(type) {
    const animationStore = useAnimationObserverStore()
    if (animationStore.observerData.handlers.hasOwnProperty(type)) {
      await animationStore.observerData.handlers[type]()
    }
  },
  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  },
  subscribe(handler, type) {
    const animationStore = useAnimationObserverStore()
    animationStore.observerData.handlers[type] = handler
  },
  unsubscribe(type) {
    const animationStore = useAnimationObserverStore()
    delete animationStore.observerData.handlers[type]
  }
}
