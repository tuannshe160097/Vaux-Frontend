<template>
  <div class="item-value" :class="{ 'active': active, 'child-item': !!item.parentId }">
    <ul v-if="collapsed &amp;&amp; parentItems.length &gt; 0" class="item-collapsed p-2" :class="{'active-child': isShowChildren}">
        <li v-for="parent in parentItems" :key="parent.id" @click.stop="handleSelect">
            <nuxt-link class="item-collapsed__children py-3 pl-4" :to="parent.to">{{parent.label}}</nuxt-link>
        </li>
    </ul>
    <div v-if="!!item.icon" class="item__icon">
        <div class="icon icon--large" :class="`icon-${item.icon} ${iconMenuCssClasses}`"></div>
    </div>
    <transition name="fade">
        <div v-if="!collapsed" class="item__label" :class="{ 'pl-16': !!item.parentId, 'last-item': item.isLast }">
          <span>{{ item.label }}</span>
          <span class="icon toggle icon-chevron-down surface-500" :class="iconSelectCssClasses"></span>
          <Badge v-if="item.label === 'Notifications'" class="mr-2 badge-notify" :value="3"></Badge>
        </div>
    </transition>
  </div>
</template>

<script lang='ts'>

import { Component, InjectReactive, namespace, Prop, Vue, Watch } from 'nuxt-property-decorator'
const nsSidebar = namespace('layout/store-sidebar')

@Component
class SidebarItemValue extends Vue {
  isShowChildren: boolean = false
  // -- [ Statement Properties ] ----------------------------------------------------------
  @nsSidebar.State('collapsed')
  collapsed!: boolean

  @Prop() readonly item!: any | undefined
  @InjectReactive() readonly selectedItem!: any
  @InjectReactive() readonly parentItems!: any

  @Watch('active')
  resetActive() {
    this.isShowChildren = this.active
  }

  @Watch('collapsed')
  showChild(){
    if(!this.collapsed) {
      this.isShowChildren = false
    }
  }
  // -- [ Getters ] -----------------------------------------------------------------------

  get active() {
    return this.item.id === this.selectedItem?.id || this.item.id === this.selectedItem?.parentId
  }

  get iconMenuCssClasses() {
    return this.active ? 'bg-primary' : ''
  }

  get iconSelectCssClasses() {
    let clazz = !this.item.parentId ? '' : '-rotate-90'
    if (this.active && !!this.item.parentId) {
      clazz += ' bg-primary'
    } else if (this.active) {
      clazz += ' surface-900'
    }
    if (this.item.hideToggled) {
      clazz += ' toggle-none'
    }
    return clazz
  }

  handleSelect() {
    this.isShowChildren = false
  }
}

export default SidebarItemValue
</script>

<style lang="sass" scoped>
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
