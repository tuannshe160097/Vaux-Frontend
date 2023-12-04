<template>
	<nav id="navbar" class="left-0 w-full">
		<div class="wrapper flex align-items-center justify-content-between m-auto px-2">
			<div class="logo"><a href="/homepage">Logo</a></div>
			<ul class="nav-links inline-flex mx-2 megaDisplay">
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
					<a @click="megaDisplay = !megaDisplay" href="#" class="desktop-item mr-2">Danh mục</a>
					<div v-if="megaDisplay" class="mega-box absolute left-0 w-full">
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
				<li><a href="/seller" class=" ml-2">Kênh bán</a></li>
			</ul>
			<div class="text-yellow mr-2 dropOption notiDisplay" v-if="user != null">
				<a @click="notiDisplay = !notiDisplay" href="#" class="desktop-item">
					<i class="pi pi-bell"></i>
				</a>
				<div v-if="notiDisplay" class="relative">
					<ul class="drop-menu absolute surface border-10" style="max-height: 80vh; overflow-y: auto;">
						<li v-for="item in notifications" :key="item.id" :item="item"
							class="p-2 hover:surface-300 cursor-pointer border-bottom-1 border-200">
							<a href="#" class="border-10" style="line-height: 1.6;">
								<div class="flex align-content-center ">
									<div class="notiContent vertical-align-middle pr-2">
										{{ item.content }}
									</div>
									<div class="align-self-center">
										<Badge v-if="!item.seen" value="" class="mr-2"></Badge>
										<span v-else value="" class="mr-3"></span>
									</div>
								</div>
							</a>
						</li>
					</ul>
					<!-- <div class="">
						<div class="p-2 hover:surface-300 border-10 cursor-pointer" style="text-indent: 10px;">
						</div>
					</div> -->
				</div>
			</div>
			<div class="dropOption user-info profileDisplay" v-if="user != null">
				<a @click="profileDisplay = !profileDisplay" href="#" class="desktop-item"><span>{{ userDisplayName
				}}</span></a>
				<div v-if="profileDisplay" class="relative">
					<ul class="drop-menu2 absolute">
						<li><a href="/account/profile">Cá nhân</a></li>
						<li><a href="/account/items">Sản phẩm</a></li>
						<li><a href="/account/orders">Đơn hàng</a></li>
						<li><a @click="logout()">Đăng xuất</a></li>
					</ul>
				</div>
			</div>
			<div class="action flex align-items-center" v-if="user == null">
				<button class="p-button btn-primary border-10" style="padding: 9px 2rem;" @click="Login()">Đăng
					nhập</button>
			</div>
		</div>
		<div class="hidden">
			<img src="https://fadzrinmadu.github.io/hosted-assets/responsive-mega-menu-and-dropdown-menu-using-only-html-and-css/img.jpg"
				alt="">
		</div>
	</nav>
</template>

<script lang='ts'>
import { Component, namespace, ProvideReactive, Vue, Watch } from 'nuxt-property-decorator'
import { User } from '~/models/User'
const nsUser = namespace('user-auth/store-user')


@Component
class MenuNavbar extends Vue {
	// -- [ Statement Properties ] ------------------------------------------------
	notiDisplay: boolean = false
	profileDisplay: boolean = false
	megaDisplay: boolean = false
	notifications: any[] = [
		{ id: 1, seen: true, content: 'Đây là 1 chiếc thông báo nhỏ nhỏ cho bạn nhỏ vừa bỏ người yêu.Đây là 1 chiếc thông báo nhỏ nhỏ cho bạn nhỏ vừa bỏ người yêu' },
		{ id: 2, seen: false, content: 'Đây là 1 chiếc thông báo nhỏ nhỏ cho bạn nhỏ vừa bỏ người yêu. Đây là 1 chiếc thông báo nhỏ nhỏ cho bạn nhỏ vừa bỏ người yêu' },
		{ id: 3, seen: true, content: 'Đây là 1 chiếc thông báo nhỏ nhỏ cho bạn nhỏ vừa bỏ người yêu' },
		{ id: 4, seen: false, content: 'Đây là 1 chiếc thông báo nhỏ nhỏ cho bạn nhỏ vừa bỏ người yêu' },
		{ id: 5, seen: false, content: 'Đây là 1 chiếc thông báo nhỏ nhỏ cho bạn nhỏ vừa bỏ người yêu' },
		{ id: 6, seen: false, content: 'Đây là 1 chiếc thông báo nhỏ nhỏ cho bạn nhỏ vừa bỏ người yêu' },
		{ id: 7, seen: false, content: 'Đây là 1 chiếc thông báo nhỏ nhỏ cho bạn nhỏ vừa bỏ người yêu' },
		{ id: 8, seen: true, content: 'Đây là 1 chiếc thông báo nhỏ nhỏ cho bạn nhỏ vừa bỏ người yêu' },
		{ id: 9, seen: false, content: 'Đây là 1 chiếc thông báo nhỏ nhỏ cho bạn nhỏ vừa bỏ người yêu' },
	]
	@nsUser.State('user')
	user!: User.Model | null

