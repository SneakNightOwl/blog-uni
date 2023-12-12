<template>
	<view class="collect-container" @click="$emit('onCollect')">
		<image class="img" src="../../static/images/un-collect.png" v-if="!articleData.isCollect"></image>
		<image class="img" src="../../static/images/collect.png" v-else></image>
		<text class="txt" :style="{ color: articleData.isCollect? '#f94d2a':'#333' }">{{articleData.isCollect? '取消收藏':'收藏' }}</text>
		<!-- <text class="txt">{{articleData.isCollect? '取消收藏':'收藏' }}</text> -->
	</view>
</template>

<script>
	export default {
		name:"article-collect",
		props: {
			articleData: {
				type: Object,
				required: true,
				// default:()=>({})
			}
			// isCollect:{
			// 	type: Boolean,
			// 	required: true
			// }
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.collect-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	 .img {
	 	width: $uni-img-size-base;
	 	height: $uni-img-size-base;
	 }
	 .txt {
	 	font-size: $uni-font-size-sm;
	 	color: $uni-text-color;
	 }
}	
</style>