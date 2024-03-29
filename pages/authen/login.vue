<template>
  <div class="wrapper">
    <div class="container main">
      <div class="grid row">
        <div class="md:col-6 side-image">
          <div class="signup-image"></div>
        </div>
        <div class="md:col-6 right">
          <div class="signup-content">
            <a class="no-underline" href="/homepage">
              <span class="material-icons vertical-align-bottom">
                arrow_back
              </span>Trở lại trang chủ</a>
            <div class="signup-form">
              <h2 class="form-title">Đăng nhập</h2>
              <form class="signin-form">
                <form @submit.prevent="sendOtp">
                  <div class="form-group mb-3">
                    <label class="block label">Số điện thoại</label>
                    <InputText v-model="sPhoneNumber" type="text" class="w-full form-control"
                      placeholder="Số điện thoại" />
                  </div>
                  <div class="form-group">
                    <Button type="submit" label="Send OTP" class="p-button-outlined form-control btn btn-primary1 px-3">
                      Gửi mã OTP
                    </Button>
                  </div>
                </form>
                <div class="form-group mb-3">
                  <label class="block label">Nhập mã OTP</label>
                  <div class="input-wrap">
                    <InputText v-model="sOTP" type="text" class="w-full form-control" placeholder="Mã OTP" />
                    <small v-if="isCountingDown" class="form-text otp-count ng-binding">{{ countdown | fancyTimeFormat
                    }}</small>
                  </div>
                </div>
                <div class="form-group">
                  <Button type="button" class="form-control btn btn-primary submit px-3" @click="callLogin">
                    Đăng nhập
                  </Button>
                </div>
                <div class="form-group d-md-flex">
                  <div class="w-50 text-md-right">
                    <a href="/authen/register">Bạn chưa có tài khoản?</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { OTP_CONFIG } from '~/utils/constants/common'
const nsStoreUser = namespace('user-auth/store-user')

@Component({
  middleware: ['interception'],
})
class Login extends Vue {

  sPhoneNumber: string = ''
  sOTP: string | null = null
  isCountingDown: boolean = false
  countdown: any = OTP_CONFIG.COUNT_DOWN

  @nsStoreUser.Action
  actSendOTPCode!: (param: any) => Promise<string>
  @nsStoreUser.Action
  actVerify!: (param: any) => Promise<string>
  async mounted() {
    try {
      await this.$recaptcha.init()
    } catch (e) {
      console.error(e);
    }
  }
  beforeDestroy() {
    this.$recaptcha.destroy()
  }
  async sendOtp() {
    let token
    try {
      token = await this.$recaptcha.execute('login')
      console.log('ReCaptcha token:', token)
    } catch (error) {
      console.log('get recaptcha token error: ', error)
    }
    this.sPhoneNumber = this.sPhoneNumber.trim()
    if (this.sPhoneNumber) {
      if (!this.validPhoneNumber(this.sPhoneNumber)) {
        this.$store.commit('commons/store-error/setError', 'Số điện thoại không đúng định dạng')
        return
      }
      if (this.countdown && this.isCountingDown) {
        this.$store.commit('commons/store-error/setError', 'OTP có thể được cấp lại sau ít phút')
        return
      }
      this.sOTP = await this.actSendOTPCode({ phone: this.sPhoneNumber, reCaptcha: token })
      if (this.sOTP !== undefined && this.sOTP !== null) {
        setTimeout(() => {
          this.startCountdown();
        }, 500);
        this.$toast.add({ severity: 'info', summary: 'Thông báo', detail: 'Mã OTP đã được gửi tới số điện thoại của bạn', life: 10000 })
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
      return
    } else if (this.sOTP === null || this.sOTP.trim() == '') {
      this.$store.commit('commons/store-error/setError', 'Vui lòng nhập OTP')
      return
    }
    if (!this.validPhoneNumber(this.sPhoneNumber)) {
      this.$store.commit('commons/store-error/setError', 'Số điện thoại không đúng định dạng')
      return
    }

    try {
      //const response: any = await this.$auth.loginWith('local', { headers: { 'Content-Type': 'multipart/form-body' } }, { data: { phone: this.sPhoneNumber, otp: this.sOTP } })

      const response: any = await this.actVerify({ phone: this.sPhoneNumber, otp: this.sOTP })
      if (response) {
        this.$auth.login()
        console.log("login1")
        this.$cookies.set('auth._token', response.jwt)
        console.log("login2")
        this.$cookies.set('auth.role', response.role.id)
        console.log("login3")
        await this.$auth.setUserToken(response.jwt)
        console.log("login4")
        this.$router.push('/')
      }
    } catch (error) {
      console.log("loginerror", error)
      this.$store.commit('commons/store-error/setError', 'Vui lòng hoàn thành các bước để đăng nhập')
    }

  }

  startCountdown() {
    this.isCountingDown = true;
    let interval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(interval);
        this.isCountingDown = false;
        this.countdown = OTP_CONFIG.COUNT_DOWN;
      }
    }, 1000);
  }
  validPhoneNumber(phoneNumber: string): boolean {
    // Sử dụng regex để kiểm tra số điện thoại ở Việt Nam
    const regex = /^(0|\+84)(9[0-9]|8[0-9]|7[0-9]|5[0-9]|3[0-9]|2[0-9]|6[0-9]|4[0-9]|1[0-9])+([0-9]{7})\b/;

    return regex.test(phoneNumber);
  }
}

