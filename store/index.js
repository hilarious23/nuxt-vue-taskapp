export const strict = false

export const state = () => ({
  // タスクの初期state
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
  ],
  // 次に追加するタスクのID、実際はコレは生成する
  nextTaskId: 3,
})

export const mutations = {
  addTask (state, { name }) {
    // タスク追加。name: nameの省略
    state.tasks.push({
      id: state.nextTaskId,
      name,
      done: false
    })
    // 次に追加されるタスクのIDを更新
    state.nextTaskId++
  },

  // タスク完了状態の更新（変更）
  toggleTaskStatus (state, { id }) {
    // 渡されたidと一致するタスクだけを検出するfilter
    const filtered = state.tasks.filter(task =>{
      return task.id === id
    })
    // そのタスクのtask.doneを更新する
    filtered.forEach(task => {
      task.done = !task.done
    })
  }
}