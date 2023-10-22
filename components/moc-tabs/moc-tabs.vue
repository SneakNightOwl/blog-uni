<template>
	<!-- 1.可以在父组件中定制样式
	2.可以在父组件指定数据
	3.可以在父组件中选中项 -->
	<view class="tab-container">
		<scroll-view scroll-x class="s-view" :show-scrollbar="false" :scroll-left="scrollLeft" :scroll-with-animation="true">
			<view class="content">	
			<!-- <view class="tab" :class="ind==activeIndex?'active':''" v-for="(item, ind) in tabData" :key="ind" @click="onTabClick(ind,$event)">{{item.label||item}}</view> -->
			 <view class="tab" 
			 :style="{
				 color:ind==activeIndex? defaultConfig.activeColor:defaultConfig.textColor
			 }"
			  :id="'_tab_'+ind" v-for="(item, ind) in tabData" :key="ind" @click="onTabClick(ind)">{{item.label||item}}</view>
			 <view class="underline" :style="{
				 width: defaultConfig.underlineWidth+'px',
				 height: defaultConfig.underlineHeight+'px',
				 background: defaultConfig.underlineColor,
				 transform: 'translateX('+slider.left+'px)', 
				 transition:'all 0.5s'}"></view>
			 <!-- <view class="bottom-line" ref="btmline" :animation="animationData"></view> -->
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"moc-tabs",
		props: {
			// 1.可以在父组件指定样式
			config: {
				type: Object,
				//default如果是复杂数据类型,那么需要指定value为一个函数，通过返回值的形式指定默认值
				default: ()=> {
					return {
						textColor:'$uni-base-color',
						activeColor: '#ff0000'
					};
				}
			},
			//2.可以在父组件中指定数据
			tabData: {
				type: Array,
				default: ()=> {
					return [];
				}
			},
			//3.可以在父组件中选中项
			//注意： 为了组件的普适性，父组件传过来的数据，是不可以在子组件修改的
			defaultIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				tabList: [],  //组件内部维护的数据对象
				//激活项
				activeIndex: -1,
				// animationData: {},
				tLeft: 0,
				scrollLeft: 0, //横向滚动
				tabList: [],
				//为每个item单独维护一个滑块项目
				slider: {
					left:0,
				},
				defaultConfig: {
					underlineWidth:30,  //下划线的宽
					underlineHeight: 2, //下划线的高
					underlineColor: '#f94d2a', //下划线的颜色
					textColor:'#333', //默认字体颜色
					activeTextColor: '#f94d2a'  //高亮字体颜色
				}
			};
		},
		created() {
			
		},
		mounted() {
			//this.activeIndex =  this.defaultIndex; //渲染页面时接收父组件传过来的默认值
		},
		methods: {
			// onTabClick(ind) {
			// 	// this.activeIndex = ind;
			// 	console.log(event,'eve');
			// 	//小程序不支持ref
			// 	// this.$nextTick(()=> {	
			// 	//  console.log(this.$refs);
			// 	// })
			// 	//创建一个动画实例
			// 		var animation = uni.createAnimation({
			// 			  duration: 500,
			// 				timingFunction: 'ease',
			// 			})
			// 		this.animation = animation;	
			// 		let offsetNumX = event.currentTarget.offsetLeft + 15;  //要加上padding值
			// 	//动画的内容
			// 	this.animation.translateX(offsetNumX).step();
			// 	this.animationData = animation.export();  //没有这一行代码，动画不会执行
			// 	// this.$nextTick(()=> {
			// 	// 	let btmLine = uni.createSelectorQuery().in(this).select(".tab");
			// 	// 	btmLine.boundingClientRect(data => {
			// 	// 		console.log(data);
			// 	// 		//创建一个动画实例
			// 	// 			var animation = uni.createAnimation({
			// 	// 				  duration: 500,
			// 	// 					timingFunction: 'ease',
			// 	// 				})
			// 	// 			this.animation = animation;	
			// 	// 			//通过index和tab的width计算要平移的数值(这种只适合tab宽度固定的情况)
			// 	// 			let width = data.width; 
			// 	// 			let offsetNumX = ind*width+15;  //要加上padding值
			// 	// 		//动画的内容
			// 	// 		this.animation.translateX(offsetNumX).step();
			// 	// 		this.animationData = animation.export();  //没有这一行代码，动画不会执行
			// 	// 	}).exec();
			// 	// })
			// },
			onTabClick(ind) {
			    this.activeIndex = ind;
				this.tabToIndex();
				let id = this.tabData[ind].id;
				console.log(id);
				this.$emit('tabClick', id)
			},
			tabToIndex() {
				const index = this.activeIndex;
				if(!this.tabList[index]) return;
				//计算滑块儿的滚动 this.slider.left
				//配置滚动条的left
				// left = tabItem.left + (tabItem.width - slider.width)/2
				this.slider = {
					left: this.tabList[this.activeIndex]._slider.left
				}
				//设置横向滚动
				this.scrollLeft = this.activeIndex * this.defaultConfig.underlineWidth;
			},
			updateTabWidth() {
				let data = this.tabList;
				if (data.length == 0) return;
				//固定写法，虽然有ref，但是存在兼容性问题
				let query = uni.createSelectorQuery().in(this);
				//遍历每一个tab获取精确的左偏移，不能用dom的left，因为这个api会忽视滚动条的影响拿到错误的offsetLeft
				data.forEach((item, index)=>{
					query.select("#_tab_"+index).boundingClientRect(res=>{
						//得用定义对象的语法，不然item.slider是undefined
						//为数据对象的每一个item维护一个_slider对象(可以有效避免横向滚动造成的left减少)
						item._slider = {
							//偏移量 = 左偏移 + (选中项的width - underline的width)/2
							left: res.left + (res.width - this.defaultConfig.underlineWidth)/2
						}
						if(data.length - 1 == index) {
							this.tabToIndex();
						}
					}).exec();
				})
			}
			//动态绑定样式(小程序不支持)
			// currentClass(ind) {
			//    if(ind==this.activeIndex) {
			// 	   return 'active'
			//    }else {
			// 	   return ''
			//    }
			// }
		},
		computed: {
		},
		watch: {
			config: {
				handler(obj) {
					let newConfig = { ...this.defaultConfig,  ...obj}; //后者覆盖掉前者的同名属性
					this.defaultConfig = newConfig;
				},
				//immediate: 当前的handler回调将会在监听执行后立刻被调用
				immediate: true
			},
			defaultIndex: {
				//defaultIndex发生变化时执行的回调
				handler(val) {
					this.activeIndex = val;
					//当swiper左右滑动时，滑块要跟着转移，并且tab要跟着横向滚动
					this.tabToIndex();
					// if(this.tabList[val]) {
					//   this.slider.left = this.tabList[val]._slider.left;	
					//   this.scrollLeft = this.activeIndex * this.defaultConfig.underlineWidth;
					// }
				},
				//immediate: 当前的handler回调将会在监听执行后立刻被调用
				immediate: true
			},
			tabData: {
				handler(val) {
					this.tabList = val;
					//维护tabList中的每个item,时机为dom渲染完成之后
					//this.$nextTick() uniapp虽然支持，但是存在兼容性问题
					setTimeout(()=>{
						// 计算item的slider
						this.updateTabWidth();
					},0)
				},
				immediate: true
			}
		}
	}
