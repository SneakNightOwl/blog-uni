/* 使用dayjs */
//1.导入dayjs
import dayjs from 'dayjs';
//2.dayjs默认语言是英文，要想把语言配置成中文，需要导入中文语言包
import 'dayjs/locale/zh-cn';
//3.导入relativeTime模块
import rTime from 'dayjs/plugin/relativeTime';

//4.加载中文语言包到dayjs中
dayjs.locale('zh-cn');
//5.加载相对时间模块
dayjs.extend(rTime);

export function relativeTime(val) {
	//返回dayjs处理之后的相对时间
	//to()表示相对时间
	//to()接收一个参数，这个参数为当前时间
	// console.log(`dayjs(val):${dayjs(val)}`);
	// console.log(`dayjs().to(dayjs(val)): ${dayjs().to(dayjs(val))}`);
	return dayjs().to(dayjs(val));
}


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