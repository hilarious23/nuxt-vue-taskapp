export const strict = false

export const state = () => ({
  tasks: [
    {
      id: 1,
      name: 'buy milk',
      done: false,
    },
    {
      id: 2,
      name: 'buy book',
      done: true,
    }
  ]
})

export const mutations = {
  increment(state, amount) {
    state.count += amount
  }
}