<template>
	<nav class="absolute top-0 left-0 w-full">
		<div class="wrapper flex align-items-center justify-content-between m-auto">
			<div class="logo"><a href="#">Logo</a></div>
			<ul class="nav-links inline-flex  mx-6">
				<!-- <li>
					<a href="#" class="desktop-item">Dropdown Menu</a>
					<label for="showDrop" class="mobile-item">Dropdown Menu</label>
					<ul class="drop-menu absolute ">
						<li><a href="#">Drop menu 1</a></li>
						<li><a href="#">Drop menu 2</a></li>
						<li><a href="#">Drop menu 3</a></li>
						<li><a href="#">Drop menu 4</a></li>
					</ul>
				</li> -->
				<li>
					<a href="#" class="desktop-item">Danh mục</a>
					<div class="mega-box absolute left-0 w-full">
						<div class="content flex w-full justify-content-between">
							<div class="row">
								<img src="https://fadzrinmadu.github.io/hosted-assets/responsive-mega-menu-and-dropdown-menu-using-only-html-and-css/img.jpg"
									alt="">
							</div>
							<div class="row">
								<header>Design Services</header>
								<ul class="mega-links">
									<li><a href="#">Graphics</a></li>
									<li><a href="#">Vectors</a></li>
									<li><a href="#">Business cards</a></li>
									<li><a href="#">Custom logo</a></li>
								</ul>
							</div>
							<div class="row">
								<header>Email Services</header>
								<ul class="mega-links">
									<li><a href="#">Personal Email</a></li>
									<li><a href="#">Business Email</a></li>
									<li><a href="#">Mobile Email</a></li>
									<li><a href="#">Web Marketing</a></li>
								</ul>
							</div>
							<div class="row">
								<header>Security services</header>
								<ul class="mega-links">
									<li><a href="#">Site Seal</a></li>
									<li><a href="#">VPS Hosting</a></li>
									<li><a href="#">Privacy Seal</a></li>
									<li><a href="#">Website design</a></li>
								</ul>
							</div>
						</div>
					</div>
				</li>
				<li class="flex-grow-1">
					<InputText type="text" class="w-full px-2" placeholder="Tìm sản phẩm" />
				</li>
				<li><a href="#" class=" ml-6">Tạo sản phẩm</a></li>
			</ul>
			<div class="user-info" v-if="user != null">
				<a href="#" class="desktop-item"><span>{{ userDisplayName }}</span></a>
				<div class="relative">
					<ul class="drop-menu2 absolute ">
						<li><a href="#">Drop menu 1</a></li>
						<li><a href="#">Drop menu 2</a></li>
						<li><a href="#">Drop menu 3</a></li>
						<li><a @click="logout()">Logout</a></li>
					</ul>
				</div>
			</div>
			<div class="action flex align-items-center" v-if="user == null">
				<button class="p-button btn-primary border-10" style="padding: 9px 2rem;" @click="Login()">Đăng nhập</button>
			</div>
		</div>
	</nav>
</template>

<script lang='ts'>
import { Component, namespace, ProvideReactive, Vue, Watch } from 'nuxt-property-decorator'
import { User } from '~/models/User'
import { MENU_ACTION, PAGE_MENU, SETTING_MENU } from '~/utils'
const nsUser = namespace('user-auth/store-user')


@Component
class MenuNavbar extends Vue {
	// -- [ Statement Properties ] ------------------------------------------------

	@nsUser.State('user')
	user!: User.Model | undefined

	// -- [ Properties ] ----------------------------------------------------------
	@ProvideReactive()
	selectedItem: any = null

	@ProvideReactive()
	parentItems: any = []

	pageMenu = PAGE_MENU
	settingMenu = SETTING_MENU
	// -- [ Getters ] -------------------------------------------------------------

	get userDisplayName() {
		console.log(this.user)
		return this.user?.name || 'Unknown'
	}
	logout() {
		this.$cookies.remove('auth._token')
		this.$auth.logout()
	}
	Login() {
		this.$router.push('/authen/login')
	}
	//   get userDisplayRole() {
	//     return this.user?.role?.title || 'Role Ex'
	//   }
	//   // -- [ Methods ] ------------------------------------------------------------

