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
          <Button label="Send Otp" @click="sendOtp"></Button>
        </span>
        <Button
          class="bg-primary w-full p-3 mb-3"
          type="button"
          label="Đăng ký"
          @click="callRegister"
        ></Button>
        <div class="flex align-items-center justify-content-center mb-5">
          <a class="ml-5 text-sm text-center text-primary cursor-pointer"
            >Đã có tài khoản?</a
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Register',
  layout: 'default',
  data() {
    return {
      sdt: '',
      otp: '',
      name: '',
      checked: true,
    }
  },
  methods: {
    async sendOtp() {
      try {
        // Gửi yêu cầu POST đến server
        let result = await this.$axios.post(
          `${process.env.BASE_URL}/api/Register`, // Sử dụng template string để tạo URL
          {
            phone: this.sdt,
            name: this.name,
          }
        )

        if (result.status === 200) {
          console.log('Yêu cầu thành công')
        }
      } catch (error) {
        if (error.response) {
          console.log('Lỗi Bad Request:', error.response.data)
          // Xử lý lỗi 400 ở đây
        } else {
          console.error('Lỗi khi gửi yêu cầu:', error)
        }
      }
    },
    async callRegister() {
      try {
        let result = await axios.post(
          'https://localhost:6565/api/VerifyOtp?phone=' +
            this.sdt +
            '&otp=' +
            this.otp,
          {}
        )
        console.log(result)
        if (result.status === 200) {
          console.log('Yêu cầu thành công' + result.data)
          this.$router.push('/authen/login')
        }
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
