<template>
  <div class="">
    <div class="sidebar" :style="{ width: sidebarWidth }">
      <div class="menu-section sidebar-head">
        <template v-if="!collapsed">
          <img class="user-avatar"
            :src='require("assets/images/user-profile-login-avatar-heroes-user-blue-icons-circle-symbol-logo-thumbnail.png")' />
          <div class="user-info white-space-nowrap overflow-hidden text-overflow-ellipsis" style="display:block;">
            <p class="user-name" style="display: inline;">{{ userDisplayName }}</p>
            <span style="display: block;">{{ userDisplayRole }}</span>
          </div>
        </template>
        <div class="icon icon--xlarge icon-menu-toggle surface-500 cursor-pointer" :class="{ 'bg-primary': collapsed }"
          @click="toggleSidebar"></div>
      </div>
      <hr />
      <div class="menu-section sidebar-menu">
        <SidebarItem v-for="item in pageMenu" :key="item.id" :item="item" @select="onSelectMenu(item)" />
      </div>
      <div class="menu-section sidebar-foot">
        <hr />
        <div class="menu-item flex-row pt-1 noti-area" @click="onNotificationClick()">
          <div>
            <div class="item-value" :class="{ 'active': notiActive }"><!---->
              <div class="item__icon">
                <div class="icon icon--large icon-notification "></div>
              </div>
              <div class="item__label"><span>Notifications</span> <span
                  class="icon toggle icon-chevron-down surface-500 toggle-none"></span> <span
                  class="mr-2 badge-notify p-badge p-component p-badge-no-gutter">{{ unseen }}</span></div>
            </div>
          </div>
        </div>
        <SidebarItem v-for="item in settingMenu" :key="item.id" :item="item" @select="onSelectMenu(item)" />
      </div>
    </div>
    <div class="Noti overflow-y-scroll" :class="{ 'hidden': !notiActive }"
      :style="{ left: sidebarWidth, width: sidebarWidth }" style="height: 70%;">
      <div v-if="notifications != undefined && notifications != null && notifications.length > 0">
        <div v-for="item in notifications" class="border-bottom-1 border-200 " :key="item.id" :item="item">
          <div class="p-2 hover:surface-300 border-10 cursor-pointer" style="text-indent: 10px;">
            <a :href="item.redirect" style="text-decoration: none; color:black">
              <Badge v-if="!item.seen" value="" class="mr-2"></Badge>
              <span v-badge.danger v-badge="2">
                {{ item.content }}
              </span>
            </a>
          </div>
        </div>
      </div>
      <!-- <SidebarItem v-for="item in pageMenu" @select="onSelectMenu(item)" /> -->
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, namespace, ProvideReactive, Vue, Watch } from 'nuxt-property-decorator'
import { User } from '~/models/User'
import { MENU_ACTION, PAGE_MENU, PAGE_MENU_ADMIN, PAGE_MENU_MOD, PAGE_MENU_EXPERT, SETTING_MENU } from '~/utils'
const nsSidebar = namespace('layout/store-sidebar')
const nsUser = namespace('user-auth/store-user')



@Component
class MenuSidebar extends Vue {
  notiActive: boolean = false
  unseen: number = 0
  // -- [ Statement Properties ] ------------------------------------------------

  @nsSidebar.Getter('sidebarWidth')
  sidebarWidth!: string

  @nsSidebar.State('collapsed')
  collapsed!: boolean

  @nsSidebar.Mutation('toggleSidebar')
  toggleSidebar: any

  @nsUser.State('user')
  user!: User.Model | undefined
  notifications: User.Notification[] | undefined = []

  // -- [ Properties ] ----------------------------------------------------------
  @ProvideReactive()
  selectedItem: any = null

  @ProvideReactive()
  parentItems: any = []

  pageMenu = PAGE_MENU
  settingMenu = SETTING_MENU
  // -- [ Getters ] -------------------------------------------------------------

  get userImageUrl() {
    return this.user?.avatarUrl || null
  }

  get userDisplayName() {
    return this.user?.name || 'Unknown'
  }

  get userDisplayRole() {
    switch (this.user?.role?.id) {
      case 1: return 'Quản lý'
      case 2: return 'Kiểm định viên'
      case 3: return 'Người bán'
      case 4: return 'Người mua'
      case 5: return 'Quản trị viên'
      default: return 'Role Ex'
    }
  }
  // -- [ Methods ] ------------------------------------------------------------

