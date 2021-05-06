<template>
  <div class="todo-lists">
    <v-select
        :items="sortType"
        @change="fetchLists(select)"
        v-model="select"
        label="Сортировка"
        outlined
        dense>
    </v-select>
    <v-list flat>
      <v-list-item-group>
        <v-list-item
            v-for="list in allLists"
            :key="list.id">
          <List :list="list"/>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import List from "@/components/List";
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Lists',
  components: {List},
  data: () => ({
    select: 'Неисполненные',
    sortType: ['Неисполненные', 'Исполненные', 'Все']
  }),
  methods: {
    ...mapActions(['fetchLists', 'filterLists'])
  },
  computed: {
    ...mapGetters(['allLists'])
  },
  created() {
    this.fetchLists(this.select)
  }
}
</script>

<style>

</style>
