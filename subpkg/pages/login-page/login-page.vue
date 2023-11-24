<template>
	<my-login @onLoginSuccess="onLoginSuccess"></my-login>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			onLoginSuccess() {
				//登录后返回当前页面
				uni.navigateBack({ delta: 1 })
			}
		}
	}
</script>

<style lang="scss">

</style>
