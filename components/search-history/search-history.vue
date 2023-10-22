<template>
	<view class="search-history-container">
		<view class="history-title-box">
			<view class="history-title">搜索历史</view>
			<view v-if="!isClearShow">
			 <uni-icons type="trash" size="24" color="#999999" @click="isClearShow=true"/>
			<!-- <image class="del-img" src="../../static/images/delete.png" v-if="!isClearShow" mode="" @click="isClearShow=true"></image> -->
			</view>
			<view class="clear-box" v-else>
				<text class="txt" @click="removeAllsearchData">全部删除</text>
				<text class="txt" @click="isClearShow=false">完成</text>
			</view>
		</view>
		
	     <!-- 搜索历史-内容 -->
		<view class="history-wrap"> 
			<block  v-for="(item, index) in searchData" :key="index" >
				<view class="item-con" @click="clickHistorySearchData(item,index)">
					   <text class="item-label  line-clamp">
						  {{item}}
					   </text>
					   <uni-icons type="clear" size="24" color="#999999" v-show="isClearShow"/>
				     <!-- <icon type="clear" size="24" v-show="isClearShow" /> -->
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		name:"search-history",
		props: {
			searchData: {
				type: Array,
				require: true
			}
		},
		data() {
			return {
				// searchData:['2023面试题整理', '程序员离职小技巧','source map', 'uniapp','vue-element-admin','前端','CTO写低级Bug'],
				isClearShow: false
			};
		},
		methods: {
			//删除全部
			removeAllsearchData() {
				let _self = this;
				uni.showModal({
					title:'提示',
					content:'确认删除所有搜索历史？',
					success: function({confirm, cancel}) {
						if(confirm) {
							_self.$emit('removeAllsearchData');
							_self.isClearShow = false;
						}
					}
				})
			},
			//点击某一项
			clickHistorySearchData(item, index) {
				//1.删除状态下
				if(this.isClearShow) {
					this.$emit('removeSearchItem',index)
				}else {
				  //2.非删除状态下搜索选中项
					this.$emit('searchHistoryItem', item)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>

.search-history-container {
	.history-title-box {
		display: flex;
		// flex-direction: row;
		justify-content: space-between;
		padding: $uni-spacing-row-base $uni-spacing-row-base;
		.history-title {
			color: $uni-text-color;
			font-size: $uni-font-size-lg;
		}
		.del-img {
			width:$uni-font-size-lg;
			height: $uni-font-size-lg;
		}
		.clear-box {
			.txt {
				// display: inline-block;
				color: $uni-text-color-grey;
				font-size: $uni-font-size-base;
				padding: 0 $uni-spacing-row-sm;
			}
		}
	}
	
	.history-wrap { 
		display: flex;
			// flex-direction: row;
			justify-content: space-between;
			flex-wrap: wrap;
			padding: 0 $uni-spacing-row-lg;
		 .item-con {
		 	width: 50%;
		 	display: inline-block;
			box-sizing: border-box;
			padding:$uni-spacing-col-base $uni-spacing-row-base;
		 // 	display: flex;
		 // 	flex-direction: row;
		 // 	justify-content: between;
			// align-items: center;
			position: relative;
		 	.item-label {
		 		width:85%;
				display: inline-block;
		 		font-size: $uni-font-size-base;
		 		color: $uni-text-color;
		 		// padding:$uni-spacing-col-lg $uni-spacing-row-sm;
				
		 	}
		 	&:nth-of-type(odd):after {
		 		content: ' ';
		 		width: 1px;
		 		height: 14px;
				border-left:1px solid $uni-text-color-grey;
		 		// background-color: $uni-text-color-grey;
				position: absolute;
				top:50%;
				right: 0;
				transform: translateY(-50%);
		 	}
		 }
	}
	
}

</style>