<template>
	<view class="raking-con">
		<image :class=" Number(ranking)<= 3 ? 'ranking-bk':'ranking-low' " :src="getRankingbg"></image>
		<view :class="Number(ranking)<= 3 ? 'ranking-num hot-raking': 'num-low' ">{{ranking}}</view>
	</view>
</template>

<script>
	export default {
		name:"moc-raking",
		props: {
			ranking: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				srcUrl:''
			};
		},
		computed: {
		  //计算属性必须要有一个返回值
		  getRankingbg() {
			  if(this.ranking <= 3) {
				  return `../../static/images/ranking-${this.ranking}.png`
			  }else {
				  return `../../static/images/ranking-other.png`
			  }
		  }
		}
	}
</script>

<style lang="scss" scoped>
 // .raking-con {
	//  width:80rpx;
	//  height: 80rpx;
	//  position:relative;
	//  margin-top: 20rpx;
	//     /*排名高的*/
 //       .ranking-bk {
	// 	  display: block;
	// 	  width:68rpx;
	// 	  height: 68rpx;
	// 	  margin: 0 auto;
	//    }
	//    /*排名第三的*/
	//    .ranking-low {
	// 	   display: block;
	// 	   width:43rpx;
	// 	   height: 43rpx;
	// 	   margin: 0 auto;
	//    }
	//    /*低排名 不显示*/
	//    .ranking-hide {
	// 	   visibility: hidden;
	// 	   width:43rpx;
	// 	   height: 43rpx;
	// 	   margin: 0 auto;
	//    }
	//    .ranking-num {
	// 	   width:68rpx;
	// 	   height: 68rpx;
	// 	   position: absolute;
	// 	   top: 0;
	// 	   left: 0;
	// 	   right: 0;
	// 	   bottom: 0;
	// 	   margin: auto;
	// 	   text-align: center;
	// 	   padding:16rpx 0 0 0;
	// 	   // line-height: 68rpx;
	//    }
	//    .hot-raking {
	// 	   color: #ffffff;
	// 	   font-size: 32rpx;
	//    }
	//    /*低排名 字体改小*/
	//    .num-low {
	// 	   width:50rpx;
	// 	   height: 50rpx;
	// 	   position: absolute;
	// 	   top: -20rpx;
	// 	   left: 0;
	// 	   right: 0;
	// 	   bottom: 0;
	// 	   margin: auto;
	// 	   text-align: center;
	// 	   // padding:16rpx 0 0 0;
	// 	   color: #333333;
	// 	   font-size: 26rpx;
		   
	//    }
 // }
 /*图片大小后来统一了*/
 .raking-con {
 	 width:72rpx;
 	 height: 72rpx;
 	 position:relative;
 	 // margin-top: 20rpx;
 	    /*排名高的*/
       .ranking-bk {
 		  display: block;
 		  width:68rpx;
 		  height: 68rpx;
 		  margin: 0 auto;
 	   }
 	   /*排名第三的*/
 	   .ranking-low {
 		   display: block;
 		   width:68rpx;
 		   height: 68rpx;
 		   margin: 0 auto;
 	   }
 	   /*低排名 不显示*/
 	   .ranking-hide {
 		   visibility: hidden;
 		   width:43rpx;
 		   height: 43rpx;
 		   margin: 0 auto;
 	   }
 	   .ranking-num {
 		   width:68rpx;
 		   height: 68rpx;
 		   position: absolute;
 		   top: 0;
 		   left: 0;
 		   right: 0;
 		   bottom: 0;
 		   margin: auto;
 		   text-align: center;
 		   padding:16rpx 0 0 0;
 		   // line-height: 68rpx;
 	   }
 	   .hot-raking {
 		   color: #ffffff;
 		   font-size: 32rpx;
 	   }
 	   /*低排名 字体改小*/
 	   .num-low {
 		   width:72rpx;
 		   height: 72rpx;
 		   position: absolute;
 		   top: 0;
 		   left: 0;
 		   right: 0;
 		   bottom: 0;
 		   margin: auto;
 		   text-align: center;
 		   padding:16rpx 0 0 0;
 		   color: #333333;
 		   // font-size: 26rpx;
 	   }
 }
</style>