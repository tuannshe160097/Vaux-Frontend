<template>
  <div class="h-screen flex flex-column justify-content-between">
    <MenuNavbar />
    <div class="bg1 main-container flex-grow-1">
      <Nuxt />
      <Toast />
    </div>
    <div class="bg-footer ">
      Footer
    </div>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Vue, Watch } from 'nuxt-property-decorator'
import MenuNavbar from '~/components/navbar/Navbar.vue'
const nsSidebar = namespace('layout/store-sidebar')
const nsStoreError = namespace('commons/store-error')

@Component({
  middleware: 'authenticate',
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
.bg-footer
  background-color: #cccccc
.main-container
  margin-top:70px
  height: auto
section
  max-width:1200px
  margin : auto
.w-100
  width: 100%
</style>
