<template lang="pug">
  div
    p {{ count }}
    button(v-on:click="increment(1)") +1
</template>

<script>
export default {
  computed: {
    count() {
      return this.$store.state.count
    }
  },

  methods: {
    increment(value) {
      this.$store.commit('increment', {value})
    }
  }
}
</script>

