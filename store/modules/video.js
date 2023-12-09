export default {
	namespaced: true,
	state:()=>({
		videoData: {}
	}),
	mutations: {
		setVideoData(state, data) {
			state.videoData = data;
		}
	}
}