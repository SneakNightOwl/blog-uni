<template>
	<view  class="wrap">
		<view>
			<my-search 
			 :isShowInput="true"
			 :placeHolderText="defaultPlaceHolder"
			 :config = "{backgroundColor: '#FFFFCC'}"
			 v-model="searchVal"
			 @onSearch= "onSearchConfirm"
			 @onCancel = "onSearchCancel"
			 @onClear = "onSearchClear"
			 @onFocus = "onSearchFocus"
			 @onBlur = "onSearchBlur"
			 ></my-search>
		</view>
		<!-- <view>{{msg}}</view> -->
		<view>
			<!-- 热搜列表 -->
			<view class="search-hot-list-box card" v-if="searchShow == '0' ">
				<search-hot-list @onSearch="onSearchConfirm"></search-hot-list>
			</view>
			<!-- 搜索历史 -->
			<view class="search-history-box" v-else-if="searchShow == '1' ">
				<search-history @searchHistoryItem = "onSearchConfirm"
				  ></search-history>
			</view>
			<!-- 搜索结果 -->
			<view class="search-result-list-box" v-else>
				<search-result-list></search-result-list>
			</view>
		</view>
	</view>
</template>

<script>
	const HOT_LIST = 0;
	const HISTORY = 1;
	const RESULT_LIST = 2;
	import { getSearchDefaultText } from '../../../api/search.js';
	import { mapMutations } from 'vuex';
	export default {
		data() {
			return {
				searchVal:'',
				defaultPlaceHolder:'程序员都喜欢用的搜索引擎',
				//默认情况下 || 点击输入框的取消按钮时，显示【热搜列表】
				//当searchBar获取焦点时 || 点击输入框清空按钮时，显示【搜索历史】
				// 用户点击热搜列表item || 用户点击搜索历史 item || 用户按下搜索键，显示【搜索结果】
				searchShow: 0,
				// searchData:[], //历史搜索数据
			}
		},
		computed: {
		},
		created() {
			this.loadDefaultText();
		},
		methods: {
			...mapMutations('search',['addSearchData']),
			//点击搜索
			onSearchConfirm(val){
				this.searchShow = RESULT_LIST;
				//没有输入直接点击搜索 查询placeholder的内容
				this.searchVal = val == '' ? this.defaultPlaceHolder: val ;
				// this.searchVal == val? val: this.defaultPlaceHolder;
				// this.saveSearchData();
				this.addSearchData(this.searchVal);
				console.log(this.searchVal,'搜索的值')
			},
			//取消 
			onSearchCancel(val){
				// console.log('取消 '+val)
				this.searchShow = HOT_LIST;
			},
			//清空
			onSearchClear(val){
				this.searchShow = HISTORY;
			},
			//获取焦点
			onSearchFocus(val){
                this.searchShow = HISTORY;
			},
			//失去焦点
			onSearchBlur(val){
				console.log('失去焦点 '+val)
			},
			// //保存搜索内容到搜索历史
			// saveSearchData() {
			// 	//搜索历史数据的基本业务逻辑：
			// 	//1.如果当前搜索内容已经存在，则原有搜索内容需要被展示到搜索历史的头部，而不是新增一条搜索内容
			// 	//2.如果当前搜索内容不存在，则新的搜索内容会被展示到搜索历史的头部
			// 	let aindex = this.searchData.findIndex(item=> item == this.searchVal);
			// 	if(aindex > -1) {
			// 		this.searchData.splice(aindex, 1);
			// 	}
			// 	this.searchData.unshift(this.searchVal);
			// },
			// //删除全部搜索历史
			// onRemoveAllsearchData() {
			// 	this.searchData = [];
			// },
			// //删除单个搜素历史
			// onRemoveSearchItem(index) {
			// 	this.searchData.splice(index,1);
			// },
			async loadDefaultText() {
				let {data:res} = await getSearchDefaultText();
				this.defaultPlaceHolder = res.defaultText;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/styles/global.scss';
    /*在源码中解决了一个placeholder点击取消时的抖动问题 具体去看uni-search-bar的源码*/
	/*加了个margin-bottom: 1px;*/
</style>
