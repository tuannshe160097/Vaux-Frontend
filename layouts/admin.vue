<template>
  <div class="layout-wrapper.layout-static">
    <MenuSidebar />
    <div class="main-container admin-layout" :style="{ marginLeft: sidebarWidth }">
      <Nuxt />
      <Toast />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Vue, Watch } from 'nuxt-property-decorator'
import MenuSidebar from '~/components/sidebar/Sidebar.vue'
const nsSidebar = namespace('layout/store-sidebar')
const nsStoreError = namespace('commons/store-error')

@Component({
  middleware: 'authenticate',
  components: { MenuSidebar }
})
class Dashboard extends Vue {
  @nsStoreError.State
  error!: string
  @nsSidebar.Getter('sidebarWidth')
  sidebarWidth!: string
  @Watch('error')
  showMessage(_error: string) {
    if (_error) {
      this.$toast.add({
        severity: 'error',
        summary: 'Error Message',
        detail: _error,
        life: 15000
      })
      this.$store.commit('commons/store-error/setError')
    }
  }
}

export default Dashboard
</script>

<style lang="sass">
.main-container
  height: auto

.w-100
  width: 100%
</style>
