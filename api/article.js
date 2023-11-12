import request from '../utils/request.js';

export function getArticleDetail(data) {
	return request({
		url:'/article/details',
		method:'GET',
		data
	})
}