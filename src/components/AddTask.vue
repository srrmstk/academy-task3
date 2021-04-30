<template>
  <v-form
      :class="['add-form']"
      @submit="onSubmit">
    <v-text-field
        :class="['add-form__input']"
        v-model="text"
        outlined
        dense
        placeholder="Введите дело"
        required
    >
    </v-text-field>
    <v-checkbox
        :class="['add-form__checkbox']"
        v-model="important"
        label="Срочное"
    ></v-checkbox>
    <v-btn type="submit">Добавить дело</v-btn>
  </v-form>
</template>

<script>
import {validationMixin} from 'vuelidate'
import required from "vuelidate/lib/validators/required";


export default {
  mixins: [validationMixin],
  validations: {
    text: {required}
  },
  name: 'AddTask',
  data() {
    return {
      text: '',
      important: false,
      date: ''
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      // add a validation !!!
      const newTask = {
        text: this.text,
        date: new Date().toLocaleString('ru-RU'),
        important: this.important
      }
      this.$emit('add-task', newTask)
      this.text = ''
      this.date = ''
      this.important = false
      alert(`"${newTask.text}" добавлено`)
    }
  }
}
</script>