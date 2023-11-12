<template>
	<!-- 三个组件，应对三种展示情况 -->
	<!--  `search-result-item-theme-1`: 无图片样式
		  `search-result-item-theme-2`: 一张图片样式
			`search-result-item-theme-3`: 三张图片样式 -->
	<view>
		<empty-data v-if="isEmpty"></empty-data>
		<!--1. 通过mescroll-body 包裹列表 监听init、down、up事件 -->
		<mescroll-body 
		    ref="mescrollRef" 
			@init="mescrollInit" 
			@down="downCallback" 
			@up="upCallback"
			v-else>
			<view v-for="(item, index) in resultList" :key="index" @click="onItemClick(item)">
			  <search-result-item-theme-1 :data="item" v-if="item.pic.length==0 && item.pic_list.length == undefined"></search-result-item-theme-1>	
			  <search-result-item-theme-2 :data="item" v-else-if="item.pic.length!=0 || item.pic_list.length == 1"></search-result-item-theme-2>	
			  <search-result-item-theme-3 :data="item" v-else></search-result-item-theme-3>	
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import { getSearchResult } from '../../api/search.js'
	//2.导入对应的mixin
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		name:"search-result-list",
		//3.注册mixin
		mixins: [MescrollMixin],
		props: {
			queryStr: {
				type: String,
				required: true,
			}
		},
		data() {
			return {
				resultList:[],
				page: 1,
				//是否初次加载
				isInit: true,
				//注意，我们这个mescroll其实是覆盖了mixin里面定义的mescroll，所以这个字段名是固定的，否则
				//下拉刷新或者上拉加载更多就会出错导致不生效。mescrollInit  downCallback  upCallback这三个
				//函数名也是覆盖了mixin里面的函数
				mescroll: null, //mescroll实例
				isEmpty: false  //是否空数据
			};
		},
		created() {
			// this.getResultList();
		},
		mounted() {
			//接收mescroll实例   !!!!! 这个必须写在mounted里面，否则在down和up的回调里会报错
			this.mescroll = this.$refs.mescrollRef.mescroll;
		},
		methods: {
			async getResultList() {
				const {data:res} = await getSearchResult({
					q: this.queryStr  ,//搜索内容
					p: this.page   //页码
				})
				res.list.forEach(item=> {
					item.title = item.title.replace(/<em>/g,"<em style='color: #f94d2a; margin: 0 2px'>");
					item.description = item.description.replace(/<em>/g,"<em style='color: #f94d2a; margin: 0 2px'>");
					return item;
				})
				//上拉加载更多 要对数据做处理
				if(this.page == 1) {
				  this.resultList = res.list;	
				}else {
				  this.resultList = [...this.resultList, ...res.list]
				}
				// this.resultList = [];
				//判断空数据
				if(this.resultList.length === 0) {
					this.isEmpty = true;
				}else {
					this.isEmpty = false;
				}
				console.log(this.resultList,'搜索结果');
			},
			//4.实现三个回调方法
			//为了确保三个函数有序执行，我们使用了async和await
			async mescrollInit() {
				console.log('首次加载');
				await this.getResultList();
				this.isInit = false;
				//关闭加载的动画
				this.mescroll.endSuccess();
			},
			async downCallback() {
		        if(this.isInit) return;
				console.log('下拉刷新');
				this.page = 1;
				await this.getResultList();
				//关闭加载的动画
				this.mescroll.endSuccess();
			},
			async upCallback() {
				console.log('isInit',this.isInit);//这个打印出来居然是true
				if(this.isInit) return;
				console.log('上拉加载更多');
				this.page+=1;
				await this.getResultList();
				//关闭加载的动画
				this.mescroll.endSuccess();
			},
			//点击item跳转到文章详情
			onItemClick(item) {
			  // console.log(item,'clickitem');
			  uni.navigateTo({
			  	url:`/subpkg/pages/blog-detail/blog-detail?author=${item.author}&articleId=${item.id}`
			  })
			}
		}
	}
</script>

<style lang="scss">

</style>