	//   onSelectMenu(item: any) {
	//     this.selectedItem = !item.parentId && item.id === this.selectedItem?.id ? null : item
	//     if (!item.parentId) {
	//       this.parentItems = this.pageMenu.filter(value => value.parentId === item.id)
	//     }
	//     // handle specific actions
	//     if (item.action === MENU_ACTION.LOGOUT) {
	//       this.$cookies.remove('auth._token')
	//       this.$auth.logout()
	//     }
	//   }

	//   @Watch('$route.path', { immediate: true, deep: true })
	//   handleSelect() {
	//     if (this.$route && this.$route.params) {
	//       this.selectedItem = this.pageMenu.filter((item) => this.$route.path === item.to)[0]
	//     } else {
	//       this.selectedItem = this.pageMenu.filter((item) => this.$route.path.slice(0, item.to?.length) === item.to)[0]
	//     }
	//   }

}

export default MenuNavbar
</script>

<style lang="sass" scoped>
$color_1: #f2f2f2
$color_2: #d9d9d9
*
	margin: 0
	padding: 0
nav 
	z-index: 99
	background: #371C15
	.wrapper 
		max-width: 1200px
		height: 70px
		line-height: 70px
.wrapper 
	.logo 
		a 
			color: $primary-yellow
			font-size: 30px
			font-weight: 600
			text-decoration: none

.nav-links 
	flex-grow: 1 
	li 
		list-style: none
		a 
			color: $primary-yellow
			text-decoration: none
			font-size: 16px
			font-weight: 500
			padding: 9px 15px
			border-radius: 10px
			transition: all 0.3s ease
			&:hover 
				background: $primary-dark
		&:hover 
			.drop-menu 
				transition: all 0.3s ease
				top: 70px
				opacity: 1
				visibility: visible
			.mega-box 
				transition: all 0.3s ease
				top: 70px
				opacity: 1
				visibility: visible
	.mobile-item 
		display: none
.user-info
	li 
		list-style: none
	a 
		color: $primary-yellow
		text-decoration: none
		font-size: 16px
		font-weight: 500
		padding: 9px 15px
		border-radius: 10px
		transition: all 0.3s ease
		&:hover 
			background: $primary-dark
	&:hover 
		.drop-menu2 
			transition: all 0.3s ease
			opacity: 1
			top: -2px
			margin-left: calc((180px - 100%) * -1)
			visibility: visible
.drop-menu 
	background: $primary
	width: 180px
	line-height: 45px
	top: 85px
	opacity: 0
	visibility: hidden
	box-shadow: 0 6px 10px rgba(0,0,0,0.15)
	li 
		a 
			width: 100%
			display: block
			padding: 0 0 0 15px
			font-weight: 400
			border-radius: 0px
.drop-menu2 
	background: $primary
	width: 180px
	line-height: 45px
	top: 15px
	margin-left: calc((180px - 100%) * -1)
	opacity: 0
	visibility: hidden
	box-shadow: 0 6px 10px rgba(0,0,0,0.15)
	li 
		a 
			width: 100%
			display: block
			padding: 0 0 0 15px
			font-weight: 400
			border-radius: 0px
.mega-box 
	padding: 0 30px
	top: 85px
	opacity: 0
	visibility: hidden
	.content 
		background: $primary
		padding: 25px 20px
		box-shadow: 0 6px 10px rgba(0,0,0,0.15)
		.row 
			width: calc(25% - 30px)
			line-height: 45px
.content 
	.row 
		img 
			width: 100%
			height: 100%
			object-fit: cover
		header 
			color: $primary-yellow
			font-size: 20px
			font-weight: 500
		.mega-links 
			margin-left: -40px
			border-left: 1px solid rgba(255,255,255,0.09)
.row 
	.mega-links 
		li 
			padding: 0 20px
			a 
				padding: 0px
				padding: 0 20px
				color: $color_2
				font-size: 17px
				display: block
				&:hover 
					color: $primary-yellow
</style>
