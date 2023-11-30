<template>
	<view class="comment-container" :style="{bottom: bottom+'px'}">
		<uni-easyinput 
		   v-model="value" 
		   placeholder="说点什么吧..."
		   type="textarea"
		   :inputBorder="false"
		   maxlength="50"
		   ></uni-easyinput>
		<button class="btnButton" type="primary" size="mini" :disabled="!value" @click="sendCommit">发送</button>
	</view>
</template>

<script>
	export default {
		//评论的文本域
		name:"article-comment-commit",
		data() {
			return {
				value: '',
				bottom: 0,
			};
		},
		created() {
			//解决软键盘弹出造成的输入框被覆盖的问题
			uni.onKeyboardHeightChange(({ height }) => {
			   this.bottom = height;
			})
		},
		methods: {
			//发送评论
			sendCommit() {
				this.$emit('onSendCommit',this.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
.comment-container {
	height: 200rpx;
	background-color: $uni-bg-color;
	padding: $uni-spacing-col-base $uni-spacing-row-base;
	text-align: right;
	position: relative;
	.btnButton {
		position: absolute;
		bottom: 10rpx;
		right:8rpx;
	}
}
</style>