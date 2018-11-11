export const strict = false

export const state = () => ({
  count: 1
})

export const mutations = {
  increment (state, { value }) {
    state.count += value
  }
}