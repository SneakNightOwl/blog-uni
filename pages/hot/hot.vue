<template>
	<!--5.1 问题1: 如何让list列表能够左右滑动切换
	           方法： 外面套一层swiper
		5.2 问题2：list列表高度展示错误
				 原因： 没有为swiper指定高度
				解决：计算出每一个list的item的高度，然后累加到一起，就是swiper的高度
		5.3 问题3： 切换tab时，list的卡顿问题
				原因： swiper动画未完成时，就去获取数据和渲染dom
				解决： 动画完成之后，再去获取数据、渲染dom
	      *兼容问题： (1) 动态计算swiper时真机测试没有把margin值纳入统计范围，(模拟器会计算margin)
		              解决办法：目前把list-item里的margin取消了,或者每一个tab下面的数据条数做缓存，主动计算缺失的margin值，在currentSwiperHeight后面补上	
        6.完成List和Tabs的联动	
		功能补充：1. tabs的吸顶功能	(tab外面套个盒子加个sticky)
			     2. 控制列表的滚动位置	
					用户向下滚动页面之后，切换tab，页面的滚动位置为tabs吸顶的位置(第一页滚到16条，第二页应当从第一条开始看)
				3.热度显示问题 超过1000 显示为K: 过滤器
	 -->
	<view class="wrap">
		<image class="logo" mode="aspectFit" src="@/static/images/logo.png"></image>
		<view @click="toSearch">
			<my-search placeHolder="请输入查询内容" ></my-search>
		</view>
		<!-- 父向子传参的时候遵循vue的语法 :data = "dataName" -->
		<!-- <moc-tabs 
		    :config = "{
				textColor:'#00ff66',
				activeColor: '#6633ff',
				underlineColor: '#6633ff'
			}"
		    :tabData="tabData" 
			:defaultIndex="currentIndex" @tabClick = "tabchange"></moc-tabs> -->
		<view class="tab-sticky">
			<moc-tabs :tabData="tabData" :defaultIndex="currentIndex" @tabClick="onTabClick"></moc-tabs>
		</view>
		<!-- <moc-list></moc-list> -->

		<swiper class="swiper" circular :indicator-dots="indicatorDots" :style="{ height: currentSwiperHeight + 'px' }"
			:duration="duration" :current="currentIndex" @change="swChange" @animationfinish="onSwiperEnd">
			<swiper-item v-for="(item, tabIndex) in tabData" :key="tabIndex">
				<view class="swiper-item">
					<view class="list-container">
						<uni-load-more status="loading" v-if="isLoading"></uni-load-more>
						<list-item :class="'list-item-'+tabIndex" v-else v-for="(item, ind) in listData[tabIndex]"
							:key="ind" :itemData="listData[tabIndex][ind]"></list-item>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<!-- <view class="list-container">
		   <uni-load-more status="loading" v-if="isLoading"></uni-load-more>
		   <list-item v-else v-for="(item, ind) in listData[currentIndex]" :key="ind" :itemData="listData[currentIndex][ind]"></list-item>		
		</view> -->
	</view>
</template>

