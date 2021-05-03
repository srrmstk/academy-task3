<template>
  <div :class="['list__item', listItem.isDone ? 'list__item_done' : '']">
    <router-link :to="{name: 'tasks', params: {id: listItem.id}}">
      {{ listItem.title }}
    </router-link>
    <i @click="$emit('delete-list', listItem.id, listItem.title)" class="fas fa-times"></i>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    listItem: Object
  },
  methods: {},
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>