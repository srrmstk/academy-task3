<template>
  <div class="todo-lists">
    <v-select
        :items="sortType"
        v-model="select"
        label="Сортировка"
        outlined
        dense>
    </v-select>
    <v-list>
      <v-list-item-group>
        <v-list-item
            v-for="listItem in lists"
            :key="listItem.id">
          <List @delete-list="$emit('delete-list', listItem.id, listItem.title)" :list-item="listItem"/>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import List from "@/components/List";

export default {
  name: 'Lists',
  components: {List},
  props: {
    lists: Array
  },
  data: () => ({
    select: 'Неисполненные',
    sortType: ['Неисполненные', 'Исполненные', 'Все']
  })
}
</script>

<style scoped lang="scss">

</style>