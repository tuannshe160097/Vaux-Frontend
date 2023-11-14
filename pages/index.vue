<template>
  <div>
    <h1 class="text-center">WELCOME!</h1>
    <button v-on:click="logout()">logout</button>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

export default {
  created() {
    // Gọi API khi component được tạo
    this.redirect()
  },
  methods: {
    async redirect() {
      const role = this.$cookies.get('auth.role')
      if (role == 1 || role == 2 || role == 5) {
        this.$router.push('/admin/dashboard')
      } else if (role == 3 || role == 4) {
        this.$router.push('/homepage')
      } else {
        this.$router.push('/authen/login')
      }
    },
    logout() {
      this.$cookies.remove('auth._token')
      this.$auth.logout()
      this.$router.push('/authen/login')
    },
  },
}
</script>
<style lang='sass' scoped>
</style>
