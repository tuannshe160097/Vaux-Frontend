<template lang="pug">
.sidebar(:style="{ width: sidebarWidth }")
  .menu-section.sidebar-head
    template(v-if="!collapsed")
      img.user-avatar(:src='require("assets/images/user-profile-login-avatar-heroes-user-blue-icons-circle-symbol-logo-thumbnail.png")')
      .user-info
        span.user-name {{ userDisplayName }}
        span.user-role Role Ex
    .icon.icon--xlarge.icon-menu-toggle.surface-500.cursor-pointer(:class="{ 'bg-primary': collapsed }", @click="toggleSidebar")
  .menu-section.sidebar-menu
    SidebarItem(v-for="item in pageMenu" :key="item.id" :item="item" @select="onSelectMenu(item)")
  .menu-section.sidebar-foot
    SidebarItem(v-for="item in settingMenu" :key="item.id" :item="item" @select="onSelectMenu(item)")
</template>

<script lang='ts'>
import { Component, namespace, ProvideReactive, Vue, Watch } from 'nuxt-property-decorator'
import { User } from '~/models/User'
import { MENU_ACTION, PAGE_MENU, SETTING_MENU } from '~/utils'
const nsSidebar = namespace('layout/store-sidebar')
const nsUser = namespace('user-auth/user')



@Component
class MenuSidebar extends Vue {
  // -- [ Statement Properties ] ------------------------------------------------

  @nsSidebar.Getter('sidebarWidth')
  sidebarWidth!: string

  @nsSidebar.State('collapsed')
  collapsed!: boolean

  @nsSidebar.Mutation('toggleSidebar')
  toggleSidebar: any

  @nsUser.Mutation('user')
  user!: User.Model | undefined

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
    return this.user?.displayName || 'Unknown'
  }
  // -- [ Methods ] ------------------------------------------------------------

  onSelectMenu(item: any) {
    this.selectedItem = !item.parentId && item.id === this.selectedItem?.id ? null : item
    if(!item.parentId) {
      this.parentItems = this.pageMenu.filter(value => value.parentId === item.id)
    }
    // handle specific actions
    if (item.action === MENU_ACTION.LOGOUT) {
      this.$auth.logout()
    }
  }

  @Watch('$route.path',{ immediate: true, deep: true })
  handleSelect (){
    if(this.$route && this.$route.params){
      this.selectedItem = this.pageMenu.filter((item)=> this.$route.path === item.to )[0]
    }else {
      this.selectedItem = this.pageMenu.filter((item)=> this.$route.path.slice(0, item.to?.length) === item.to )[0]
    }
  }

}

export default MenuSidebar
</script>

<style lang="sass" scoped>
.sidebar
  @include flex-column
  float: left
  position: fixed
  z-index: 1
  top: 0
  left: 0
  bottom: 0
  padding: 30px 16px 30px 18px
  transition: 0.3s ease
  background: $primary

  &-head
    @include flex-center-vert
    border-bottom: 1px solid $text-color-400
    padding-bottom: $space-size-24

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
    padding-top: $space-size-16
    overflow-x: auto

  &-foot
    padding-top: $space-size-4
    border-top: 1px solid $text-color-400
    min-height: 130px
    margin-top: auto

  .menu-section
    position: relative
</style>