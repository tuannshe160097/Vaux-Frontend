<template>
  <div v-show="isShow" class="menu-item flex-row pt-1" @click="select(item)">
    <NuxtLink v-if="!!item.to" :to="item.to">
      <SidebarItemValue :item="item" />
    </NuxtLink>
    <div v-if="!item.to">
      <SidebarItemValue :item="item" />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Emit, InjectReactive, namespace, Prop, Vue } from 'nuxt-property-decorator'
const nsSidebar = namespace('layout/store-sidebar')

@Component
class SidebarItem extends Vue {
  // -- [ Statement Properties ] ------------------------------------------------
  @nsSidebar.State('collapsed')
  collapsed!: boolean

  @Prop() readonly item!: any | undefined
  @InjectReactive() readonly selectedItem!: any

  @Emit()
  select(item: any) {
    return item
  }

  // -- [ Getters ] -------------------------------------------------------------
  get isShow() {
    return !this.item.parentId ||
      (this.selectedItem?.parentId === this.item.parentId) ||
      (this.selectedItem?.id === this.item.parentId)
  }
}

export default SidebarItem
</script>

<style lang="sass" scoped>
.menu-item
  cursor: pointer

.item-parent-link
  width: 40px
  height: 40px

a
  cursor: pointer
  position: relative
  user-select: none
  text-decoration: none

.ml-40
  margin-left: 40px
</style>
