import axios from "axios";
import router from "@/router"

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
            urgent: payload.urgent,
            list_id: router.currentRoute.params.id
        })
        try {
            commit('newTask', response.data)
        } catch (e) {
            console.log(e)
            alert("Error, can't add task")
        }
        // response.status !== 200
        //     ? commit('newTask', response.data)
        //     : alert("Error, can't add task")

    },
    async deleteTask({commit}, payload) {
        await axios.delete(`api/tasks/${payload.id}`)
        commit('removeTask', payload.id)
    },
    // put another data at the task
    async updateTask({commit}, payload) {
        await axios.put(`api/tasks/${payload.id}`, {
            text: payload.text,
            date: payload.date,
            completed: payload.completed,
            urgent: payload.urgent,
            list_id: payload.list_id
        })
        try {
            commit('updTask', payload)
        } catch (e) {
            console.log(e)
            alert("Error, can't update task")
        }
        // response.status !== 200
        //     ? alert("Error, can't update task")
        //     : commit('updTask', payload)
    }
}
const mutations = {
    setTasks: (state, tasks) => {
        state.tasks = tasks
        state.tasks = state.tasks.filter((task) => task.list_id === router.currentRoute.params.id)
        state.tasks.sort((a, b) => {
            return b.id - a.id;
        })
    },
    newTask: (state, task) => {
        state.tasks.unshift(task)
    },
    removeTask: (state, id) => state.tasks = state.tasks.filter((task) => task.id !== id),
    // delete other instance of task and put the updated one
    updTask: (state, updatedTask) => {
        const index = state.tasks.findIndex((task) => task.id === updatedTask.id)
        if (index !== -1) {
            state.tasks.splice(index, 1, updatedTask)
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}