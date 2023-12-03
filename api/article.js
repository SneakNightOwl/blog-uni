import request from '../utils/request.js';

//文章详情
export function getArticleDetail(data) {
	return request({
		url:'/article/details',
		method:'GET',
		data
	})
}
//评论列表
export function getArticleCommentList(data) {
	return request({
		url: '/article/comment/list',
		method:'GET',
		data
	})
}

//点击关注
export function fllowUser(data) {
	return request({
		url:'/user/follow',
		method: 'GET',
		data
	})
}

//发送评论
export function sendComment(data) {
	return request({
		url:'/user/article/comment',
		method: 'POST',
		data
	})
}

//点赞
export function userPraise(data) {
	return({
		url:'/user/praise',
		method: 'GET',
		data
	})
}

//收藏
export function userCollect(data) {
	return({
		url:'/user/collect',
		method: 'GET',
		data
	})
}