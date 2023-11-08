//数据持久化
const STORAGE_KEY = 'search-list';
//搜索历史数组的最大长度
const HISTORY_LEN = 10;
export default {
	//独立命名空间
	namespaced: true, 
	//模块内容
	state: ()=> ({
		//默认读取本地存储(第一次获取的时候可能是空值，所以要加个|| []来控制数据的类型)
		searchData: uni.getStorageSync(STORAGE_KEY) || [],
	}),
	mutations: {
		//添加搜索历史 (保存搜索内容到搜索历史)
		addSearchData(state, val) {
			//搜索历史数据的基本业务逻辑：
			//1.如果当前搜索内容已经存在，则原有搜索内容需要被展示到搜索历史的头部，而不是新增一条搜索内容
			//2.如果当前搜索内容不存在，则新的搜索内容会被展示到搜索历史的头部
			let aindex = state.searchData.findIndex(item=> item == val);
			if(aindex > -1) {
				state.searchData.splice(aindex, 1);
			}
			state.searchData.unshift(val);
			//超过最大长度要把最老的删掉
			if(state.searchData.length > HISTORY_LEN) {
				state.searchData.splice(HISTORY_LEN, state.searchData.length - HISTORY_LEN);
			}
			//在vuex的模块中，通过 this.commit函数调用mutation
			//this.commit函数接收一个字符串为当前mutation的路径 this.commit('模块/mutation名')
			this.commit('search/saveToStorage');
		},
		//删除搜索历史
		removeSearchItem(state, index) {
			state.searchData.splice(index,1);
			this.commit('search/saveToStorage');
		},
		//删除全部搜索历史
		removeAllSearchData(state) {
			state.searchData = [];
			this.commit('search/saveToStorage');
		},
		//存储搜索历史到本地
		saveToStorage(state) {
			uni.setStorage({
				key: STORAGE_KEY,
				data: state.searchData
			})
		}
	}
}