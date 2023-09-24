import _ from 'lodash';
import './common'
// css-loader
import './assets/css/common.css'
import './assets/css/font.css'
// assets/resources
import IMAGE_JPG from './assets/img/demo1.jpg'
import IMAGE_PNG from './assets/img/demo4.png'
import IMAGE_JPEG from './assets/img/demo2.jpeg'
import IMAGE_WEBG from './assets/img/demo3.webp'
import ICON_SVG from './assets/svg/none-data.svg'
// 内置了对json的处理
import jsonData from './assets/json/data.json'
// csv
import csvData from './assets/csv/data.csv'
// xml
import xmlData from './assets/xml/data.xml'
// toml
import tomlData from './assets/toml/data.toml'
// yaml
import yamlData from './assets/yaml/data.yaml'
// json5
import json5Data from './assets/json/data.json5'
// test alias
import jsonData5 from '~assets/json/data.json5'
function component() {
    const element = document.createElement('div');
    element.style.fontFamily = 'Gap-Regular-3'

    // lodash 现在使用 import 引入
    element.innerHTML = _.join(['Hello', 'webpack', 'test', 'webpack-dev-server......'], ' ');
    console.log('test')
    return element;
}

function image() {
    const element = document.createElement('div');
    // 引入图片
    const jpg = new Image()
    jpg.style.width = '400px'
    jpg.src = IMAGE_JPG
    element.appendChild(jpg);

    const png = new Image()
    png.style.width = '400px'
    png.src = IMAGE_PNG
    element.appendChild(png);

    const jpeg = new Image()
    jpeg.style.width = '400px'
    jpeg.src = IMAGE_JPEG
    element.appendChild(jpeg);

    const webp = new Image()
    webp.style.width = '400px'
    webp.src = IMAGE_WEBG
    element.appendChild(webp);

    const svg = new Image()
    svg.style.width = '400px'
    svg.src = ICON_SVG
    element.appendChild(svg);

    return element
}

function breakLine() {
    console.log('break line....')
    document.getElementById('app').appendChild(document.createComment('br'))
}
document.getElementById('app').appendChild(component());
breakLine()
document.getElementById('app').appendChild(image());

console.log(jsonData)
console.log()
console.log(csvData)
console.log()
console.log(xmlData)
console.log()
console.log(tomlData)
console.log()
console.log(yamlData)
console.log()
console.log(json5Data)
console.log()
console.log(jsonData5)
console.log()