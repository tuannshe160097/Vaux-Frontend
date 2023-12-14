<template>
  <section>
    <h1 class="text-center">WELCOME!</h1>
    <button @click="logout()">logout</button>
  </section>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { User } from '~/models/User'
const nsUser = namespace('user-auth/store-user')
const nsStoreItem = namespace('item/store-seller-item')
const nsCategory = namespace('category/store-category')

@Component({
  layout: 'public',
  meta: { isPublic: true },
})
class Index extends Vue {
  @nsUser.State('user')
  user!: User.Model | null
  async redirect() {
    if (!this.user) {
      this.$router.push('/homepage')
    } else if (this.user.role.id == 1 || this.user.role.id == 5) {
      this.$router.push('/admin/dashboard')
    } else {
      this.$router.push('/homepage')
    }
  }
  created() {
    // Gọi API khi component được tạo
    this.redirect()
  }
  logout() {
    this.$cookies.remove('auth._token')
    this.$auth.logout()
    this.$router.push('/authen/login')
  }
}
export default Index

</script>
<style lang='sass' scoped>
</style>
