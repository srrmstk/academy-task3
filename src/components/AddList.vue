<template>
  <v-form
      :class="['add-form']"
      @submit="onSubmit">
    <v-text-field
        :class="['add-form__input']"
        v-model="title"
        outlined
        dense
        placeholder="Введите название списка"
        required
    >
    </v-text-field>
    <v-btn type="submit">Добавить список</v-btn>
  </v-form>
</template>
<script>
export default {
  name: 'AddList',
  data() {
    return {
      title: '',
      completed: false
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      // add a validation !!!
      const newList = {
        title: this.title,
        completed: this.completed
      }
      this.$emit('add-list', newList)
      this.title = ''
      this.completed = false
      alert(`"${newList.title}" добавлено`)
    }
  }
}
</script>
