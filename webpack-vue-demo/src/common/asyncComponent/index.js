import TemplateLoading from './template-loading.vue'
import TemplateError from './template-error.vue'

const AsyncComponent = (target) => ({
    // 需要加载的组件 (应该是一个 `Promise` 对象)
    component: target,
    // 异步组件加载时使用的组件
    loading: TemplateLoading,
    // 加载失败时使用的组件
    error: TemplateError,
    // 展示加载时组件的延时时间。默认值是 200 (毫秒)
    delay: 200,
    // 如果提供了超时时间且组件加载也超时了，
    // 则使用加载失败时使用的组件。默认值是：`Infinity`
    timeout: 60000
})

export default AsyncComponent