export default Login
</script>

<style lang='sass' scoped>
.signup-form
  padding: 90px 0
  margin-left: 75px
  margin-right: 75px
  padding-left: 34px

.signup-image
  margin-top: 30px

.wrapper
  background: #ececec
  padding: 0 20px 0 20px

.main
  display: flex
  justify-content: center
  align-items: center
  min-height: 100vh

.side-image
  background-image: url('assets/images/IMG_3321.png')
  max-width: 100%
  height: 550px
  background-repeat: no-repeat
  background-size: 100% 100%

.row
  width: 900px
  height: 550px
  border-radius: 10px
  background: #fff
  padding: 0px
  box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.2)

.text
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)

.right
  display: flex
  justify-content: center
  align-items: center
  position: relative

.signin
  text-align: center
  font-size: small
  margin-top: 25px

.form-group
  margin-bottom: 1rem

*, *::before, *::after
  -webkit-box-sizing: border-box
  box-sizing: border-box

div
  display: block

.form-group .label
  font-size: 12px
  text-transform: uppercase
  letter-spacing: 1px
  color: #000
  font-weight: 700


label
  display: inline-block
  margin-bottom: 0.5rem
  cursor: default
.d-md-flex
  display: -webkit-box !important
  display: -ms-flexbox !important
  display: flex !important

.form-control
  height: 48px
  background: rgba(0, 0, 0, 0.05)
  color: #000
  font-size: 16px
  border-radius: 50px
  -webkit-box-shadow: none
  box-shadow: none
  border: 1px solid transparent
  padding-left: 20px
  padding-right: 20px
  -webkit-transition: all 0.2s ease-in-out
  -o-transition: all 0.2s ease-in-out
  transition: all 0.2s ease-in-out

  display: block
  width: 270px
  height: calc(1.5em + 0.75rem + 5px)
  padding: 0.375rem 0.75rem
  font-size: 1rem
  font-weight: 400
  line-height: 1.5

.btn.btn-primary
  border: 1px solid #f35588
  color: #fff
  background: var(--primary-color) !important
.btn.btn-primary1
  border: 1px solid #B0926A
  color: black
  background: white !important

.input-wrap
  position: relative

  .form-text
    position: absolute
    right: 10px
    top: 50%
    margin-top: -9px
    font-size: 13px
    color: #000
</style>