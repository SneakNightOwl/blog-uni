<template>
	<view class="comment-list-container">
		<!-- 精简评论 -->
		<view class="brevity-comment" v-if="!isShowAll">
			<view class="comment-title">精简评论</view>
			<block v-for="( item, index ) in commentList.slice(0,2)" :key="index">
				<article-comment-item :info="item.info"></article-comment-item>
			</block>
			<view class="show-more" @click="onMoreClick">查看更多评论</view>
		</view>
		<!-- 全部评论	 -->
		<view class="all-comment" v-else>
			<view class="comment-title">全部评论</view>
			<!--1. 通过mescroll-body 包裹列表 监听init、down、up事件 -->
			<mescroll-body 
				   ref="mescrollRef"
				   @init="mescrollInit"
				   @up="upCallback"
				   :down="{
					  use: false
				   }"
				   :up="{
					  textNoMore: '--- 我也是有底线的! ---'
				   }"
			   >
				<block v-for="( item, ind ) in commentList" :key="ind">
					<article-comment-item :info="item.info"></article-comment-item>
				</block>
			</mescroll-body>
		</view>
	</view>
</template>

<script>
	//2.导入对应的mixin
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import { getArticleCommentList } from '../../api/article.js';
	export default {
		name:"article-comment-list",
		//3.注册mixin
		mixins:[ MescrollMixin ],
		props: {
			// data: {
			// 	type: Array,
			// 	required: true
			// },
			articleId: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				page: 1,  //评论列表的页码
				pageSize: 10,  //每次请求的数据量
				commentList: []  ,//评论列表数据
				commentListTotal: 0,   //评论总数
				totalPage: 0, //评论总页数
				isShowAll: false,
				isInit: true,  //mescroll是否为第一次加载
				mescroll: null    //用于接收mescroll实例 注意大小写
			}
		},
		created() {
			// console.log(this.articleId,'articleID');
			this.loadArticleComment();
		},
		methods: {
			onMoreClick() {
				this.isShowAll = true;
			},
			async loadArticleComment() {
				const { data: res } = await getArticleCommentList({
					articleId: this.articleId,
					page: this.page,
					size: this.pageSize
				})
				this.commentListTotal = res.count;
				// this.totalPage = res.pageCount;
				if(this.page == 1) {
				  this.commentList = res.list;
				}else {
				  this.commentList = [...this.commentList, ...res.list];
				}
				
				// this.commentListTotal = res.count;
				console.log(res, '评论列表数据')
			},
			//4.实现两个回调方法
		    async mescrollInit() {
				await this.loadArticleComment();
				this.isInit = false;
		        //加载完成后隐藏加载动画
				this.getMeScroll().endSuccess(this.commentList.length, this.commentList.length < this.commentListTotal);
			},
			//上拉加载更多
			async upCallback() {
				console.log('上拉加载更多');
				// console.log(this.commentList.length, this.totalPage);
				console.log(this.commentList.length, this.commentListTotal);
				if(this.isInit) return;
				this.page += 1;
				await this.loadArticleComment();
				//加载完成后隐藏加载动画
				this.getMeScroll().endSuccess(this.commentList.length, this.commentList.length < this.commentListTotal);
			},
			//获取mescroll实例
			getMeScroll() {
				if(!this.mescroll) {
					this.mescroll = this.$refs.mescrollRef.mescroll;
				}
				return this.mescroll;
			},
			//添加commentList数据 (外部通过ref调用)
			addCommentItem(data) {
				this.commentList.unshift(data);
			}
		}
	}
</script>

<style lang="scss" scoped>
.comment-list-container {
	padding: $uni-spacing-col-lg $uni-spacing-row-base 120rpx;
	.comment-title {
		color: $uni-text-color;
		font-size: $uni-font-size-title;
		font-weight: bold;
	}
	.show-more {
		color: $uni-text-color-more;
		font-size: $uni-font-size-lg;
		text-align: center;
	}
}
</style>