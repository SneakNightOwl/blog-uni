import request from '../utils/request.js';

export function getUserInfo(data) {
	return request({
		url:'/sys/login',
		method: 'POST',
		data
	})
}