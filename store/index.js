//1.导入vue和vuex实例
import Vue from 'vue';
import Vuex from 'vuex';
import search from './modules/search';

//2.安装vuex插件
Vue.use(Vuex);

//3.创建store实例
const store = new Vuex.Store({
	modules: {
		search  //模块名称
	}
})

export default store;