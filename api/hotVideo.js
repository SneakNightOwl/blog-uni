import request from '../utils/request.js';

//热播列表
export function getHotVideoList(data) {
	return request({
		url:'/video/list',
		method: 'GET',
		data
	})
}

//弹幕列表
export function getVideoDanmuList(data) {
	return request({
		url:'/video/danmu',
		method: 'GET',
		data
	})
}