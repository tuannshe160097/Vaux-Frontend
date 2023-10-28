<template>
  <div class="layout-wrapper.layout-static">
    <MenuSidebar />
    <div class="main-container" :style="{ marginLeft: sidebarWidth }">
      <Nuxt />
      <Toast />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import MenuSidebar from '~/components/sidebar/Sidebar.vue'
const nsSidebar = namespace('layout/store-sidebar')

@Component({
  middleware: 'authenticate',
  components: { MenuSidebar }
})
class Dashboard extends Vue {
  @nsSidebar.Getter('sidebarWidth')
  sidebarWidth!: string
}

export default Dashboard
</script>

<style lang="sass">
.main-container
  background-color: $bg-body-base
  height: 100vh
  padding: $space-size-16
</style>
