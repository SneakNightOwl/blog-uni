const BASE_URL = 'https://api.imooc-blog.lgdsunday.club/api';
/*
params  {url, data, method}
*/
function request({url, data, method}) {
	return new Promise((resolve, reject)=> {
		uni.request({
		    url: BASE_URL + url,
		    data,
		    method,
			header: {
				'content-type': "application/x-www-form-urlencoded",
				'icode':"ACC05A058B1BB439"
			},
		    success: ({data, statusCode, header}) => {
				if(data.success) {
		           resolve(data)	
				}else {
					console.log(data.message);
					uni.showToast({
						title: data.message,
						icon: 'error',
						mask: true,
						duration:3000
					})
				}
		    },
			fail: (error) => {
				reject(error)
			},
			//请求结束之后的回调
			complete() {
				//关闭加载
				uni.hideLoading()
			}
		});
	})
}

export default request;