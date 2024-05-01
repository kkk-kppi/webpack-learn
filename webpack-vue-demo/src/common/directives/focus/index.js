
import { DirectiveBinding } from "vue"
export default {
    install(Vue) {
        Vue.directive('focus', {
            /**
             * 
             * @param {HTMLElement} el 
             * @param {DirectiveBinding} binding 
             */
            inserted: function (el, binding) {
                el.focus();
            }
        });
    }
}