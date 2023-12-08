<template>
	<view class="hot-video-container">
		<!-- 使用mescroll-body 包裹列表 -->
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<block v-for="(item , index) in hotVideoList" :key="index">
				<hot-video-item :data="item"></hot-video-item>
			</block>
		</mescroll-body>
	</view>
</template>

<script>
	// 引入MescrollMixin
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins";
	import { getHotVideoList } from '../../api/hotVideo.js'
	export default {
		//注册mixin
		mixins:[ MescrollMixin ],
		data() {
			return {
				page: 1,
				size: 10,
				isInit: true,  //是否为初次加载mescroll
				hotVideoList:[],
				mescroll: null, //mescroll实例
			};
		},
		created() {
			// this.loadHotVideoList();
		},
		mounted() {
		  this.mescroll = this.$refs.mescrollRef.mescroll;	
		},
		methods: {
			 async loadHotVideoList() {
				const { data: res } = await getHotVideoList({
					page: this.page,
					size: this.size
				});
				if(this.page === 1) {
					this.hotVideoList = res.list;
				}else {
					this.hotVideoList = [...this.hotVideoList, ...res.list];
				}
				console.log(res,'热播列表')
			},
			//初始化
			async mescrollInit() {
				this.page = 1;
				await this.loadHotVideoList();
				this.isInit = false;
				//关闭加载动画
				this.mescroll.endSuccess();
			},
			//下拉刷新
			async downCallback() {
				if(this.isInit) return;
				console.log('下拉刷新');
				this.page = 1;
				await this.loadHotVideoList();
				//关闭加载动画
				this.mescroll.endSuccess();
			},
			//上拉加载更多（这里有个小bug 初始化的时候仍然执行了这个方法）
			//反复测试后发现没有bug 是编辑器对这一段代码没有重新编译造成的
			async upCallback() {
				if(this.isInit) return;
				console.log('上拉加载更多',this.isInit);
				this.page += 1;
				await this.loadHotVideoList();
				//关闭加载动画
				this.mescroll.endSuccess();
			}
		}
	}
</script>

<style lang="scss">

</style>
