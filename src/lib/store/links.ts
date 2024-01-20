import { writable } from 'svelte/store'
import {} from '../tools/tools'
import { addData, deleteData, getAll, update } from '../tools/db'

function createLinks() {
  const {
    subscribe,
    set: _set,
    update: _update,
  } = writable<link[]>([], () => {
    ;(async () => {
      // const db = await openDatabase('myDatabase', 10, () => {})
      const _links = await getAll()
      // console.log(_links)
      console.log('初始化了links')
      // console.log(_links)
      _set(_links)
    })()
  })
  return {
    subscribe,
    add: async (v: link[]) => {
      await addData(v)
      const newd = await getAll()
      // console.log(newd)
      _set(newd)
    },
    update: async (v: link) => {
      console.log(v)
      await update(v)
      const newd = await getAll()
      _set(newd)
    },
    delete: async (id: number) => {
      deleteData(id)
      _update((oldv) => oldv.filter((v) => v.id !== id))
    },
  }
}

export const links = createLinks()
