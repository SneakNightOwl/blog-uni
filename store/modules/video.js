export default {
	namespaced: true,
	state:()=>({
		videoData: {}
	}),
	mutations: {
		setVideoData(state, data) {
			state.videoData = data;
		},
		//修改videoData
		editVideoData(state, data) {
			//深拷贝 解构赋值  合并对象
			state.videoData = {...state.videoData, ...data};
		}
	}
}