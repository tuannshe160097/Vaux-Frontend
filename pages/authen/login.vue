<template>
  <section
    class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden p-2"
  >
    <div class="grid justify-content-center col-12 md:col-6 lg:col-4">
      <div class="logo-block w-full mb-5">
        <img class="pr-1" :src="require('~/assets/images/tag-user.png')" /><img
          class="pt-2"
          :src="require('~/assets/images/logo-text-airtag.png')"
        />
      </div>
      <div class="w-full">
        <label class="block font-bold mb-2" for="inputSdt">
          Số điện thoại
        </label>
        <span class="p-input-icon-left mb-3 w-full">
          <div class="icon icon--left icon-sms bg-primary"></div>
          <!-- <InputNumber class="w-full" id="inputSdt" v-model="sdt" :useGrouping="false"></InputNumber> -->
          <InputMask
            mask="9999999999"
            class="w-full"
            id="inputSdt"
            v-model="sdt"
            slotChar=" "
          />
        </span>
        <label class="block font-bold mb-2" for="inputPassword"> OTP </label>
        <span class="p-input-icon-left mb-6 w-full">
          <div class="icon icon--left icon-lock-open bg-primary"></div>
          <InputText id="inputPassword" type="text" v-model="otp"></InputText>
          <Button
            label="Send Otp"
            class="g-recaptcha"
            data-sitekey="6Ldx37UoAAAAAKeB-1aPHttMxc_e9aW6T2t55LQe"
            data-callback="sendOtp"
            data-action="submit"
          ></Button>
        </span>
        <Button
          class="bg-primary w-full p-3 mb-3"
          type="button"
          label="Sign In"
          @click="callLogin"
        ></Button>
        <div class="flex align-items-center justify-content-between mb-5">
          <div class="flex align-items-center">
            <Checkbox
              class="mr-2"
              id="rememberCheck"
              v-model="checked"
              :binary="true"
            ></Checkbox>
            <label class="text-sm" for="rememberCheck">Save password</label>
          </div>
          <a class="ml-5 text-sm text-right text-primary cursor-pointer"
            >Forgot password?</a
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  layout: 'default',
  data() {
    return {
      sdt: '',
      otp: '',
      checked: true,
    }
  },
  methods: {
    async sendOtp() {
      try {
        let result = await this.$axios.post(
          process.env.BASE_URL + '/api/SendOtp?phone=' + this.sdt,
          {}
        )
        console.log('Yêu cầu thành công')
      } catch (error) {
        console.log(error)
        if (error.response) {
          console.log('Lỗi Bad Request:', error.response.data)
          // Xử lý lỗi 400 ở đây
        } else {
          console.error('Lỗi khi gửi yêu cầu:', error)
        }
      }
    },
    async callLogin() {
      try {
        let result = await this.$axios.$post(
          process.env.BASE_URL +
            '/api/VerifyOtp?phone=' +
            this.sdt +
            '&otp=' +
            this.otp,
          {}
        )
        console.log(result)
        if (result.status === 200) {
          console.log('Yêu cầu thành công' + result.data)
          // redirect('/homepage')
        }
        console.log(result.status)
        //this.$router.push('/')
      } catch (error) {
        if (error.response) {
          console.log('Lỗi Bad Request:', error.response.data)
          // Xử lý lỗi 400 ở đây
        } else {
          console.error('Lỗi khi gửi yêu cầu:', error)
        }
      }
    },
  },
}
</script>
<style lang='sass'>
.logo-block
  height: 54px
  img
    height: 100%
</style>
