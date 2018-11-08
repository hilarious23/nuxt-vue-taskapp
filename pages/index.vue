<template lang="pug">
  div タスク一覧
    h2 
    input(type="text" v-model="filteredWord")
    ul
      li(v-for="task in filteredTaskList" v-bind:key="task.id")
        //- task.doneがtrueならcheckedになる
        input(type="checkbox" v-bind:checked="task.done")
        p {{ task.name }}
        p {{ task.done }}
</template>

<script>
import task from '~/assets/data/task.json'

export default {
  data() {
    return {
      filteredWord: ''
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
  }
}
</script>