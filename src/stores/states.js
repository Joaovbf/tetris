import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import initialState from "@/game/initialState.js";

export const useStateStore = defineStore('state', () => {

  const state = reactive({...initialState})

  return { state }
})
