<template>
	<view>
		<view class="hot-title">
			慕课热搜 所有技术 一网打尽
		</view>
		<block class="hot-list-container">
			<view class="hot-list-item" v-for="(item, index) in hotList" :key="index" @click="onClick(item)">
				<moc-raking :ranking = "index+1" ></moc-raking>
				<view class="item-label">{{item.label}}</view>
				<image class="hot-icon" src="../../static/images/hot-icon.png" v-if="index<=2"></image>
			</view>
		</block>
	</view>
</template>

<script>
	import { getSearchHOtList } from '../../api/search.js'
	export default {
		name:"search-hot-list",
		data() {
			return {
				hotList:[] //热搜列表数据
			};
		},
		created() {
			this.loadSearchHotList();
		},
		methods: {
			async loadSearchHotList() {
				const {data: res} = await getSearchHOtList();
				this.hotList = res.list;
				console.log(this.hotList,'热搜列表数据');
			},
			onClick(item) {
				this.$emit('onSearch',item.label);
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '../../styles/global.scss';
.hot-title {
	font-weight: bold;
	font-size: $uni-font-size-lg;
	color: $uni-text-color-hot;
	padding:12px $uni-spacing-col-lg;
	margin: 0 -12px $uni-spacing-col-lg -12px;
	box-shadow: 2px 2px 5px 1px rgba( 143, 143, 143, 0.1);
	// margin:5px -12px $uni-spacing-col-base -12px;
}
.hot-list-item {
	display:  flex;
	align-items: center;
	padding:$uni-spacing-col-lg 0;
	.item-label {
	   color:#333333;
	   font-size: $uni-font-size-base;
	   margin:0 $uni-spacing-col-base;
	}
}
.hot-icon {
	width:14px;
	height:14px;
	margin-left:10rpx;
}

</style>