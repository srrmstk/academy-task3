<template>
  <div
      :class="['list__item',
      {'list__item_done': list.completed}]">
    <v-list-item>
      <router-link :to="{name: 'tasks', params: {id: list.id}}">
        {{ list.title }}
      </router-link>
    </v-list-item>
    <v-dialog
        v-model="dialog"
        max-width="290"
    >
      <template v-slot:activator="{ on, attrs }">
        <i
            class="fas fa-times list__item_delete"
            v-bind="attrs"
            v-on="on"></i>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Удалить список
        </v-card-title>

        <v-card-text>
          Удалить список "{{ list.title }}"?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              text
              @click="dialog = false"
          >
            Отмена
          </v-btn>
          <v-btn
              text
              @click="dialog = false; deleteList({id: list.id, text: list.text})"
          >
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'List',
  props: {
    list: Object
  },
  methods: {
    ...mapActions(['deleteList'])
  },
  data() {
    return {
      dialog: false
    }
  }
}
</script>

<style lang="scss" scoped>
.list__item {
  background: #B9F6CA;
  position: relative;
  &_done {
    background: #F5F5F5;
  }

  &_delete {
    position: absolute;
    top: 18px;
    right: 10px;
  }

  &_empty {
    background: #FFFFFF;
  }
}
</style>