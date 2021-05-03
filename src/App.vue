<template>
  <v-app>
    <v-container
        fluid>
      <v-row>
        <v-col sm="3">
          <Lists/>
        </v-col>
        <v-divider vertical/>
        <v-col>
          <Tasks/>
        </v-col>
      </v-row>
    </v-container>
    <v-footer fixed>
      <v-container fluid>
        <v-row>
          <v-col sm="3">
            <AddList/>
          </v-col>
          <v-col class="d-flex align-center">
            <AddTask/>
          </v-col>
        </v-row>
      </v-container>
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
    }
  }
}
</script>
