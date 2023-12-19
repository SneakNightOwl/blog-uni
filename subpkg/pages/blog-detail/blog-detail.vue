<template>
	<!-- 使用page-meta时必须要作为第一个节点 -->
	<!-- 仅在非H5端使用，主要用于小程序 -->
	<!-- #ifndef H5 -->
	<page-meta root-font-size="52px">
	<!-- #endif -->
	  <view class="article-container">
	  	<block v-if="articleData">
	  		<view class="title">{{articleData.articleTitle}}</view>
	  		<view class="detail">
	  			<view class="detail-left">
	  				<view class="author-box">
	  					<image class="avatar" :src="articleData.avatar" mode=""></image>
	  				</view>
	  				<view class="author-box">
	  					<view class="author">{{articleData.nickName}}</view>
	  					<view class="release-time">{{articleData.date}}</view>
	  				</view>
	  			</view>
	  			<view class="detail-right">
	  				<button :type="articleData.isFollow ? 'primary':'default' " 
					         size="mini" 
							 :loading="isfollowLoading"
							 @click="onClickFollow">{{ articleData.isFollow ? '已关注':'关注' }}</button>
					<!-- <button type="primary" size="mini" @click="cancleCollect">已关注</button> -->
	  			</view>
	  		</view>
	  		<!-- <rich-text :nodes="articleData.content"></rich-text> -->
	  		<!-- 3.使用mp-html  scroll-table 给每个表格添加一个滚动层使其能单独横向滚动-->
	  		<mp-html 
			v-if="articleData.content"
	  		class="markdown_views"
	  		:content="addClassFromHtml(articleData.content)"
	  		scroll-table>
	  		</mp-html>
			<!-- 评论区 -->
			<view class="comment-list-box">
				   <!-- 评论列表 组件 -->
				   <!--1. 给mescroll-body的组件添加 ref="mescrollItem" (固定的，不能改，与mescroll-comp.js对应) -->
				  <article-comment-list v-if="articleData.content" :articleId="articleId" ref="mescrollItem"></article-comment-list>
			</view>
	  	</block>
	  </view>
	  <!-- 组件 底部功能区-->
	  <article-operate 
	         @onCommitClick="onCommitClick"
			 @onPraiseClick="onPraiseClick"
			 @onCollectClick="onCollectClick"
			 :articleData = "articleData"
			 ></article-operate>
	  <!-- 组件 评论文本域 -->
	  <uni-popup ref="popup" type="bottom" @change="popupChange">
		  <article-comment-commit  v-if="isCommitShow" @onSendCommit="onSendCommit"></article-comment-commit>
	  </uni-popup>
	 <!-- #ifndef H5 -->
	 </page-meta>
	 <!-- #endif -->
</template>

