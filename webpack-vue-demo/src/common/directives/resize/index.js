import { DirectiveBinding } from 'vue'
export default {
    install: (Vue) => {
        Vue.directive('click-outside', {
            /**
             * @param {HTMLElement} el
             * @param {DirectiveBinding} binding
             */
            bind: function (el, binding) {
            }
        })
    }
}