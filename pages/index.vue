<template>
  <div>
    <H1>Helloooo</H1>
    <Button @click="Login()"> Đăng nhập </Button>
  </div>
</template>



</template>

<script>
export default {
  methods: {
    Login() {
      this.$router.push('/authen/login')
    },
  },
}
</script>
<style lang='sass'>
</style>
