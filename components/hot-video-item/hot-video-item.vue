<template>
	<view class="video-item-container">
		<view class="video-box">
		  <video :src="data.play_url"  danmu-btn  enable-danmu controls></video>	
		</view>
		<hot-video-info :data="data"></hot-video-info>
	</view>
</template>

<script>
	export default {
		name:"hot-video-item",
		props: {
			data: {
				type: Object,
				required: true
			}
		}
	}
</script>

<style lang="scss" scoped>
.video-item-container {
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