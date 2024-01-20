import { writable } from 'svelte/store'
function createCol() {
  const _initv = localStorage.getItem('col') ?? 8
  const { subscribe, set: _set } = writable<number>(Number(_initv))
  return {
    subscribe,
    set: (v: number) => {
      _set(v)
      localStorage.setItem('col', String(v))
    },
  }
}

export const col = createCol()
