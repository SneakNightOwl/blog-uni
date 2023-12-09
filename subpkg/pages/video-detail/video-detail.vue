<template>
	<view class="video-detail-container">
		<view class="video-box">
		  <video :src="videoData.play_url"  danmu-btn  controls :danmu-list="danmuList"></video>	
		</view>
		<view>
			<hot-video-info :data="videoData"></hot-video-info>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { getVideoDanmuList } from '../../../api/hotVideo.js';
	export default {
		data() {
			return {
				danmuList:[]
			};
		},
		created() {
			this.loadDanmuList();
		},
		computed: {
			//映射video模块的数据到组件中
			...mapState('video', ['videoData'])
		},
		methods: {
		 async loadDanmuList() {
				// console.log(this.videoData, 'mapState');
				const { data: res } = await getVideoDanmuList({
					videoId: this.videoData.id
				});
				this.danmuList = res.list;
				console.log(res.list, '弹幕列表');
			}
		}
	}
</script>

<style lang="scss" scoped>
.video-detail-container {
	position:relative;
	margin-bottom: $uni-spacing-col-lg;
	.video-box {
		video {
			width: 100%;
			height:250px;
		};
	}
}
</style>
