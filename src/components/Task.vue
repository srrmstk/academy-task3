<template>
  <div :class="['task__item', task.urgent ? 'task__item_urgent' : '']">
    <v-checkbox

    >
    </v-checkbox>
    <i class="fas fa-circle"></i>
    {{ task.text }}
    {{ task.date }}
    <i @click="deleteTask({id: task.id, text: task.text})" class="fas fa-times"></i>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Task',
  props: {
    task: Object
  },
  methods: {
    ...mapActions(['deleteTask'])
  }
}
</script>

<style lang="scss" scoped>
.task__item {
  &_urgent {
    .fa-circle {
      display: inline;
    }
  }
}

.fa-circle {
  color: red;
  display: none;
}
</style>