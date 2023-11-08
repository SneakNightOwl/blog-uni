<template>
	<view class="empty-data-con">
		<image class="img" src="../../static/images/empty-data.png" mode="aspectFit"></image>
		<text class="txt">无数据</text>
	</view>
</template>

<script>
	export default {
		name:"empty-data",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.empty-data-con {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 35%;
	.img {
		wdith: 64px;
		height: 64px;
	}
	.txt {
		margin-top: $uni-spacing-col-base;
		font-size: $uni-font-size-base;
		color: $uni-text-color-grey;
	}
}
</style>