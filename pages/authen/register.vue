//register
<template>
  <section class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden p-2">
    <div class="grid justify-content-center col-12 md:col-6 lg:col-4">
      <div class="logo-block w-full mb-5">
        <img class="pr-1" :src="require('~/assets/images/tag-user.png')" /><img class="pt-2"
          :src="require('~/assets/images/logo-text-airtag.png')" />
      </div>
      <div class="w-full">
        <label class="block font-bold mb-2" for="inputName"> Họ và tên </label>
        <span class="p-input-icon-left mb-3 w-full">
          <div class="icon icon--left icon-user bg-primary"></div>

          <InputText class="w-full" id="inputName" type="text" v-model="name" />
        </span>
        <label class="block font-bold mb-2" for="inputSdt">
          Số điện thoại
        </label>
        <span class="p-input-icon-left mb-3 w-full">
          <div class="icon icon--left icon-sms bg-primary"></div>
          <InputMask mask="9999999999" class="w-full" id="inputSdt" v-model="sdt" slotChar=" " />
        </span>
        <label class="block font-bold mb-2" for="inputPassword"> OTP </label>
        <span class="p-input-icon-left mb-6 w-full">
          <div class="icon icon--left icon-lock-open bg-primary"></div>
          <InputText id="inputPassword" type="text" v-model="otp"></InputText>
          <Button label="Send Otp" @click="sendOtp"></Button>
        </span>
        <Button class="bg-primary w-full p-3 mb-3" type="button" label="Đăng ký" @click="callRegister"></Button>
        <div class="flex align-items-center justify-content-center mb-5">
          <a href="/authen/login" class="ml-5 text-sm text-center text-primary cursor-pointer">Đã có tài khoản?</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang='ts'>
import { Component, namespace, Vue } from 'nuxt-property-decorator'
const nsStoreUser = namespace('user-auth/store-user')

@Component({
  layout: 'public',
  middleware: ['interception'],
})
class Register extends Vue {
  sdt: string = ''
  otp: string = ''
  name: string = ''
  checked: boolean = true

  @nsStoreUser.Action
  actRegister !: (params: { phone: string, name: string }) => Promise<any>

  @nsStoreUser.Action
  actVerify !: (params: any) => Promise<string>

  async sendOtp() {
    if (this.sdt && this.name) {
      const params = {
        name: this.name,
        phone: this.sdt
      }
      const result = await this.actRegister(params)
      if (result !== undefined && result !== null) {
        this.$store.commit('commons/store-error/setError', 'Đăng ký thành công. Vui lòng xác nhận OTP để tiếp tục')
      }
    } else {
      this.$store.commit('commons/store-error/setError', 'Vui lòng nhập Số điện thoại và Tên để đăng ký')
    }
  }

  async callRegister() {
      const params = {
        otp: this.otp,
        phone: this.sdt
      }
    let result = await this.actVerify(params)
    if (result !== undefined && result !== null) {
      this.$store.commit('commons/store-error/setError', 'Xác nhận thành công. Vui lòng đăng nhập lại để tiếp tục')
      this.$router.push('/authen/login')
    }
  }
}
export default Register
</script>
<style lang='sass'>
.logo-block
  height: 54px
  img
    height: 100%
</style>
