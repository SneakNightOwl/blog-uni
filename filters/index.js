/*
* 将字符串转化为以千为单位
* @params {}  val
* 此方法在main.js中全局注册
*/
export function hotNumber (val) {
	const num = parseInt(val);
	if(num < 1000) return val;
	//把val转化成字符串
	val = val + '';
	//超过1000 转化为K
	return val.substring(0, val.length - 3)+'k';
}