  mounted() {
    console.log(this.user)
    if (this.user?.role?.id == 2) {
      this.pageMenu = PAGE_MENU_EXPERT
    }
    else if (this.user?.role?.id == 1) {
      this.pageMenu = PAGE_MENU_MOD
    }
    if (this.user?.notifications) {
      this.notifications = this.user?.notifications;
      for (const noti of this.notifications) {
        if (!noti.seen) {
          this.unseen += 1;
        }
      }
    }
    document.body.addEventListener('click', this.handleBodyClick);
  }

  beforeDestroy() {
    // Remove the click event listener when the component is destroyed
    document.body.removeEventListener('click', this.handleBodyClick);
  }

  handleBodyClick(event: Event) {
    // Check if the clicked element is outside the notification and notification button
    const target = event.target as HTMLElement;
    const isNotiElement = target.closest('.Noti');
    const isNotificationButton = target.closest('.noti-area');

    if (!isNotiElement && !isNotificationButton) {
      // Clicked outside, so hide the notification
      this.notiActive = false;
    }
  }
  onNotificationClick() {
    this.notiActive = !this.notiActive
  }
  onSelectMenu(item: any) {
    this.selectedItem = !item.parentId && item.id === this.selectedItem?.id ? null : item
    if (!item.parentId) {
      this.parentItems = this.pageMenu.filter(value => value.parentId === item.id)
    }
    // handle specific actions
    if (item.action === MENU_ACTION.LOGOUT) {
      this.$cookies.remove('auth._token');
      this.$auth.logout()
    }
  }

  @Watch('$route.path', { immediate: true, deep: true })
  handleSelect() {
    if (this.$route && this.$route.params) {
      this.selectedItem = this.pageMenu.filter((item) => this.$route.path === item.to)[0]
    } else {
      this.selectedItem = this.pageMenu.filter((item) => this.$route.path.slice(0, item.to?.length) === item.to)[0]
    }
  }

}

export default MenuSidebar
</script>

<style lang="sass" scoped>
.Noti
  float: left
  position: fixed
  z-index: 1000
  bottom: 0
  padding: 0
  transition: 0.3s ease
  background: #fefefe
  border: 1px solid $primary
.sidebar
  @include flex-column
  float: left
  position: fixed
  z-index: 1
  top: 0
  left: 0
  bottom: 0
  padding: 0
  transition: 0.3s ease
  background: $primary

  &-head
    @include flex-center-vert
    padding: 21px 20px

    .user-avatar
      @include size(48px)
      border: 2px solid #0095FF
      border-radius: 8px
      margin-right: $space-size-12

    .user-info
      @include flex-column
      flex-grow: 1

    .user-name
      font-size: $font-size-large
      font-weight: $font-weight-bold

  &-menu
    padding: 0 15px
    padding-top: $space-size-16
    overflow-x: auto
    font-size : 400

  &-foot
    padding-top: $space-size-4
    min-height: 130px
    margin-top: auto

  .menu-section
    position: relative

  hr
    margin: 0
    border: 0
    border-top : 1px solid $primary-orange
    @include flex-center-vert



.toggle-none
  display: none

.sidebar-foot
  .badge-notify
    border-radius: 3px
    background-color: $bg-orange
.menu-item
  .nuxt-link-exact-active
    .item-value
      border-radius: 10px
      background-color: $second-yellow
      color:$primary
.child-item
  margin-left: 25px
  .item-collapsed
    display: none !important
  &::before
    display: none
  .item__label
    position: relative

.item-value
  @include flex-center-vert
  height: 100%
  position: relative
  color: $text-color-base
  font-size: $font-size-medium
  font-weight: $font-weight-semi-bold
  .item-collapsed
    display: none
  &.active
   .item-collapsed
     &.active-child
       display: block
     position: absolute
     top: 40px
     width: 230px
     background-color: $white
     border: 1px solid $bg-body-base
     box-shadow: 0px 10px 30px rgba(0, 10, 24, 0.1)
     border-radius: 8px
     z-index: 111
     li
      list-style: none
     .item-collapsed__children
       display: block
       text-decoration: none
       color: $text-color-900
       background-color: $primary-dark
       &:hover
        border-radius: 4px
        background-color: $second-yellow
       &.nuxt-link-active
        background: $primary
        color: $white
        border-radius: 4px

   &::before
    content: ""
    position: absolute
    border-radius: 0 5px 5px 0
    left: -16px
    width: 6px
    height: 35px
    background-color: $primary

  &:hover
    color: $white
    border-radius: 10px

  &.active
    border-radius: 10px
    background-color: $second-yellow
    color : $primary

  .item__label
    @include flex-center-space-between
    width: 100%
    min-height: 56px
    .icon 
      color:$primary
  .item__icon
    padding: $space-size-16

  .item__icon, .item__parent-link
    min-height: 56px

  .toggle
    margin-right: $space-size-20

.pl-16
  padding-left: $space-size-16
</style>
