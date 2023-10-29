import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import { User } from '~/models/User'
import { $api, PathBind } from '~/utils'
@Module({
  stateFactory: true,
  namespaced: true
})

export default class StoreUser extends VuexModule {
  private static readonly STATE_URL = {
    SEND_OTP: '/SendOtp?phone=:phone',
    USER_GET: '/Profile',
  }

  public user: User.Model | undefined

  @Mutation
  setUser(user: User.Model) {
    this.user = user
  }


  @Action({ rawError: true })
  async actSendOTPCode(phone: string): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreUser.STATE_URL.SEND_OTP, { phone })
      return await $api.post(url) 
    } catch (error) {}
  }

  @Action({ commit: 'setUser', rawError: true })
  async actGetUserDetail(): Promise<User.Model | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreUser.STATE_URL.USER_GET)
      const response: any = await $api.get(url)
      return response
    } catch (error) {}
  }
}
