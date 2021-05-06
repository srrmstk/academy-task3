<template>
  <v-app>
    <v-container
        fluid>
      <v-row>
        <v-col sm="3">
          <Lists/>
        </v-col>
        <v-divider vertical/>
        <v-col sm="9">
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-container>
    <v-footer fixed>
      <v-container fluid>
        <v-row>
          <v-col sm="3">
            <AddList/>
          </v-col>
          <v-col class="d-flex" sm="9">
            <AddTask/>
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

export default {
  name: 'App',
  components: {AddList, AddTask, Lists}
}
</script>
