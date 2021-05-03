<template>
  <v-form
      class="add-form d-flex flex-nowrap"
      @submit="onSubmit">
    <v-text-field
        class="add-form__input ma-2"
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
        <v-btn type="submit" v-bind="attrs" v-on="on"
        >
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
              @click="dialog = false"
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
  name: 'AddTask',
  data() {
    return {
      text: '',
      urgent: false,
      dialog: false
    }
  },
  methods: {
    ...mapActions(['addTask']),
    onSubmit(e) {
      e.preventDefault()
      // add a validation !!!
      this.addTask({text: this.text, urgent: this.urgent})
      // clearing the inputs
      this.text = ''
      this.urgent = false
    }
  }
}
</script>

<style lang="scss" scoped>
.add-form__input{
  max-width: 16rem;
}
</style>