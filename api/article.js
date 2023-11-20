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