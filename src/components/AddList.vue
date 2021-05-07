<template>
  <v-form
      class="add-form"
      @submit="onSubmit">
    <v-text-field
        class="add-form__input"
        v-model="title"
        outlined
        dense
        placeholder="Введите название списка"
        required
    >
    </v-text-field>
    <v-dialog
        v-model="dialog"
        max-width="290"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            type="submit" v-bind="attrs" v-on="on">
          Добавить список
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Список добавлен
        </v-card-title>

        <v-card-text>
          Список дел "{{ title }}" добавлен
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              text
              @click="dialog = false; title = ''"
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

export default {
  name: 'AddList',
  data() {
    return {
      dialog: false,
      title: '',
      completed: false
    }
  },
  methods: {
    ...mapActions(['addList']),
    onSubmit(e) {
      e.preventDefault()
      // add a validation !!!
      this.addList({
        title: this.title,
        completed: false,
        tasksDone: 0,
        taskCount: 0
      })
      this.completed = false
    }
  }
}
</script>

<style lang="scss" scoped>
.add-form__input {
  min-width: 4rem;
}
</style>
