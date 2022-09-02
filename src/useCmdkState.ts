import { reactive, toRefs } from 'vue'

const state = reactive({
  selectedNode: '',
  selectedGroup: ''
})

const useCmdkState = () => {
  return {
    ...toRefs(state)
  }
}

export { useCmdkState }
