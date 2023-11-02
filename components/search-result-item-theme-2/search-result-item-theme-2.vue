<template>
	<!-- 需要解决的问题：des会超过两行 溢出隐藏没有完全生效 -->
	<view class="search-result-item-box">
		<!-- 加载富文本 -->
		<rich-text class="item-title line-clamp-2" :nodes="data.title"></rich-text>
		<view class="item-des-box">
		  <rich-text class="item-des line-clamp-2" :nodes="data.description"></rich-text>
		   <image class="item-img" :src="data.pic" mode="aspectFit" v-if="data.pic_list.length==undefined && data.pic!==''"></image>
		   <!-- 有些人写富文本图片列表只放一张图片 -->
		   <image class="item-img" :src="data.pic_list[0]" mode="aspectFit" v-else></image>
		</view>
		<view class="item-bottom">
			<view class="item-author">{{data.author}}</view>
			<uni-icons type="compose" size="20" color="$uni-color-bottom"/>
			<view class="item-updatetime">{{data.created_at | relativeTime}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"search-result-item-theme-2",
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
	   .item-des-box {
		   display: flex;
		   width: 100%;
		   margin-top: $uni-spacing-col-base;
		   .item-des {
			   width: 60%;
			   // height: 70px;
			   // line-height: 20px;
			   font-size: $uni-font-size-paragraph;
			   color: $uni-color-title;
			   
		   }
		   .item-img {
			   width: 40%;
			   height:70px;
		   }
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