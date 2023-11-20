<template>
  <div class="layout-wrapper.layout-static">
    <div class="main-container">
      <Nuxt />
      <Toast />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Vue, Watch } from 'nuxt-property-decorator'
import MenuNavbar from '~/components/navbar/Navbar.vue'
const nsSidebar = namespace('layout/store-sidebar')
const nsStoreError = namespace('commons/store-error')

@Component({
  components: { MenuNavbar }
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
        summary: 'Lỗi',
        detail: _error,
        life: 15000
      })
      this.$store.commit('commons/store-error/setError')
    }
  }
}

export default Dashboard
</script>

<style lang="sass" scoped>
.main-container
  height: auto
section
  max-width: 1200px
  margin : auto
.w-100
  width: 100%
</style>
