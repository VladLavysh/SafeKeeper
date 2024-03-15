import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { Item, Action } from '@/types/item'

import { Storage } from '@ionic/storage'
const store = new Storage()
store.create()

interface ItemsState {
  items: Item[]
}

type ItemsActions = {
  getItems: () => Promise<Item[]>
  getItem: (id: string) => Item
  manageItem: (item: Item, action: Action) => void
  addItem: (item: Item) => void
  updateItem: (item: Item) => void
  removeItem: (id: string) => void
}

export const useItemsStore = defineStore<'items', ItemsState, any, ItemsActions>('items', {
  state: () => ({
    items: []
  }),
  actions: {
    async getItems() {
      const keys = await store.keys()
      keys.forEach(async key => {
        const item = await store.get(key)
        this.items.push(item)
      })
      return this.items
    },
    getItem(id: string) {
      const item = this.items.find(el => el.id === id) as Item
      return {...item}
    },
    manageItem(item: Item, action: Action) {
      switch (action) {
        case 'create':
          this.addItem(item)
          break
        case 'update':
          this.updateItem(item)
          break
        case 'delete':
          this.removeItem(item.id)
          break
      }
    },
    async addItem(item: Item) {
      item.id = uuidv4()
      await store.set(item.id as string, item)
      this.items.push(item)
    },
    async updateItem(item: Item) {
      const index = this.items.findIndex(el => el.id === item.id)
      await store.set(item.id as string, item)
      this.items[index] = item
    },
    async removeItem(id: string) {
      const index = this.items.findIndex(el => el.id === id)
      await store.remove(id as string)
      this.items.splice(index, 1)
    }
  }
})
