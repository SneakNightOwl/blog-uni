export default {
	//独立命名空间
	namespaced: true, 
	//模块内容
	state: ()=> ({
		searchData: []
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
		},
		//删除搜索历史
		removeSearchItem(state, index) {
			state.searchData.splice(index,1);
		},
		//删除全部搜索历史
		removeAllSearchData(state) {
			state.searchData = [];
		}
	}
}