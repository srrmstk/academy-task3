<template>
  <div class="todo-tasks">
    <h2></h2>
    <v-list>
      <v-list-item
          class="task"
          v-for="task in allTasks"
          :key="task.id">
        <Task :task="task" :lists="allLists"/>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import Task from "@/components/Task";
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Tasks',
  components: {Task},
  methods: {
    ...mapActions(['fetchTasks'])
  },
  computed: {
    ...mapGetters(['allTasks', 'allLists'])
  },
  created() {
    this.fetchTasks()
  },
  watch: {
    $route: 'fetchTasks'
  }
}
</script>

<style lang="scss" scoped>
.task {
  align-items: center;
}
</style>
