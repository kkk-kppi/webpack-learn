### webpack + webpack-dev-server实现开发环境

### 问题收集

1. webpack工程配置环境变量时，读出来的值报错无法匹配
Uncaught SyntaxError: Invalid regular expression: missing /
使用dotenv-webpack插件，参考如下：<https://github.com/mrsteele/dotenv-webpack>
<br>

2. webpack工程中，vue-router使用history模式路由，会出现Cannot GET {router path}的情况
Error：GET <http://localhost:9080/login> 404 (Not Found)、
原因（官网说明）：<https://v3.router.vuejs.org/zh/guide/essentials/history-mode.html>
<br>

3. （TODO：待解决） vue-router，有以下嵌套路由
```javascript
{
    path: '/',
    component: indexVue,
    name: 'index',
    children: [
        {
            path: 'home',
            component: homeVue,
            name: 'index-home',
            meta: {
                title: '系统首页'
            }
        },
        {
            path: 'home/:user',
            component: userHomeVue,
            name: 'index-user-home',
            meta: {
                // 或者说工作台
                title: '个人首页'
            }
        }
    ]
}
```
将vue-router的mode设置为history模式时，地址栏输入`http://localhost:9080/home`无法渲染到对应页面；但是将mode改为hash模式时，地址栏输入`http://localhost:9080/#/home`却能正确渲染，这是为什么？
<br>

4.（TODO：待解决） 一级路由`http://localhost:9080/home`
```javascript
routes: [
    // ......
    {
        path: '/page',
        component: pageVue,
        name: 'page',
    }
]
```
在文件组件中添加`beforeRouteEnter`钩子后，组件渲染空白，这是为什么？
原因：因为beforeRouteEnter没有调用next钩子，beforeRouteEnter需要调用next钩子以进入对应页面
```javascript
beforeRouteEnter() {}
```
<br>