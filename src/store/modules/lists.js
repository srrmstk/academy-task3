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
    }
}
const mutations = {
    setLists: (state, lists) => (state.lists = lists)
}

export default {
    state,
    getters,
    actions,
    mutations
}