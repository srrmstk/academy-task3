<template>
  <v-form
      class="add-form d-flex flex-nowrap"
      @submit="onSubmit">
    <v-text-field
        class="add-form__input"
        v-model="text"
        outlined
        dense
        placeholder="Введите дело"
        required
    >
    </v-text-field>
    <v-checkbox
        class="add-form__checkbox"
        v-model="urgent"
        label="Срочное"
    ></v-checkbox>
    <v-dialog
        v-model="dialog"
        max-width="290"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn type="submit" v-bind="attrs" v-on="on">
          Добавить дело
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Дело добавлено
        </v-card-title>

        <v-card-text>
          "{{ text }}" добавлено в "Название списка дел"
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              text
              @click="dialog = false; text = ''"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
import {mapActions} from 'vuex'
import router from "@/router";

export default {
  name: 'AddTask',
  data() {
    return {
      text: '',
      urgent: false,
      dialog: false
    }
  },
  props: {
    lists: Array
  },
  methods: {
    ...mapActions(['addTask', 'updateList']),
    onSubmit(e, lists = this.lists) {
      e.preventDefault()
      // add a validation !!!
      this.addTask({text: this.text, urgent: this.urgent})
      let updatedListItem = (lists = lists.filter((list) => list.id === router.currentRoute.params.id))[0]
      this.updateList({
        id: updatedListItem.id,
        taskCount: ++updatedListItem.taskCount,
        title: updatedListItem.title,
        completed: false,
        tasksDone: updatedListItem.tasksDone
      })
      this.urgent = false
    }
  }
}
</script>

<style lang="scss" scoped>
.add-form__input {
  min-width: 4rem;
  margin-right: 2rem;
}

.add-form__checkbox {
  margin-right: 2rem;
  margin-top: 4px;
}
</style>