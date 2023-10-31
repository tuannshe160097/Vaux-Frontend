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
  height: auto
.header
  height: 90px
  background: #fff
  width: auto
  align-items: center
  display: flex
  padding: 2rem
  color: #a16b56
  text-transform: uppercase
  box-shadow: -2px 5px 20px rgba(161, 107, 86, 0.1)

.card-body
  margin: 1rem
  background: #fff
  border-radius: 10px
  padding: 1rem
  box-shadow: -2px 5px 20px rgba(2.25, 0, 112.62, 0.1)

table .p-datatable-thead
  background: #ead9d2

.p-datatable.p-datatable-striped .p-datatable-tbody > tr:nth-child(even)
  background-color: #fbf8f7 !important

</style>
