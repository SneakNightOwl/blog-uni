<template>
	<view class="comment-item-container">
		<view class="left-box">
		   <!-- 用户头像 -->
			<image class="avatar" :src="info.avatar"></image>
		</view>
		<view class="right-box">
		    <!-- 用户昵称 -->
			<view class="nickname">{{ info.nickName || info.userName }}</view>
			<!-- 评论内容 -->
			<view class="content">{{ info.content }}</view>
			<!-- 发布时间(相对时间) -->
			<view class="release-time">{{ info.postTime | relativeTime }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"article-comment-item",
		props: {
			//父组件传过来的数据
			info: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.comment-item-container {
	display: flex;
	padding: $uni-spacing-col-lg 0;
	.right-box {
		display: flex;
		flex-direction: column;
		margin-left: $uni-spacing-row-sm;
		.nickname {
			color: $uni-text-color;
			font-size: $uni-font-size-sm;
			font-weight: bold;
		}
		.content {
			color: $uni-text-color;
			font-size: $uni-font-size-base;
			margin-top: $uni-spacing-col-sm;
		}
		.release-time {
			color: $uni-text-color-grey;
			font-size: $uni-font-size-sm;
			margin-top: $uni-spacing-col-sm;
		}
	}
}
</style>