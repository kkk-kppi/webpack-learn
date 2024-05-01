// import _ from 'lodash';
import './common'
function component() {
    const element = document.createElement('div');
    element.style.fontFamily = 'Gap-Regular-2'
    // lodash 现在使用 import 引入
    // element.innerHTML = _.join(['This', 'is', 'a', 'bundle'], ' ');
    element.innerHTML = 'This is a bundle，test watch'
    return element;
}
document.getElementById('app').appendChild(component())