</script>

<style lang="scss" scoped>
 .tab-container {
	 width: 100%;
	 height: 80rpx;
	 background-color: #f5f5f5;
	 // overflow-x: auto;
	 overflow-y: hidden;
	 .s-view {
		 width: 100%;
		 height: 86rpx;
		 white-space: nowrap;
		 
		 .content {
			 width: 100%;
			 height: 100%;
			 position: relative;
		 }
		 .tab {
			 display: inline-block;
			 font: normal 32rpx/78rpx 'Microsoft YaHei'; //注意这里的行高，否则挤压底部边框
			 padding:0 30rpx;
			 // color: $uni-base-color;
			 border-bottom: 2rpx solid transparent;
			 box-sizing: border-box;
			 // &:active .bottom-line{
				//  transform: translateX(10%);
			 // }
		 }
		 .active {
			 color: #ff0000;
			 // border-bottom: 2rpx solid #ff0000;
		 }
		 .bottom-line {
			 width:60rpx;
			 height: 4rpx;
			 background: #ff0000;
			 position:absolute;
			 bottom: 8rpx;
			 // left: 4%;
			 transform: translateX(20rpx);
		 }
		 //不支持兄弟选择器 只支持class选择器
		 // .tab:active~.bottom-line{
		 // 	  transform: translateX(30rpx);
		 // }
	    .underline {
			// width: 60rpx;
			// height: 4rpx;
			// background: #ff0000;
			position:absolute;
			bottom: 8rpx;
		}
	 }
 }
</style>