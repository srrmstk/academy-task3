<template>
  <div class="todo-tasks">
    <h2>Task List name here</h2>
    <v-list>
      <!--   add a sorting!!!    -->
      <v-list-item
          v-for="task in tasks"
          :key="task.id">
        <Task @delete-task="$emit('delete-task', task.id, task.text)" :task="task"/>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import Task from "@/components/Task";

export default {
  name: 'Tasks',
  components: {Task},
  props: {
    tasks: Array
  },
  methods: {
  },
  emits: ['delete-task'],
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">

</style>