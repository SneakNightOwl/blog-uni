<template>
	<view class="operate-container">
		<view class="comment-box" @click="onComment">
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
			<article-praise 
			     :articleData = "articleData"
			     @onPraise = "$emit('onPraiseClick')"></article-praise>
		</view>
		<view class="options-box">
			<!-- 收藏 -->
			<article-collect
			  :articleData = "articleData"
			  @onCollect = "$emit('onCollectClick')"></article-collect>
		</view>
	</view>
</template>

<script>
	import { mapActions } from 'vuex';
	export default {
		//底部功能区
		name:"article-operate",
		props: {
			articleData: {
				type: Object,
				required: true
			}
			// isCollect:{
			// 	type: Boolean,
			// 	required: true
			// },
			// isPraise: {
			// 	type: Boolean,
			// 	required: true
			// }
		},
		data() {
			return {
				
			};
		},
		methods: {
			...mapActions('user',['isLogin']),
			async onComment() {
				const islogin = await this.isLogin();
				//登录后才可以评论
				if(islogin) {
					this.$emit('onCommitClick')
				}
			}
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