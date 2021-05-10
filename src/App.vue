<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="4" class="lists-column">
          <Lists/>
        </v-col>
        <v-divider vertical/>
        <v-col>
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-container>
    <v-footer fixed>
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="4" class="lists-column">
            <AddList/>
          </v-col>
          <v-col class="d-flex tasks-column">
            <AddTask :lists="allLists"/>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import Lists from "@/components/Lists";
import AddTask from "@/components/AddTask";
import AddList from "@/components/AddList";
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  components: {AddList, AddTask, Lists},
  computed: {
    ...mapGetters(['allLists'])
  }
}
</script>

<style lang="scss" scoped>
@media (max-width: 767px) {
  .lists-column {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>