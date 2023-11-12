<template>
	<view>
		
	</view>
</template>

<script>
	import { getArticleDetail } from '../../../api/article.js';
	export default {
		data() {
			return {
				author:'',
				articleId:'',
				articleData: null,
			};
		},
		//uniapp的生命周期
		onLoad(options) {
			//接收
			this.author = options.author;
			this.articleId = options.articleId;
			this.loadArticleDetail();
		},
		methods: {
			async loadArticleDetail() {
				//加载中动画 (交互反馈)
				uni.showLoading({
					title:'加载中',
					mask: false
				});
				const {data: res} = await getArticleDetail({
					author: this.author,
					articleId: this.articleId
				});
				this.articleData = res.data;
				console.log(res.data,'文章详情')
			}
		}
	}
</script>

<style lang="scss">

</style>
