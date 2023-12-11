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
              <h2 class="form-title">Đăng ký</h2>
              <form class="signin-form">
                <div class="form-group mb-3">
                  <label class="block label" for="inputName">Họ và tên<span class="text-danger">*</span></label>
                  <InputText class="form-control w-full" id="inputName" type="text" v-model="name"
                    placeholder="Họ và tên" />
                </div>
                <div class="form-group mb-3">
                  <label class="block label" for="inputSdt">Số điện thoại<span class="text-danger">*</span></label>
                  <InputText v-model="sdt" type="text" class="w-full form-control" placeholder="Số điện thoại" />
                </div>
                <div class="form-group" for="inputPassword">
                  <Button class="p-button-outlined form-control btn btn-primary1 px-3" @click="sendOtp">
                    Gửi mã OTP
                  </Button>
                </div>
                <div class="form-group mb-3">
                  <label class="block label">Nhập mã OTP</label>
                  <InputText id="inputPassword" v-model="otp" type="text" class="w-full form-control"
                    placeholder="Mã OTP" />
                </div>
                <div class="form-group">
                  <Button type="button" class="form-control btn btn-primary submit px-3" @click="callRegister">
                    Đăng ký
                  </Button>
                </div>
                <div class="form-group d-md-flex">
                  <div class="w-50 text-md-right">
                    <a href="/authen/login">Bạn đã có tài khoản?</a>
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
const nsStoreUser = namespace('user-auth/store-user')

@Component({
  middleware: ['interception'],
})
class Register extends Vue {
  sdt: string = ''
  otp: string = ''
  name: string = ''
  checked: boolean = true

  @nsStoreUser.Action
  actRegister!: (params: { phone: string; name: string }) => Promise<any>

  @nsStoreUser.Action
  actVerify!: (params: any) => Promise<string>

  async sendOtp() {
    if (this.sdt && this.name) {
      if (!this.validPhoneNumber(this.sdt)) {
        this.$store.commit('commons/store-error/setError', 'Số điện thoại không đúng định dạng')
        return
      }
      if (!this.validName(this.name)) {
        this.$store.commit('commons/store-error/setError', 'Họ và tên dài quá 40 ký tự')
        return
      }
      const params = {
        name: this.name,
        phone: this.sdt,
      }
      const result = await this.actRegister(params)
      if (result !== undefined && result !== null) {
        this.$toast.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Đăng ký thành công. Vui lòng xác nhận OTP để tiếp tục',
          life: 5000,
        })
      }
    } else {
      this.$store.commit(
        'commons/store-error/setError',
        'Vui lòng nhập Họ và tên và Số điện thoại'
      )
    }
  }

  async callRegister() {
    const params = {
      otp: this.otp,
      phone: this.sdt,
    }
    let result = await this.actVerify(params)
    if (result !== undefined && result !== null) {
      this.$toast.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Xác nhận thành công. Vui lòng đăng nhập lại để tiếp tục',
        life: 5000,
      })
      this.$router.push('/authen/login')
    }
  }
  validPhoneNumber(phoneNumber: string): boolean {
    const regex = /^(0|\+84)(9[0-9]|8[0-9]|7[0-9]|5[0-9]|3[0-9]|2[0-9]|6[0-9]|4[0-9]|1[0-9])+([0-9]{7})\b/;
    return regex.test(phoneNumber);
  }
  validName(name: string): boolean {
    return name.length <= 40;
  }
}
export default Register
</script>

<style lang='sass' scoped>
.signup-form
  padding: 60px 0
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
  background-image: url('assets/images/IMG_3322.png')
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
</style>