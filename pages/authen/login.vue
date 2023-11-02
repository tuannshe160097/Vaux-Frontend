<template>
  <section class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden p-2">
    <div class="grid justify-content-center col-12 md:col-6 lg:col-4">
      <div class="w-full">
        <div class="form-group">
          <label class="block font-bold mb-1">
            Số điện thoại
          </label>
          <InputMask v-model="sPhoneNumber" mask="9999999999" class="w-full" slot-char="" placeholder="Số điện thoại" />
        </div>
        <div class="form-group mt-3">
          <Button label="Send OTP" class="p-button-outlined w-full" @click="sendOtp"></Button>
        </div>
        <div class="form-group mt-2">
          <label class="block font-bold mb-1"> OTP </label>
          <InputText v-model="sOTP" type="text" class="w-full" placeholder="OTP" />
        </div>
        <div class="form-group mt-3">
          <Button class="bg-primary w-full p-3 mb-3" type="button" label="Sign In" @click="callLogin"></Button>
          <div class="flex align-items-center justify-content-center mb-5">
            <a class="ml-5 text-sm text-right text-primary cursor-pointer" href="/authen/register">Chưa có tài khoản?</a>
          </div>
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
class Login extends Vue {

  sPhoneNumber: string = ''
  sOTP: string | null = null
  isCheckedSavePw = false

  @nsStoreUser.Action
  actSendOTPCode!: (phone: string) => Promise<string>

  async sendOtp() {
    if (this.sPhoneNumber) {
      this.sOTP = await this.actSendOTPCode(this.sPhoneNumber)
      if (this.sOTP !== undefined && this.sOTP !== null) {
        //alert(`Mã OTP đã được gửi tới số điện thoại của bạn, ${this.sPhoneNumber}`);
      }
    } else {
      this.sOTP = null
      this.$store.commit('commons/store-error/setError', 'Vui lòng nhập Số điện thoại')
    }
  }

  async callLogin() {
    if (!this.sPhoneNumber) {
      this.$store.commit('commons/store-error/setError', 'Vui lòng nhập Số điện thoại')
    } else if (this.sOTP === null) {
      this.$store.commit('commons/store-error/setError', 'Vui lòng nhập OTP')
    }

    try {
      const response: any = await this.$auth.loginWith('local', { params: { phone: this.sPhoneNumber, otp: this.sOTP } })
      if (response?.data) {
        this.$cookies.set('auth._token', response?.data.jwt, { path: '/', maxAge: 3600 })
        this.$cookies.set('auth.role', response?.data.role.id, { path: '/', maxAge: 3600 })
        await this.$auth.setUserToken(response.data.jwt)
        this.$router.push('/')
      }
    } catch (error) {
      this.$store.commit('commons/store-error/setError', error.response.data)
    }

  }

}

export default Login
</script>
<style lang='sass' scoped>
.form-group
  position: relative
  margin-bottom: 0
  margin-right: 0
  margin-left: 0

</style>
