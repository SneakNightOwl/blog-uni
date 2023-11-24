<template>
	<view class="my-login-container">
		<view class="noLogin" v-if="!token">
			<image class="avatar-img" src="../../static/images/default-avatar.png"></image>
			<text class="desc">登录后可同步数据</text>
			<button class="login-btn" type="primary" @click="tologin">微信用户一键登录</button>
		</view>
		<view class="hasLogin" v-else>
			<image class="avatar-img" :src="userInfo.avatarUrl"></image>
			<text class="desc">{{userInfo.nickName || userInfo.userName}}</text>
			<button class="login-btn" type="default" @click="tologout">退出登录</button>
		</view>
	</view>
</template>

<script>
	//引入mapActions
	import { mapActions, mapState } from 'vuex';
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		computed: {
			//映射user的state
			...mapState('user',['token', 'userInfo'])
		},
		methods: {
			//映射模块内定义的action
			...mapActions('user',['login','logout']),
			tologin() {
				let _self = this;
				uni.showLoading({
					title:'加载中'
				});
				uni.getUserProfile({
					desc:'申请用户信息用于平台登录',
					success: async(obj)=> {
                        //调用action并且传递数据
						await _self.login(obj);
						//登录成功之后发送一个事件
						_self.$emit('onLoginSuccess');
					},
					fail(err){
						uni.showToast({
							title:'授权已取消!',
							icon:'error',
							mask: true
							// duration: 1500
						})
					},
					complete() {
						uni.hideLoading();
					} 
				})
			},
			//退出登录
			tologout() {
				let _self = this;
				uni.showModal({
					title:'确定要退出登录?',
					content:'退出后将无法同步数据!',
					success:(res)=> {
						if(res.confirm) {
							_self.logout();
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.my-login-container {
	.noLogin,.hasLogin {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
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