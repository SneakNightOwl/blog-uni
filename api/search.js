import request from '../utils/request.js'

//获取默认搜索内容
export function getSearchDefaultText(param) {
	return request({
		url:'/search/default-text',
		method:'GET',
		data:param
	})
}
//热搜搜索列表
export function getSearchHOtList(param) {
	return request({
		url:'/search/hot-list',
		method: 'GET',
		data: param
	})
}