<template>
  <h1 class="text-center">Trang thống kê!</h1>
</template>

<script lang='ts'>
import { Component, Vue } from 'nuxt-property-decorator'


@Component({
  middleware: ['authenticate'],
  layout: 'admin',
})
class DashboardPages extends Vue {

}

export default DashboardPages
</script>
<style lang='sass' scoped>
</style>
