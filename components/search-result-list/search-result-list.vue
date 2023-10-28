<template>
	<!-- 三个组件，应对三种展示情况 -->
	<!-- 1. `search-result-item-theme-1`: 无图片样式
			2. `search-result-item-theme-2`: 一张图片样式
			3. `search-result-item-theme-3`: 三张图片样式 -->
	<view>
		<block v-for="(item, index) in resultList" :key="index">
		  <search-result-item-theme-1 :data="item" v-if="item.pic.length==0 && item.pic_list.length == undefined"></search-result-item-theme-1>	
		  <search-result-item-theme-2 :data="item" v-else-if="item.pic.length!=0 || item.pic_list.length == 1"></search-result-item-theme-2>	
		  <search-result-item-theme-3 :data="item" v-else></search-result-item-theme-3>	
		</block>
	</view>
</template>

<script>
	import { getSearchResult } from '../../api/search.js'
	export default {
		name:"search-result-list",
		props: {
			queryStr: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				resultList:[],
				page: 1
			};
		},
		created() {
			this.getResultList();
		},
		methods: {
			async getResultList() {
				const {data:res} = await getSearchResult({
					q: this.queryStr  ,//搜索内容
					p: this.page   //页码
				})
				this.resultList = res.list;
				console.log(this.resultList,'搜索结果');
			}
		}
	}
</script>

<style lang="scss">

</style>