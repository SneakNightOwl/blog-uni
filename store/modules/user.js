const TOKENKEY = 'BLOG_TOKEN';

import { getUserInfo } from '../../api/user.js';

export default {
	namespaced: true,
	state: ()=>({
		token:uni.getStorage(TOKENKEY) || ''
	}),
	//存放同步操作
	mutations: {
		saveLogin(state, token) {
			state.token = token;
			uni.setStorage({
				key: TOKENKEY,
				data: token
			});
			uni.showToast({
				title:'登录成功！'
			})
		},
		removeLogin(state) {
			//删除登录状态
			state.token = '';
			uni.removeStorage({key: TOKENKEY});
			uni.showToast({
				title:'已退出登录'
			})
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
			console.log(res,'登录接口');
			context.commit('saveLogin', res.token);
				// console.log(userprofile, '微信用户信息');
		}
	}
}