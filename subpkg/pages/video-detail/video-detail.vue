<template>
	<view class="video-detail-container">
		<view class="video-box">
		  <video 
		     id="myVideo"
		     :src="videoData.play_url"  
			 danmu-btn  
			 controls 
			 :danmu-list="danmuList"
			 ></video>	
		</view>
		<view class="video-info-wrap">
			<hot-video-info :data="videoData"></hot-video-info>
		</view>
		<!--下方的 弹幕列表 -->
		<view class="danmu-wrap">
			<view class="danmu-tit">弹幕列表</view>
			<block v-for="(item, index) in commentList" :key="index">
				<article-comment-item :info="item"></article-comment-item>
			</block>
		</view>
		<!-- 底部功能区 -->
		<article-operate @onCommitClick="onCommitClick"></article-operate>
		<!--底部 弹出层 -->
		<uni-popup ref="popup" type="bottom" @change="danmuPopupChange">
			<article-comment-commit  v-if="isCommitShow" @onSendCommit="onSendCommit"></article-comment-commit>
		</uni-popup>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { getVideoDanmuList } from '../../../api/hotVideo.js';
	import { sendComment } from '../../../api/article.js';
	export default {
		data() {
			return {
				danmuList:[],   //弹幕数据源
				commentList: [], //评论数据源
				isCommitShow: true, // 是否显示评论区的文本域
				//danmuValue: '',  //需要渲染的弹幕内容
				videoContext: null
			};
		},
		created() {
			this.loadDanmuList();
		},
		onReady(res) {  
			 this.videoContext = uni.createVideoContext('myVideo')
		},
		computed: {
			//映射video模块的数据到组件中
			...mapState('video', ['videoData'])
		},
		methods: {
		 async loadDanmuList() {
				// console.log(this.videoData, 'mapState');
				const { data: res } = await getVideoDanmuList({
					videoId: this.videoData.id
				});
				this.danmuList = [...res.list];  //深拷贝防止数据污染
				this.commentList = [...res.list];
				console.log(res.list, '弹幕列表');
				// console.log(this.videoData,'videoData');
			},
			//触发弹出层
			onCommitClick() {
				this.$refs.popup.open();
			},
			//点击蒙层时 利用v-if 清空输入框
			danmuPopupChange(e) {
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
			//发送弹幕-调接口(页面底部的)
			async onSendCommit(val) {
				const res = await sendComment({
					articleId: this.videoData.id,
					content: val
				})
				console.log(res,'res');
				if(res.success) {
					//回显弹幕
					this.sendDanmuEnd(res.data);
					uni.showToast({
						title:'发表成功',
						icon:'success'
					})
					// console.log(res,'弹幕回显')
				}else {
					uni.showToast({
						title:'发送失败',
						icon: 'fail'
					})
				}
			},
			//在视频中回显弹幕 以及后续处理
			sendDanmuEnd(data) {
				this.videoContext.sendDanmu({
					text: data.info.content,
					color: '#33ff33'
				});
				//添加弹幕到数据源
				this.commentList.unshift(data.info);
				//不要去改danmuList，这会导致自己发的弹幕在视频中不显示
				// this.danmuList.unshift(res.data.info);
				//关闭popup
				this.$refs.popup.close();
				//关闭标记
				this.isCommitShow = false;
				// this.danmuValue = '';
			}
		}
	}
</script>

<style lang="scss" scoped>
.video-detail-container {
	position:relative;
	margin-bottom: $uni-spacing-col-lg;
	.video-box {
		video {
			width: 100%;
			height:250px;
		};
	}
	// .video-info-wrap {
	// 	box-shadow: 0 0 1px 0 #bababa;
	// }
	.danmu-wrap {
		padding:$uni-spacing-col-base $uni-spacing-row-base;
		margin-top: $uni-spacing-col-base;
		box-shadow: 0 -1px 2px 0 #bababa;
		
		.danmu-tit {
			font-size: $uni-font-size-title;
			color: $uni-text-color;
		}
	}
}
</style>
