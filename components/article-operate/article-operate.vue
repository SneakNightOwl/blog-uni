<template>
	<view class="operate-container">
		<view class="comment-box">
			<!-- 组件 my-search -->
			<my-search 
			   :isShowInput="false" 
			   placeHolderText="评论一句,前排打call..."
			   :config = "{
				   height:60 +'rpx',
				   lineHeight: 60 +'rpx',
				   backgroundColor: '#eeedf4',
				   icon: '/static/images/input-icon.png',
				   textColor: '#a6a5ab',
				   border: 'none'
			   }"
			   >
			   </my-search>
		</view>
		<view class="options-box">
			<!-- 点赞 -->
			<article-praise></article-praise>
		</view>
		<view class="options-box">
			<!-- 收藏 -->
			<article-collect></article-collect>
		</view>
	</view>
</template>

<script>
	export default {
		name:"article-operate",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.operate-container {
	width: 100%;
	height: 120rpx;
	padding: $uni-spacing-col-sm $uni-spacing-row-base;
	position: fixed;
	left: 0;
	bottom: 0;
	border: 1px solid $uni-text-color-grey;
	background-color: $uni-bg-color;
	display: flex;
	box-sizing: border-box;
	align-items: center;
	// justify-content: space-around;
	.comment-box {
		width: 70%;
	}
	.options-box {
		width: 15%;
	}
}
</style>