import { openDB } from 'idb'

async function _openDB() {
  return openDB('myDatabase', undefined, {
    upgrade(db) {
      db.createObjectStore('links', { keyPath: 'id', autoIncrement: true })
    },
  })
}

export async function getAll(): Promise<link[]> {
  const db = await _openDB()
  const store = db.transaction('links', 'readonly').objectStore('links')
  return store.getAll()
}

export async function update(nd: link) {
  const db = await _openDB()
  const store = db.transaction('links', 'readwrite').objectStore('links')
  await store.put(nd)
}

export async function deleteData(id: number) {
  const db = await _openDB()
  const store = db.transaction('links', 'readwrite').objectStore('links')
  store.delete(id)
}

export async function addData(data: link[]) {
  const db = await _openDB()
  const store = db.transaction('links', 'readwrite').objectStore('links')
  data.forEach((v) => {
    store.add(v)
  })
}
