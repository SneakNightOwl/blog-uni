<template>
	<view class="phaise-container" @click="$emit('onPraise')">
		<image class="img" src="../../static/images/un-praise.png" v-if="!articleData.isPraise"></image>
		<image class="img" src="../../static/images/praise.png" v-else></image>
		<text class="txt" :style="{ color: articleData.isPraise? '#f94d2a':'#333' }">{{articleData.isPraise? '取消点赞':'点赞' }}</text>
		<!-- <text class="txt">{{articleData.isPraise? '取消点赞':'点赞' }}</text> -->
	</view>
</template>

<script>
	export default {
		name:"article-praise",
		props: {
			articleData: {
				type: Object,
				required: true,
				// default:()=>({})
			},
			// isPraise: {
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

<style lang="scss" scoped>
.phaise-container {
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