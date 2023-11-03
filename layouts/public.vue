<template>
  <div class="layout-wrapper">
    <Nuxt />
    <Toast />
  </div>
</template>

<script lang='ts'>
import { Component, namespace, Vue, Watch } from 'nuxt-property-decorator'
const nsStoreError = namespace('commons/store-error')

@Component
class lPublic extends Vue {

  @nsStoreError.State
  error!: string

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

export default lPublic
</script>

<style lang='sass' scoped>
</style>
