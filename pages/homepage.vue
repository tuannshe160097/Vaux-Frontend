<template>
    <div class="wrapper">
        <h1>Trang chủ</h1>
    </div>
</template>
  
<script lang='ts'>
import { Component, namespace, Vue } from 'nuxt-property-decorator'

@Component({
    layout: 'public',
    meta: { isPublic: true }
})
class homepage extends Vue {
}
export default homepage
</script>
  
<style lang='sass' scoped>
</style>