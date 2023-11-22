<template>
	<view class="my-login-container">
		<image class="avatar-img" src="../../static/images/default-avatar.png"></image>
		<text class="desc">登录后可同步数据</text>
		<button class="login-btn" type="primary" @click="tologin">微信用户一键登录</button>
	</view>
</template>

<script>
	import { mapActions } from 'vuex';
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		methods: {
			...mapActions('user',['login']),
			tologin() {
				let _self = this;
				uni.showLoading({
					title:'加载中'
				});
				// console.log(context,'context');
				uni.getUserProfile({
					desc:'申请用户信息用于平台登录',
					success(data) {
						// console.log(data,'微信接口的登录信息');
						_self.login(data);
					},
					fail(err){
						uni.showToast({
							title:'获取微信用户信息失败!',
							icon:'fail',
							// duration: 1500
						})
					},
					complete() {
						uni.hideLoading();
					} 
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.my-login-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	.avatar-img {
		width: $uni-img-size-big;
		height: $uni-img-size-big;
		margin: 100rpx auto 0;
	}
	.desc {
		font-size: $uni-font-size-base;
		color: $uni-text-color-grey;
		margin-top: 40rpx;
	}
	.login-btn {
		width: 80vw;
		margin-top: 40rpx;
	}
}
</style>