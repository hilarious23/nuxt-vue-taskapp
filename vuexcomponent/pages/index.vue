<template lang="pug">
  div
    p {{ count }}
    button(v-on:click="increment(1)") +1
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  // $store.state.countをthis.countに結びつける →'count'のみ
  // $store.state.countをthis.valueに結びつける →value: 'count'
  computed: mapState([
    value: 'count'
  ]),
  // computed: {
  //   count() {
  //     return this.$store.state.count
  //   }
  // },
  // $store.commit('increment', value)をthis.increment(value)で呼び出せるようにする
  methods: mapMutations([
    'increment'
  ])
// methods: {
  //   increment(value) {
  //     this.$store.commit('increment', {value})
  //   }
  // }
}
</script>
