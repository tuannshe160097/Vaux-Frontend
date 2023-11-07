<template>
    <div>nội sung</div>
</template>
<script lang='ts'>
import { Component, namespace, Vue } from 'nuxt-property-decorator'
const nsStoreUser = namespace('user-auth/store-user')
@Component({
  layout: 'public',
})
class Test extends Vue {}
export default Test
</script>
<style lang='sass' scoped>
</style>
