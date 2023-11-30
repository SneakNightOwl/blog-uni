const TOKEN_KEY = 'blog_token';
const USER_INFO_KEY = 'user_info'

import { getUserInfo } from '../../api/user.js';

export default {
	namespaced: true,
	state: ()=>({
		token:uni.getStorageSync(TOKEN_KEY) || '',
		userInfo: uni.getStorageSync(USER_INFO_KEY) || {}
	}),
	//存放同步操作
	mutations: {
		saveToken(state, token) {
			state.token = token;
			uni.setStorage({
				key: TOKEN_KEY,
				data: token
			});
		},
		saveUserInfo(state, userInfo) {
			state.userInfo = userInfo;
			uni.setStorage({
				key: USER_INFO_KEY,
				data: userInfo
			})
		},
		removeToken(state) {
			//删除登录状态
			state.token = '';
			uni.removeStorage({key: TOKEN_KEY});
		},
		removeUserInfo(state) {
			//删除用户信息
			state.userInfo = {};
			uni.removeStorage({key: USER_INFO_KEY});
		}
	},
	//存放异步操作
	actions: { 
		//第一个参数是一个具有和store实例相同方法和属性的context对象
		//第二个参数是组件传过来的数据
		async login(context, userprofile) {
			// console.log(context,'context');
			const userInfo = userprofile.userInfo;
			const {data: res} = await getUserInfo({ 
				signature: userprofile.signature,  //使用sha1得到字符串，用于校验用户信息,
				iv: userprofile.iv,  //加密算法的初始向量
				nickName: userInfo.nickName,  //昵称
				gender: userInfo.gender,  //性别 0女 1男
				city: userInfo.city,
				province: userInfo.province,
				avatarUrl: userInfo.avatarUrl  //头像路径
			})
			console.log(res,'token');
			//这里的this指向$store
			this.commit('user/saveToken',res.token);
			this.commit('user/saveUserInfo',userprofile.userInfo)
		},
		logout(context) {
			this.commit('user/removeToken');
			this.commit('user/removeUserInfo');
		},
		//判断是否登录
	    async isLogin(context) {
			// console.log(context,'点击关注 context');
			if(context.state.token ) return true;
			//使用await可以获取 操作后的modal的返回值
			//如果不使用await, 获得的将是一个pending 的 promise
			const [err, { confirm }] = await uni.showModal({
				title:'登录后才可以操作!',
				content:'是否前往登录？'
			})
			console.log(confirm,'modal');
			if(confirm) {
				uni.navigateTo({
					url:'/subpkg/pages/login-page/login-page'
				})
			}
			return false;
		}
	}
}