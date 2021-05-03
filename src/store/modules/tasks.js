import axios from "axios";

const state = {
    tasks: []
}
const getters = {
    allTasks: (state) => state.tasks
}
const actions = {
    async fetchTasks({commit}) {
        const response = await axios.get('api/tasks')
        commit('setTasks', response.data)
    },
    async addTask({commit}, payload) {
        const response = await axios.post('api/tasks', {
            text: payload.text,
            date: new Date().toLocaleString('ru-RU'),
            completed: false,
            urgent: payload.urgent
        })
        commit('newTask', response.data)
    },
    async deleteTask({commit}, payload) {
        if (confirm(`Удалить дело "${payload.text}"?`)) {
            const request = await axios.delete(`api/tasks/${payload.id}`)
            request.status === 200
                ? commit('removeTask', payload.id)
                : alert("Error, can't delete task")
        }
    }
}
const mutations = {
    setTasks: (state, tasks) => {
        state.tasks = tasks
        state.tasks.sort((a, b) => {
            return b.id - a.id;
        })
    },
    newTask: (state, task) => (state.tasks.unshift(task)),
    removeTask: (state, id) => state.tasks = state.tasks.filter((task) => task.id !== id)
}

export default {
    state,
    getters,
    actions,
    mutations
}