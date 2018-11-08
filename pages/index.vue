
<template lang="pug">
  div
    input(type="text" v-model="filteredWord")
    ul
      li(v-for="task in filteredTaskList" v-bind:key="task.id")
        p {{ task.name }}
        p {{ task.done }}
        p {{ task.labels }}
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
      return task
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