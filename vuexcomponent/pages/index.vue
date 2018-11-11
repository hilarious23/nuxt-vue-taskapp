<template lang="pug">
  div
    p {{ value }}
    button(v-on:click="add(1)") +1
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    // オブジェクトスプレッド演算子を使って、通常の算出プロパティの定義と
    // mapStateの戻り値を結合する。
    // mapState使うと通常のcomputedの計算定義できないので...使う
    // this.$store.state.countをthis.valueに結びつける。このように結びつけするときは{}
    ...mapState({
      value: 'count'
    })
  },
  methods: {
    // ...mapMutationsはmethodsの最初で定義。以降のmethodsで必要になるから？
    // $store.commit('increment', value)をthis.increment(value)で呼び出せるようにする
    // 結びつけ不要なので[]
    ...mapMutations([
      'increment'
    ]),
    // 上記によりthis.increment()で呼び出し可能。
    // 引数は必ず{}付き。commit('increment', value)だったけど、そのときだけ特殊
    // commit('x', { value, sender })のように基本{}必要
    add(value) {
      this.increment({value})
    }
  }
}
</script>
