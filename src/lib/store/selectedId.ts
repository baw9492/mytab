import { writable } from 'svelte/store'
function createStore() {
  const { set, subscribe } = writable(-1)
  return {
    set,
    subscribe,
  }
}

export const selectedId = createStore()
