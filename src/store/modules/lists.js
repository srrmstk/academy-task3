import axios from "axios";

const state = {
    lists: []
}
const getters = {
    allLists: (state) => state.lists,
    completedLists: (state) => state.lists.filter((list) => list.completed),
    incompleteLists: (state) => state.lists.filter((list) => !list.completed)
}
const actions = {
    async updateList({commit}, payload) {
        if (payload.tasksDone === payload.taskCount){
            payload.completed = true
        }
        await axios.put(`api/lists/${payload.id}`, {
            taskCount: payload.taskCount,
            title: payload.title,
            completed: payload.completed,
            tasksDone: payload.tasksDone
        })
        commit('updList', payload)
    },
    async fetchLists({commit}) {
        const response = await axios.get('api/lists')
        commit('setLists', response.data)
    },
    async addList({commit}, payload) {
        const response = await axios.post('api/lists', {
            taskCount: payload.taskCount,
            title: payload.title,
            completed: payload.completed,
            tasksDone: payload.tasksDone
        })
        response.status !== 200
            ? commit('newList', response.data)
            : alert("Error, can't add list")
    },
    async deleteList({commit}, payload) {
        await axios.delete(`api/lists/${payload.id}`)
        commit('removeList', payload.id)
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
    updList: (state, updatedList) => {
        const index = state.lists.findIndex((list) => list.id === updatedList.id)
        if (index !== -1) {
            state.lists.splice(index, 1, updatedList)
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}