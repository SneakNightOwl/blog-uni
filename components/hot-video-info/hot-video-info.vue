<template>
	<view class="video-info-container">
	   <view class="title">{{data.title}}</view>
	   <view class="info-box">
		   <view class="author-box">
		   	<image :src="data.author_avatar" class="avatar"></image>
		   	<text>{{data.source_name}}</text>
		   </view>
		   <view class="barrage-box">
		   	<uni-icons type="videocam" size="32" color="#bababa"></uni-icons>
		   	<text>{{data.fmplaycnt}}</text>
		   </view>
	   </view>
	</view>
</template>

<script>
	export default {
		name:"hot-video-info",
		props: {
			data: {
				type: Object,
				required: true
			}
		}
	}
</script>

<style lang="scss" scoped>
.video-info-container {
   .title {
	   font-size: $uni-font-size-title;
	   color: $uni-text-color-inverse;
	   font-weight: bold;
	   position:absolute;
	   top:10px;
	   left:0;
	   right: 0;
	   margin: auto;
   }
   .info-box {
	   display: flex;
	   justify-content: space-between;
	   padding: 0 $uni-spacing-row-base;
	   
	   .author-box, .barrage-box {
		   display: flex;
		   align-items: center;
	   	   font-size: $uni-font-size-base;
	   	   color: $uni-text-color;
		   
		   text {
			   margin-left: $uni-spacing-col-sm;
		   }
	   }
   }
   
}
</style>