	// -- [ Properties ] ----------------------------------------------------------
	@ProvideReactive()
	selectedItem: any = null

	@ProvideReactive()
	parentItems: any = []
	// -- [ Getters ] -------------------------------------------------------------

	get userDisplayName() {
		console.log('LTA0: ', this.user)
		return this.user?.name || 'Unknown'
	}
	logout() {
		this.user = null
		this.$cookies.remove('auth._token')
		this.$auth.logout()
	}
	Login() {
		this.$router.push('/authen/login')
	}
	mounted() {
		// Thêm đoạn script vào đây khi component được mounted
		var prevScrollpos = window.pageYOffset;
		window.onscroll = function () {
			var currentScrollPos = window.pageYOffset;
			const nav = document.getElementById("navbar");
			if (nav != null) {
				if (prevScrollpos > currentScrollPos) {
					nav.style.top = "0";
				} else {
					nav.style.top = "-70px";
				}
			}
			prevScrollpos = currentScrollPos;
		};
		document.body.addEventListener('click', this.handleBodyClick);
	}

	beforeDestroy() {
		// Remove the click event listener when the component is destroyed
		document.body.removeEventListener('click', this.handleBodyClick);
	}
	handleBodyClick(event: Event) {
		// Check if the clicked element is outside the notification and notification button
		const target = event.target as HTMLElement;
		const isMegaElement = target.closest('.megaDisplay');
		const isProfileElement = target.closest('.profileDisplay');
		const isNotiElement = target.closest('.notiDisplay');

		if (!isMegaElement && !isProfileElement && !isNotiElement) {
			// Clicked outside, so hide the notification
			this.notiDisplay = false;
			this.profileDisplay = false;
			this.megaDisplay = false;
		} else if (isMegaElement) {
			this.notiDisplay = false;
			this.profileDisplay = false;
		} else if (isNotiElement) {
			this.megaDisplay = false;
			this.profileDisplay = false;
		} else if (isProfileElement) {
			this.notiDisplay = false;
			this.megaDisplay = false;
		}
	}
}

export default MenuNavbar
</script>

<style lang="sass" scoped>
$color_1: #f2f2f2
$color_2: #d9d9d9
*
	margin: 0
	padding: 0
.notiContent
	display: -webkit-box
	-webkit-line-clamp: 3
	-webkit-box-orient: vertical
	overflow: hidden
	text-overflow: ellipsis
nav 
	top:0
	position: fixed
	z-index: 99
	background: #371C15
	transition: top 0.2s
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
		.mega-box 
			transition: all 0.3s ease
			top: 70px
			opacity: 1
			visibility: visible
		&:hover 
			.drop-menu 
				transition: all 0.3s ease
				top: 70px
				opacity: 1
				visibility: visible
	.mobile-item 
		display: none
.dropOption
	.drop-menu2,.drop-menu
		transition: all 0.3s ease
		opacity: 1
		top: -2px
		margin-left: calc((180px - 100%) * -1)
		visibility: visible
.notiDisplay
	> a 
		color: $primary-yellow !important
		text-decoration: none
		font-size: 16px
		font-weight: 500
		padding: 9px 15px
		border-radius: 10px
		transition: all 0.3s ease
		&:hover 
			background: $primary-dark
	a 
		color: $dark
		text-decoration: none
		border-radius: 10px


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
	
.drop-menu 
	background: $white
	width: 320px
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
