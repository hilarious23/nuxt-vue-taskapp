<template lang="pug">
  div タスク一覧
    h2 
    input(type="text" v-model="filteredWord")
    ul
      li(v-for="task in filteredTaskList" v-bind:key="task.id")
        //- task.doneがtrueならcheckedになる
        input(type="checkbox" v-bind:checked="task.done"
          v-on:change="toggleTaskStatus(task)")
        p {{ task.name }}
    
    form(v-on:submit.prevent="addTask")
      input(type="text" v-model="newTaskName" placeholder="add new Task")
</template>

<script>
import task from '~/assets/data/task.json'

export default {
  data() {
    return {
      filteredWord: '',
      newTaskName: ''
    }
  },
  computed: {
    tasks() {
      // storeのstateを読む
      return this.$store.state.tasks
    },
    filteredTaskList() {
      const filtered = this.tasks.filter(task => {
        return task.name.includes(this.filteredWord)
      })
      return filtered
    }
  },
  methods: {
    addTask() {
      // stateの更新なのでmutation→なのでcommit
      // addTaskmutationにわたすべきものは渡す
      this.$store.commit('addTask', {
        name: this.newTaskName
      })
      this.newTaskName = ''
    },

    // タスクの完了状態を更新する。なのでcommit
    toggleTaskStatus(task) {
      this.$store.commit('toggleTaskStatus', {
        id: task.id
      })
    }
  }
}
</script>