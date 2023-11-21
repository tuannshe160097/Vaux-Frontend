<template>
  <div class="wrapper">
    <div class="container main">
      <div class="grid row">
        <div class="md:col-6 side-image">
          <div class="signup-image"></div>
        </div>
        <div class="md:col-6 right">
          <div class="signup-content">
            <div class="signup-form">
              <h2 class="form-title">Đăng nhập</h2>
              <form class="signin-form">
                <div class="form-group mb-3">
                  <label class="block label">Số điện thoại</label>
                  <InputMask
                    v-model="sPhoneNumber"
                    mask="9999999999"
                    class="w-full form-control"
                    slot-char=""
                    placeholder="Số điện thoại"
                  />
                </div>
                <div class="form-group">
                  <Button
                    label="Send OTP"
                    class="p-button-outlined form-control btn btn-primary1 px-3"
                    @click="sendOtp"
                  >
                    Gửi mã OTP
                  </Button>
                </div>
                <div class="form-group mb-3">
                  <label class="block label">Nhập mã OTP</label>
                  <div class="input-wrap">
                    <InputText
                      v-model="sOTP"
                      type="text"
                      class="w-full form-control"
                      placeholder="Mã OTP"
                    />
                    <small v-if="isCountingDown" class="form-text otp-count ng-binding">{{ countdown | fancyTimeFormat }}</small>
                  </div>
                </div>
                <div class="form-group">
                  <Button
                    type="button"
                    class="form-control btn btn-primary submit px-3"
                    @click="callLogin"
                  >
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
  actSendOTPCode!: (phone: string) => Promise<string>

  async sendOtp() {
    if (this.sPhoneNumber) {
      if (this.countdown && this.isCountingDown) {
        this.$store.commit('commons/store-error/setError', 'OTP có thể được cấp lại sau ít phút')
        return
      }
      this.sOTP = await this.actSendOTPCode(this.sPhoneNumber)
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

}

export default Login
</script>

<style lang='sass' scoped>

.signup-content
  padding: 100px 0

.signup-form
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
  background-image: url('assets/images/IMG_3326.png')
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