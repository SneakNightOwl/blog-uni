<template>
	<view class="search-result-item-box">
		<!-- 加载富文本 -->
		<rich-text class="item-title line-clamp-2" :nodes="data.title"></rich-text>
		<rich-text class="item-des line-clamp-2" :nodes="data.description"></rich-text>
		<view class="item-bottom">
			<view class="item-author">{{data.author}}</view>
			<uni-icons type="compose" size="20" color="$uni-color-bottom"/>
			<view class="item-updatetime">{{data.created_at | relativeTime}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"search-result-item-theme-1",
		props: {
			data: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
   .search-result-item-box {
	   width: 100vw;
	   padding:$uni-spacing-col-base $uni-spacing-row-base;
	   box-sizing: border-box;
	   margin-bottom: $uni-spacing-col-big;
	   .item-title {
		   /* flex布局下 overflow:hidden会失效 */
		   width: 100%;
		   font-size: $uni-font-size-title;
		   color: $uni-color-title;
		   font-weight: bold;
	   }
	   .item-des {
		   width: 100%;
		   font-size: $uni-font-size-paragraph;
		   color: $uni-color-title;
		   margin-top: $uni-spacing-col-base;
	   }
	   .item-bottom {
		   display: flex;
		   font-size: $uni-font-size-paragraph;
		   color: $uni-color-bottom;
		   margin-top: $uni-spacing-col-base;
		   .item-author {
			   margin-right: $uni-spacing-row-lg;
		   }
	   }
   }
</style>