import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import { User } from '~/models/User'
import { $api, PathBind } from '~/utils'
@Module({
  stateFactory: true,
  namespaced: true
})

export default class StoreUser extends VuexModule {
  private static readonly STATE_URL = {
    SEND_OTP: '/SendOtp?phone=:phone&token=:token',
    USER_GET: '/Profile',
    REGISTER: '/Register',
    VERIFY: '/VerifyOtp?phone=:phone&otp=:otp',
    SELLERAPP: '/Seller/Application/GetByUserId/:userId',
  }

  public user: User.Model | undefined

  @Mutation
  setUser(user: User.Model) {
    this.user = user
  }


  @Action({ rawError: true })
  async actSendOTPCode(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreUser.STATE_URL.SEND_OTP, { phone : params.phone, token : params.token })
      return await $api.post(url)
    } catch (error) { }
  }

  @Action({ commit: 'setUser', rawError: true })
  async actGetUserDetail(): Promise<User.Model | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreUser.STATE_URL.USER_GET)
      const response: any = await $api.get(url)
      return response
    } catch (error) { }
  }
  @Action({ rawError: true })
  async actRegister(params: any): Promise<any | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreUser.STATE_URL.REGISTER)
      return await $api.post(url, params)
    } catch (error) {

    }
  }
  @Action({ rawError: true })
  async actVerify(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreUser.STATE_URL.VERIFY, { phone: params?.phone, otp: params?.otp })
      return await $api.post(url)
    } catch (error) {

    }
  }
  @Action({ rawError: true })
  async actUpdateProfile(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreUser.STATE_URL.USER_GET)
      const ret:any =  await $api.put_response(url, params)
      return ret
    } catch (error) {
    }
  }
  @Action({ rawError: true })
  async actGetSellerApplication(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreUser.STATE_URL.SELLERAPP, { userId: params?.userId })
      const response: any = await $api.get(url)
      return response
    } catch (error) { }
  }

}
