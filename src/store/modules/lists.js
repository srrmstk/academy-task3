import axios from "axios";

const state = {
    lists: []
}
const getters = {
    allLists: (state) => state.lists
}
const actions = {
    async fetchLists({commit}) {
        const response = await axios.get('api/lists')
        commit('setLists', response.data)
    },
    async addList({commit}, payload) {
        const response = await axios.post('api/lists', {
            title: payload.title,
            completed: false
        })
        response.status !== 200
            ? commit('newList', response.data)
            : alert("Error, can't add list")
    },
    async deleteList({commit}, payload) {
        await axios.delete(`api/lists/${payload.id}`)
        commit('removeList', payload.id)
    },
    // put another data at the list
    async updateList({commit}, payload) {
        await axios.put(`api/lists/${payload.id}`, {
            title: payload.title,
            completed: payload.completed,
        })
        commit('updList', payload)
    }
}
const mutations = {
    setLists: (state, lists) => {
        state.lists = lists
        state.lists.sort((a, b) => {
            let nameA = a.title.toLowerCase(), nameB = b.title.toLowerCase()
            if (nameA < nameB)
                return -1
            if (nameA > nameB)
                return 1
            return 0
        })
    },
    newList: (state, list) => (state.lists.push(list)),
    removeList: (state, id) => state.lists = state.lists.filter((list) => list.id !== id),
    // delete other instance of list and put the updated one
    updList: (state, updatedTask) => {
        console.log(updatedTask)
        const index = state.lists.findIndex((list) => list.id === updatedTask.id)
        if (index !== -1) {
            state.lists.splice(index, 1, updatedTask)
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}