<template>
	<!-- <view class="list-container"> -->
		<view class="list-item" @click="$emit('click')">
			<view class="list-item-left">
				<moc-raking :ranking="listItem.ranking"></moc-raking>
			</view>
			<view class="list-item-right">
				<view class="title line-clamp-2">{{listItem.title}}</view>
				<view class="des line-clamp-2" v-text="listItem.desc"></view>
				<view class="bottom-con">
					<view class="bottom-left">{{listItem.nickname}}</view>
					<view class="bottom-right">
						<image class="hot-icon" src="./../../static/images/hot-icon.png" v-show="listItem.views>0 && listItem.views!=undefined"></image>
						<view :class="listItem.ranking<=3 ? 'views-num more-hot':'views-num' ">{{listItem.views | hotNumber}}</view>
					</view>
				</view>
			</view>
		</view>
	<!-- </view> -->
</template>

<script>
	export default {
		name:"list-item",
		props:{
			itemData: {
				type: Object,
				default: ()=> {
					return {}
				}
			}
		},
		data() {
			return {
				listItem:'',
			};
		},
		watch: {
			itemData: {
				handler:function(obj){
					let item = {...this.itemData, ...obj}; //同名属性新的覆盖旧的
					this.listItem = item;
				},
				immediate: true
			}
		}
	}
</script>

<style lang="scss" scoped>
// .list-container {
//    width: 100%;
//    height: auto;
//    margin: 0 0 4px;
//    padding: 0;
//    box-shadow: 0 4rpx 0 4rpx #cbcbcb;
// }
.list-item {
	width: 96%;
	height: auto;
	// height: 100%;
	display: flex;
	flex-direction: row;
	// margin: 20rpx auto 0;
	margin: 0 auto;   //在计算高度时chrome和红米K50不会把margin纳入计算范围
	padding: 10rpx 0 10rpx;
	border-bottom-left-radius: 12rpx;
	border-bottom-right-radius: 12rpx;
	// border-bottom: 1px solid rgba(209, 209, 209, 1);
	box-shadow: 5rpx 10rpx 5rpx 5rpx rgba(209, 209, 209, 0.3);
	.list-item-left {
		width: 80rpx;
		height: 100%;
	}
	.list-item-right {
		flex: 1;
		padding: 20rpx 6rpx 10rpx 0;
		height: auto;
		.title {
			width: 90%;
			max-height: 80rpx;
			font: bold 36rpx/40rpx 'Microsoft YaHei'; 
			color: #333;
			/*超出两行显示省略号 要设置width 已移动到公共样式*/
			// overflow: hidden;
			// text-overflow: ellipsis;
			// display: -webkit-box;
			// -webkit-box-orient: vertical;
			// -webkit-line-clamp: 2;
		}
		.des {
			// width: 95%;
			width: 640rpx!important;
			max-height: 120rpx;  /*大约3行*/
			font: normal 30rpx/40rpx 'Microsoft YaHei'; 
			color: #626262;
			margin-top: 10rpx;
			/*拆分过长的单词*/
			word-wrap:break-word;
			// white-space: break-spaces;
			/*超出3行显示省略号*/
			// overflow: hidden;
			// text-overflow: ellipsis;
			// display: -webkit-box;
			// -webkit-box-orient: vertical;
			// -webkit-line-clamp: 3;
		}
	}
	
	.bottom-con {
		display: flex;
		height: 40rpx;
		margin-top: 10rpx;
		// padding: 10rpx 6rpx 0 0;
		flex-direction: row;
		// justify-content: space-between;
		.bottom-left,.bottom-right {
			width:50%;
			color: #bababa;
			text-align: left;
		}
		.bottom-right {
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			padding: 0 26rpx 0 0;
		    line-height: 40rpx;;
		}
		.hot-icon {
			width:36rpx;
			height: 36rpx;
			// vertical-align: middle;
		}
		.more-hot {
			color: #ff0000;
		}
	}
}
</style>