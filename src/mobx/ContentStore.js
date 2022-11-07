import { observable, action, makeAutoObservable } from 'mobx'
import AsyncStorage from '@react-native-async-storage/async-storage'

class ContentStore {
    listItems = []

    constructor() {
        makeAutoObservable(this, {
            listItems: observable,
            saveListItems: action,
            addList: action,
            removeList: action,
            moveUpItem: action,
            moveDownItem: action,
        }, { autoBind: true })
    }

    saveListItems(items) {
        try {
            this.listItems = items
            this.saveStore()
        } catch (error) {
            console.log('saveListItems error: ', error)
        }
    }

    addList(item) {
        try {
            this.listItems.push(item)
            this.saveStore()
        } catch (error) {
            console.log('saveListItems error: ', error)
        }
    }

    removeList(index) {
        this.listItems.splice(index, 1)
        this.saveStore()
        console.log('listItems', this.listItems)
    }

    moveUpItem(index) {
        if (index != 0) {
            let temp = this.listItems[index - 1]
            this.listItems[index - 1] = this.listItems[index]
            this.listItems[index] = temp
            this.saveStore()
        }
    }

    moveDownItem(index) {
        if (index != this.listItems.length - 1) {
            let temp = this.listItems[index + 1]
            this.listItems[index + 1] = this.listItems[index]
            this.listItems[index] = temp
            this.saveStore()
        }
    }

    async saveStore() {
        await AsyncStorage.setItem('items', JSON.stringify(this.listItems))
    }
}

export default contentStore = new ContentStore();