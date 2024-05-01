import { ref, computed  } from 'vue'
import Router from '.'

const current = ref()
const routeList = ref([])

current.value = Router.currentRoute
routeList.value = Router.options.routes

const useRouterHooks = computed(() => {
  return {
    current: current.value,
    routes: routeList.value
  }
})

export default useRouterHooks