import request from '../utils/request.js';

//热播列表
export function getHotVideoList(data) {
	return request({
		url:'/video/list',
		method: 'GET',
		data
	})
}