export const strict = false

export const state = () => ({
  // タスクの初期state
  tasks: [
    {
      id: 1,
      name: 'buy milk',
      labelIds: [1, 2],
      done: false,
    },
    {
      id: 2,
      name: 'buy book',
      labelIds: [1, 3],
      done: true,
    }
  ],

  labels: [
    {
      id: 1,
      text: '買い物'
    },
    {
      id: 2,
      text: '食料'
    },
    {
      id: 3,
      text: '本'
    }
  ],
  // 次に追加するタスク,labelのID、実際はコレは生成する
  nextTaskId: 3,
  nextLabelId: 4,
  // フィルタするラベルのID初期値
  filter: null,
  searchWord: null
})

// gettersはstateから計算した値を返す処理
export const getters = {
  filteredTasks (state) {
    // labelが選択されていなければそのままの一覧を返す
    if (!state.filter && !state.searchWord) {
      return state.tasks
    }

    if (!!state.filter && !state.searchWord) {
    // 選択されたlabelでフィルタリングする
    // 各taskでtask.labelIdsにstate.filterがあるか検索
    // あれば最初に見つかった位置のindexが返ってくる（つまりあるなら0以上)
    // task.labelIds.indexOf(state.filter)が0以上になるtaskかを判断
    // 条件を満たすstate.tasksをreturn
      return state.tasks.filter(task => {
        return task.labelIds.indexOf(state.filter) >= 0
    })    
    }

    if (!state.filter && !!state.searchWord) {
      return state.tasks.filter(task => {
        return task.name.includes(state.searchWord)
      })
    }

    if (!!state.filter && !!state.searchWord) {
      const filtered = state.tasks.filter(task => {
        return task.labelIds.indexOf(state.filter) >= 0
      })
      return filtered.filter(task => {
        return task.name.includes(state.searchWord)
      })
    }
    // return state.tasks.filter(task => {
    //   return task.labelIds.indexOf(state.filter) >= 0 && task.name.includes(state.searchWord)
    // })
  },

  // filteredTaskList (state) {
  //   if (!state.searchWord) {
  //     return state.tasks
  //   }
  //   console.log(state.searchWord)
  //   const filtered = state.tasks.filter(task => {
  //     return task.name.includes(state.searchWord)
  //   })[0]
  //   console.log(filtered)
  //   return filtered
  // }
} 

// mutationsはstateの更新
export const mutations = {
  // commitで受け取るものは{}で第二引数にしとく
  addTask (state, { name, labelIds }) {
    // タスク追加。name: nameの省略
    state.tasks.push({
      id: state.nextTaskId,
      name,
      labelIds,
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
  },

  // labelの追加
  // commitで受け取るものは{}で第二引数にしとくtext: textの略
  addLabel(state, { text }) {
    state.labels.push({
      id: state.nextLabelId,
      text
    })
    // 次に追加されるlabelのIDを更新
    state.nextLabelId++
  },

  // フィルタリング対象のラベルを変更する
  changeFilter (state, { filter }) {
    state.filter = filter
  },

  setSearchWord(state, { searchWord }) {
    state.searchWord = searchWord
  },

  // stateを復元する
  restore (state, { tasks, labels, nextTaskId, nextLabelId }) {
    state.tasks = tasks
    state.labels = labels
    state.nextTaskId = nextTaskId
    state.nextLabelId = nextLabelId
  }
}

// 外を経てmutationを呼び出すactions
export const actions = {
  // localstorageにstateを保存する
  save ({ state }) {
    const data = {
      tasks: state.tasks,
      labels: state.labels,
      nextTaskId: state.nextLabelId,
      nextLabelId: state.nextLabelId
    }
    // localStorageには文字列しか保存できないのでJSON.stringifyで変換
    localStorage.setItem('task-app-data', JSON.stringify(data))
  },

  restore ({ commit }) {
    const data = localStorage.getItem('task-app-data')
    if (data) {
      // JSON.parseでオブジェクトに戻す
      commit('restore', JSON.parse(data))
    }
  }
}