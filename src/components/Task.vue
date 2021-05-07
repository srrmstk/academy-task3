<template>
  <div :class="['task__item', {'task__item_urgent': task.urgent, 'task__item_completed': task.completed}]">
    <v-checkbox
        class="task__item__checkbox"
        @change="onComplete(task, lists)"
        v-model="task.completed">
    </v-checkbox>
    <i class="fas fa-circle"></i>
    <span class="task__item_text">
      {{ task.text }}
      {{ task.date }}
    </span>
    <v-dialog
        v-model="dialog"
        max-width="290"
    >
      <template v-slot:activator="{ on, attrs }">
        <i
            class="fas fa-times"
            v-bind="attrs"
            v-on="on"></i>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Удалить дело
        </v-card-title>

        <v-card-text>
          Удалить дело "{{ task.text }}"?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              text
              @click="dialog = false"
          >
            Отмена
          </v-btn>
          <v-btn
              text
              @click="dialog = false; onDelete(task.id, task.text, lists)"
          >
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import router from "@/router";

export default {
  name: 'Task',
  data() {
    return {
      dialog: false
    }
  },
  props: {
    task: Object,
    lists: Array
  },
  methods: {
    ...mapActions(['deleteTask', 'updateTask', 'updateList']),
    onComplete(task, lists) {
      const updatedTask = {
        id: task.id,
        text: task.text,
        date: task.date,
        urgent: task.urgent,
        completed: task.completed,
        list_id: router.currentRoute.params.id
      }
      this.updateTask(updatedTask)
      let updatedListItem = (lists = lists.filter((list) => list.id === router.currentRoute.params.id))[0]
      console.log(updatedListItem)
      let isDone
      if (task.completed) isDone = 1
      else isDone = -1
      this.updateList({
        id: updatedListItem.id,
        taskCount: updatedListItem.taskCount,
        title: updatedListItem.title,
        completed: false,
        tasksDone: updatedListItem.tasksDone + isDone
      })
    },
    onDelete(id, text, lists) {
      this.deleteTask({
        id: id, text: text
      })
      let updatedListItem = (lists = lists.filter((list) => list.id === router.currentRoute.params.id))[0]
      this.updateList({
        id: updatedListItem.id,
        taskCount: --updatedListItem.taskCount,
        title: updatedListItem.title,
        completed: false,
        tasksDone: updatedListItem.tasksDone
      })
    }
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

  &__checkbox {
    display: inline-flex;
  }

  &_completed {
    .task__item_text {
      text-decoration: line-through;
    }
  }
}

.fa-circle {
  color: red;
  display: none;
}
</style>