<script>
	import {
		getHotTabs,
		getHotListFromTabType
	} from '../../api/hot.js';

	export default {
		data() {
			return {
				tabData: [],
				currentIndex: 0,
				isLoading: false,
				indicatorDots: false,
				duration: 500,
				currentSwiperHeight: 0, // 当前swiper的高度
				swiperHeightData: {}, //缓存高度的计算结果  以index为key 以对应的高度为value
				listData: {},
				currentScrollTop: 0 //当前页面的滚动距离
			};
		},
		created() {
			this.loadHotTabs();
		},
		/*监听页面滚动  页面的生命周期函数*/
		onPageScroll(res) {
		   this.currentScrollTop = res.scrollTop;
		},
		mounted() {

		},
		// updated() {
		// 	this.$on('tabClick',(val)=> {
		// 		console.log(val,'tab组件的传值')
		// 	})
		// },
		methods: {
			async loadHotTabs() {
				let {
					data: res
				} = await getHotTabs(); //把data的值赋给res
				console.log(res);
				this.tabData = res.list;
				this.loadListData();
			},
			onTabClick(id) {
				this.currentIndex = Number(id);
				// this.loadListData();
				// console.log(val,'tab向父级传值')
			},
			async loadListData() {
				//无数据时(请求数据已经放在动画结束后进行，这个判断其实可以删掉了)
				// if(!this.listData[this.currentIndex]) {
				this.isLoading = true;
				let id = this.currentIndex;
				const {
					data: res
				} = await getHotListFromTabType({
					type: id
				});
				// const {data: res} = await getHotListFromTabType();
				this.isLoading = false;
				this.listData[this.currentIndex] = res.list;
				//排序并设置新的属性raking
				let arr = this.listData[this.currentIndex];
				this.orderViews(this.listData[this.currentIndex]);
				//这里其实有个问题，无数据的时候才执行排序，有数据的时候不会实时变动(可以搞个下拉刷新)
				// for(let item of arr) {
				// 	console.log(item.views)
				// }
				for (let i = 0; i < arr.length; i++) {
					if (!arr[i].ranking) {
						arr[i].ranking = i + 1;
					}
				}
				// console.log(arr);
				//渲染完成后计算高度
				//this.$nextTick在小程序里不支持
				setTimeout(async () => {
					this.currentSwiperHeight = await this.getCurrentSwiperHeight(); //给swiper高度赋值
					this.swiperHeightData[this.currentIndex] = this.currentSwiperHeight; //缓存		
				}, 0)
				// }
				//有数据时(自动渲染了，啥都不用做)
			},
			//根据阅读数量由大到小进行排序
			orderViews(arr) {
				arr.sort(function(a, b) {
					return Number(b.views) - Number(a.views)
				})
			},
			//监听swiper左右滑动
			swChange(event) {
				//切换tab后 List的位置定位到最顶部
				if(this.currentScrollTop > 130) {
					uni.pageScrollTo({
						scrollTop: 130
					});
				}
				// console.log(event,'eve');
				let cur = event.detail.current;
				this.onTabClick(cur);
			},
			//获取当前的swiper的列表高度
			getCurrentSwiperHeight() {
				//1.拿到所有的item =>异步
				//缓存里面没有找到再去获取
				if (!this.swiperHeightData[this.currentIndex]) {
					let sum = 0; //累加器
					return new Promise((resolve, reject) => {
						const query = uni.createSelectorQuery().in(this);
						//注意这里用的是selectAll
						//在当前页面下选择匹配选择器 selector 的所有节点，返回一个 NodesRef 对象实例，可以用于获取节点信息。
						query.selectAll(`.list-item-${this.currentIndex}`).boundingClientRect(res => {
							//2.拿到所有item的高度
							//3.累加高度
							res.forEach((ele) => {
								sum += ele.height;
							})
							resolve(sum);
							// console.log(sum,'当前swiper高度')	
						}).exec();
					})
				}
			},
			//swiper动画结束进行的操作- 请求数据 渲染dom
			onSwiperEnd() {
				//判断缓存是否存在
				if (!this.listData[this.currentIndex]) {
					this.loadListData();
					return;
				}
				//未return  则证明存在数据缓存; 有缓存时，swiper高度已经存在
				this.currentSwiperHeight = this.swiperHeightData[this.currentIndex];
			},
			//跳转去热搜页
			toSearch() {
				// console.log('tz');
				uni.navigateTo({
					url: '../../subpkg/pages/search-blog/search-blog'
				});
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	@import '../../styles/global.scss';

	.logo {
		width: 100%;
		height: 180rpx;
	}

	.list-container {
		width: 100%;
		height: auto;
		margin: 0 0 4px;
		padding: 0;
		// box-shadow: 0 4rpx 0 4rpx #cbcbcb;
	}

	.swiper {

		// height: 300rpx;
		// min-height:90vh; //这里用百分比或者auto会导致sw不显示,已设置动态高度
		// height: 100%;
		.swiper-item {
			display: block;
			height: 600rpx;
			// line-height: 600rpx;
			text-align: center;
		}
	}

	.tab-sticky {
		position: sticky;
		top: 0;
		z-index: 99;
	}
</style>
