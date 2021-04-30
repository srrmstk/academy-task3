<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col sm="4">
          <Lists @delete-list="deleteList" :lists="lists"/>
        </v-col>
        <v-divider vertical/>
        <v-col>
          <Tasks @delete-task="deleteTask" :tasks="tasks"/>
        </v-col>
      </v-row>
    </v-container>
    <v-footer fixed>
      <v-col sm="4">
        <AddList @add-list="addList"/>
      </v-col>
      <v-col>
        <AddTask @add-task="addTask"/>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Tasks from "@/views/Tasks";
import Lists from "@/views/Lists";
import AddTask from "@/components/AddTask";
import AddList from "@/components/AddList";


export default {
  name: 'App',
  components: {AddList, AddTask, Lists, Tasks},
  methods: {
    async addTask(task) {
      const response = await fetch('api/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(task)
      })
      const data = await response.json()
      this.tasks = [data, ...this.tasks]
    },
    async deleteTask(id, text) {
      if (confirm(`Удалить дело "${text}"?`)) {
        const request = await fetch(`api/tasks/${id}`, {
          method: 'DELETE'
        })
        request.status === 200
            ? this.tasks = this.tasks.filter((task) => task.id !== id)
            : alert("Error, can't delete task")
      }
    },
    async fetchTasks() {
      const response = await fetch('api/tasks')
      return await response.json()
    },

    async addList(list) {
      const response = await fetch('api/lists', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(list)
      })
      const data = await response.json()
      this.lists = [data, ...this.lists]
    },
    async deleteList(id, title) {
      if (confirm(`Удалить список дел "${title}"?`)) {
        const request = await fetch(`api/lists/${id}`, {
          method: 'DELETE'
        })
        request.status === 200
            ? this.lists = this.lists.filter((list) => list.id !== id)
            : alert("Error, can't delete task")
      }
    },
    async fetchLists() {
      const response = await fetch('api/lists')
      return await response.json()
    }
  },
  data() {
    return {
      tasks: [],
      lists: []
    }
  },
  async created() {
    this.tasks = await this.fetchTasks()
    this.lists = await this.fetchLists()
  }
}
</script>
