import Vue from 'vue'
import Vuex from 'vuex'
import tasks from './modules/tasks'
import lists from "@/store/modules/lists";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        tasks,
        lists
    }
})