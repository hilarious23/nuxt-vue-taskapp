<template lang="pug">
  div
    h2 タスク一覧 
    input(type="text" v-model="filteredWord")
    ul
      li(v-for="task in filteredTaskList" v-bind:key="task.id")
        //- task.doneがtrueならcheckedになる
        input(type="checkbox" v-bind:checked="task.done"
          v-on:change="toggleTaskStatus(task)")
        span {{ task.name }}
        span(v-for="id in task.labelIds" v-bind:key="id") {{ getLabelText(id)}}
    
    form(v-on:submit.prevent="addTask")
      input(type="text" v-model="newTaskName" placeholder="add new Task")

    h2 ラベル一覧
    ul
      li(v-for="label in labels" v-bind:key="label.id")
        //- checkされたらlabel.idがvalueになり、それがv-modelされnewTaskLabelIdsに保持される
        input(type="checkbox" v-bind:value="label.id"
          v-model="newTaskLabelIds")
        span {{ label.text }}

    form(v-on:submit.prevent="addLabel")
      input(type="text" v-model="newLabelText" placeholder="new Label")

    h2 ラベルでフィルタ
    ul
      li(v-for="label in labels" v-bind:key="label.id")
        input(type="radio" v-bind:checked="label.id === filter"
          v-on:change="changeFilter(label.id)")
        span {{ label.text }}
      li
        input(type="radio" v-bind:checked="filter === null"
          v-on:change="changeFilter(null)")
        span フィルタしない
</template>

<script>
import task from '~/assets/data/task.json'

export default {
  data() {
    return {
      filteredWord: '',
      newTaskName: '',
      newTaskLabelIds: [],
      newLabelText: ''
    }
  },
  computed: {
    // 直後のfilteredTaskListで使うようにtasksを取得
    tasks() {
      // storeのstateを読む
      return this.$store.getters.filteredTasks
    },
    filteredTaskList() {
      const filtered = this.tasks.filter(task => {
        return task.name.includes(this.filteredWord)
      })
      return filtered
    },
    // getLabelTextで使う用にstate.labelsを取得
    labels () {
      return this.$store.state.labels
    },
    filter() {
      return this.$store.state.filter
    }
  },
  methods: {
    addTask() {
      // stateの更新なのでmutation→なのでcommit
      // addTaskmutationにわたすべきものは渡す
      this.$store.commit('addTask', {
        name: this.newTaskName,
        labelIds: this.newTaskLabelIds
      })
      this.newTaskName = ''
      this.newTaskLabelIds = []
    },

    // タスクの完了状態を更新する。なのでcommit
    toggleTaskStatus(task) {
      this.$store.commit('toggleTaskStatus', {
        id: task.id
      })
    },

    addLabel () {
      this.$store.commit('addLabel', {
        text: this.newLabelText
      })
      this.newLabelText = ''
    },

    // liのtaskの中の更にtask.labelIdsをforループ
    getLabelText(id) {
      // toKOMAKI
      const label = this.labels.filter(label => label.id === id)[0]
      return label ? label.text : ''
    },

    // フィルタする対象のラベルを変更する
    changeFilter (labelId) {
      this.$store.commit('changeFilter', {
        filter: labelId
      })
    }
  }
}
</script>