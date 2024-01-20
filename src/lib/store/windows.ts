import { writable } from 'svelte/store'

function create_windows_store() {
  const _bl = writable(false, () => {
    console.log('订阅了一个窗口')
    return () => console.log('结束了一个窗口订阅')
  })
  return {
    subscribe: _bl.subscribe,
    show: () => _bl.set(true),
    hide: () => _bl.set(false),
  }
}

export const show_menu = create_windows_store()
export const show_settings = create_windows_store()
export const show_linkediter = create_windows_store()
