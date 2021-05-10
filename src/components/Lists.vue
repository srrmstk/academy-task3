<template>
  <div class="todo-lists">
    <v-select
        :items="sortType"
        v-model="select"
        label="Сортировка"
        outlined
        dense>
    </v-select>
    <v-divider/>
    <v-list>
      <List
          :list="list"
          v-for="list in listsGetter"
          :key="list.id"/>
      <v-list-item-group>
      </v-list-item-group>
    </v-list>
    <v-divider/>
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
    ...mapActions(['fetchLists'])
  },
  computed: {
    ...mapGetters(['allLists', 'completedLists', 'incompleteLists']),
    listsGetter() {
      let getter
      switch (this.select) {
        case 'Неисполненные':
          getter = this.incompleteLists
          break
        case 'Исполненные':
          getter = this.completedLists
          break
        case 'Все':
          getter = this.allLists
          break
      }
      return getter
    }
  },
  created() {
    this.fetchLists()
  }
}
</script>

<style>

</style>
