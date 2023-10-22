import request from '../utils/request.js';

//热搜tab
export function getHotTabs(params) {
	return request({
		url: '/hot/tabs',
		method: 'GET',
		data: params
	})
} 
//热搜List
export function getHotListFromTabType(params) {
	return request({
		url: '/hot/list',
		method: 'GET',
		data: params
	})
}