
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
//引入vuex的仓库
import store from './store/index';
//引入公共样式
import './styles/global.scss'
//注册过滤器(复习必看)
import * as filters from './filters/index.js'
//拿到filters所有的key，然后使用Vue.filter方法注册，以key为键，以filters[key]为值
Object.keys(filters).forEach(key=> {
	Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	//挂载实例
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif