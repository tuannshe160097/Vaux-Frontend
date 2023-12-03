<template>
	<nav id="navbar" class="left-0 w-full">
		<div class="wrapper flex align-items-center justify-content-start m-auto px-2">
			<div class="logo mr-4"><a href="/homepage">VAUX</a></div>
            <h3 class="m-0 pl-4" style="border-left: 1px solid black;">Thanh toán</h3>
		</div>
	</nav>
</template>

<script lang='ts'>
import { Component, namespace, ProvideReactive, Vue, Watch } from 'nuxt-property-decorator'
import { User } from '~/models/User'
const nsUser = namespace('user-auth/store-user')


@Component
class PaymentNavbar extends Vue {
}

export default PaymentNavbar
</script>

<style lang="sass" scoped>
*
	margin: 0
	padding: 0
nav 
	top:0
	z-index: 99
	background: $white
	transition: top 0.2s
	box-shadow: -2px 5px 20px  rgba(161, 107, 86, 0.1)
	.wrapper 
		max-width: 1200px
		height: 90px
		line-height: 70px
.wrapper 
	.logo 
		a 
			color: $primary
			font-size: 40px
			font-weight: 600
			text-decoration: none
</style>
