<template>
	<!-- 1.具备输入框的样式
	2.不可输入
	3.placeHolderText内容可以在父组件定义
	4.输入框的样式也可以在父组件定义 -->
	<view class="my-search-container">
		<!-- 搜索框 -->
		<uni-search-bar 
		     class="my-search-bar"
		     v-if="isShowInput" 
		     radius="20" 
			 :placeholder="placeHolderText" 
			 :bgColor="config.backgroundColor"
			 :value = "value"
			 @confirm="onSearch"
			 @input="onInput"
			 @cancel="onCancel"
			 @clear="onClear"
			 @focus="onFocus"
			 @blur="onBlur"
			 >
			 <uni-icons slot="clearIcon" type="clear" color="#999999" />
	     </uni-search-bar>	 
		<!-- 搜索按钮 -->
		<view class="my-input-wp"
		      v-else
			  :style="{
				  height: config.height,
				  lineHeight: config.lineHeight,
				  backgroundColor:config.backgroundColor,
				  color:config.textColor,
				  border:config.border
			  }"
			  >
			<image class="my-search-icon" :src="config.icon"></image>
			<text class="place-holder">{{placeHolderText}}</text>
		</view>
	</view>

</template>

<script>
	export default {
		name: "moc-search",
		props: {
			//uni-search-bar不能使用v-model，因为不能在子组件里去直接修改父组件的值
			value: {
				type: String
			},
			placeHolderText: {
				type: String,
				default: '搜索'
			},
			isShowInput: {
				type: Boolean,
				default: false
			},
			//配置对象
			config: {
				type: Object,
				default: ()=>({
					icon:'/static/images/search.png',
					height: 96 + 'rpx',
					lineHeight: 96+'rpx',
					backgroundColor:'#ffffff',
					textColor:'#454545',
					border:"1px solid #c9c9c9"
				})
			}
		},
		data() {
			return {

			};
		},
		methods: {
			onSearch(e) {
				this.$emit('onSearch', e.value);
			},
			onInput(val) {
				//v-model是vue种完成双向数据绑定的指令，如果想要应用到组件的绑定中，
				//那么需要遵守以下规则：
				//1.子组件中接收到的值 必须以value命名
				//2.子组件中想要修改value时，必须要发送一个叫做input的事件
				this.$emit('input', val);
			},
			onCancel(e) {	
				this.$emit('onCancel', e.value);
			},
			onClear(e) {	
				this.$emit('onClear', e.value);
			},
			onFocus(e) {
				this.$emit('onFocus', e.value);
			},
			onBlur(e) {
				this.$emit('onBlur', e.value);
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container {
		display: flex;
		width: 100%;
		.my-input-wp {
			display: flex;
			align-items: center;
			flex-direction: row;
			justify-content: flex-start;
			width: 95%;
			// height: 40rpx;
			height:96rpx;
			padding: $uni-spacing-base;
			// margin: 0 $uni-spacing-base;
			margin: 0 auto;
			border: 1px solid #cbcbcb;
			border-radius: $uni-radius-base;
			box-sizing: border-box;
		}
		
		.my-search-icon {
			width: 40rpx;
			height: 40rpx;
			// background: url('@/static/images/search.png') no-repeat;
			// background-size: 100% 100%;
		}
		
		.place-holder {
			font: normal 32rpx/40rpx 'Microsoft YaHei';
			color: #cbcbcb;
		}
		.my-search-bar {
			width: 100%;
		}
		//以下修改无效，只能去组件中改源码
		// .my-search-container .uni-searchbar__box {
		// 	//搜索框的placeholder从最左边显示（默认是中间）
		// 	justify-content: start!important;
		// }
	}
	
</style>