<script>
	//1.引入mp-html
	import mpHtml from '@/uni_modules/mp-html/components/mp-html/mp-html';
	//引入mescroll-comp.js
	import MescrollCompMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js'
	import { getArticleDetail, getArticleCommentList, fllowUser, sendComment, userPraise, userCollect } from '../../../api/article.js';
	import { mapActions } from 'vuex';
	export default {
		//2.注册mp-html
		components: {
			mpHtml
		},
		//注册mixins
		mixins:[MescrollCompMixin],
		data() {
			return {
				author:'',
				articleId:'',
				articleData: {},
				page: 1,  //评论列表的页码
				size: 5,  //每次请求的数据量
				commentList: null  ,//评论列表数据
				commentAllCount: 0,   //评论总数
				isfollowLoading: false,
				isCommitShow: true, // 是否显示评论区的文本域
			};
		},
		//uniapp的生命周期
		onLoad(options) {
			//接收
			this.author = options.author;
			this.articleId = options.articleId;
			this.loadArticleDetail();
			// this.loadArticleComment();
		},
		methods: {
			...mapActions('user', ['isLogin'] ),
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
			},
			//正则替换
			addClassFromHtml(info) {
				return info.replace(/<p>/gi, '<p class="p-cls">')
				.replace(/<a>/gi, '<a class="a-cls">')
				.replace(/<h1>/gi, '<h1 class="h1-cls">')
				.replace(/<h2>/gi, '<h2 class="h2-cls">')
				.replace(/<h3>/gi, '<h3 class="h3-cls">')
				.replace(/<h4>/gi, '<h4 class="h4-cls">')
				.replace(/<h5>/gi, '<h5 class="h5-cls">')
				.replace(/<h6>/gi, '<h6 class="h6-cls">')
				.replace(/<ul>/gi, '<ul class="ul-cls">')
				.replace(/<li>/gi, '<li class="li-cls">')
				.replace(/<ol>/gi, '<ol class="ol-cls">')
				.replace(/<td>/gi, '<td class="td-cls">')
				.replace(/<th>/gi, '<th class="th-cls">')
				.replace(/<tr>/gi, '<tr class="tr-cls">')
				.replace(/<dl>/gi, '<dl class="dl-cls">')
				.replace(/<dd>/gi, '<dd class="dd-cls">')
				.replace(/<hr>/gi, '<hr class="hr-cls">')
				.replace(/<pre>/gi, '<pre class="pre-cls">')
				.replace(/<strong>/gi, '<strong class="strong-cls">')
				.replace(/<input>/gi, '<input class="input-cls">')
				.replace(/<table>/gi, '<table class="table-cls">')
				.replace(/<details>/gi, '<details class="details-cls">')
				.replace(/<code>/gi, '<code class="code-cls">')
				.replace(/<kbd>/gi, '<kbd class="kbd-cls">')
				.replace(/<summary>/gi, '<summary class="summary-cls">')
				.replace(/<blockquote>/gi, '<blockquote class="blockquote-cls">')
				.replace(/<img/gi, '<img class="img-cls"');
			},
			//点击关注
			async onClickFollow() {
				const isLogin = await this.isLogin();
				// console.log(isLogin,'isLogin');
				//如果没有使用await,这里打印出来的会是一个pending的promise
				if(!isLogin) {
					return;  //用户未登录
				}
				this.isfollowLoading = true;
				const { data: res } = await fllowUser({
					author: this.articleData.username,
					isFollow: !this.articleData.isFollow
				});
				this.articleData.isFollow = !this.articleData.isFollow;
				this.isfollowLoading = false;
			},
			//唤醒输入框
			onCommitClick() {
				this.$refs.popup.open();
			},
			//点击蒙层时 利用v-if 清空输入框
			popupChange(e) {
			  // console.log(e,'点');
			  if(e.show) {
				  this.isCommitShow = e.show;  
			  }else {
				  //解决文本域向下隐藏时动画消失的bug
				  setTimeout(()=> {
				    this.isCommitShow = e.show;  
				  },200)
			  }
			},
			//发送评论
			async onSendCommit(val) {
				const { data: res } = await sendComment({
					articleId: this.articleId,
					content: val
				})
				// console.log(res,'res');
				if(res.info.commentId) {
					this.$refs.popup.close();
					uni.showToast({
						title:'发送成功',
						icon:'success'
					})
					//传递评论数据对象给commentList 回显评论
					this.$refs.mescrollItem.addCommentItem(res);
				}else {
					uni.showToast({
						title:'发送失败',
						icon: 'fail'
					})
				}
			},
			//点赞
			 async onPraiseClick() {
				// console.log('点击  点赞');
				const islogin = await this.isLogin();
				//登录后才可以点赞
				if(!islogin) {
					return;
				}else {
					uni.showLoading({
						title:'加载中'
					})
					const res = await userPraise({
						articleId: this.articleId,
						isPraise: !this.articleData.isPraise
					})
					console.log(res,'点赞');
					if(res.success) {
					  this.articleData.isPraise = !this.articleData.isPraise;
					}
					uni.hideLoading();//强制关闭loading
				}
			},
			//收藏
			async onCollectClick() {
				const islogin = await this.isLogin();
				//登录后才可以收藏
				if(!islogin) {
					return;
				}else {
					uni.showLoading({
						title:'加载中'
					})
					const res = await userCollect({
						articleId: this.articleId,
						isCollect: !this.articleData.isCollect
					})
					// console.log(res,'收藏');
					if(res.success) {
					  this.articleData.isCollect = !this.articleData.isCollect;	
					}
					uni.hideLoading();//强制关闭loading
				}
			}
		}
	}
</script>

<style lang="scss">
	
 @import '../../../styles/global.scss';	
 // @import '~@/styles/article-detail.css';
	
.article-container {
	padding:$uni-spacing-col-base $uni-spacing-row-base;
	.title {
		font-size: $uni-font-size-title;
		color: $uni-text-color;
		font-weight: bold;
	}
	.detail {
		display: flex;
		justify-content: space-between;
		padding: $uni-spacing-col-base 0;
		.detail-left {
			display: flex;
			align-items: center;
		}
		.author-box {
			display: flex;
			flex-direction: column;
			.author {
				font-size: $uni-font-size-base;
				color: $uni-text-color;
				font-weight: bold;
			}
			.release-time {
				font-size: $uni-font-size-sm;
				color: $uni-text-color-grey;
			}
		}
	}
}
</style>
