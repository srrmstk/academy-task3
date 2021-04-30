<template>
  <div :class="['task__item', task.important ? 'task__item_important' : '']">
    <v-checkbox>
    </v-checkbox>
    <i class="fas fa-circle"></i>
    {{ task.text }}
    {{ task.date }}
    <i @click="$emit('delete-task', task.id, task.text)" class="fas fa-times"></i>
  </div>
</template>

<script>
export default {
  name: 'Task',
  props: {
    task: Object
  },
  methods: {},
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.task__item {
  .fa-circle {
    color: red;
    display: none;
  }

  &_important {
    .fa-circle {
      display: inline;
    }
  }
}
</style>