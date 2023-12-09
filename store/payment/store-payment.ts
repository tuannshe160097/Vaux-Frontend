import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { $api, PathBind } from '~/utils'
@Module({
  stateFactory: true,
  namespaced: true
})

export default class StorePayment extends VuexModule {
  private static readonly STATE_URL = {
    GET_PAYMENT: '/ItemPayment?pageNum=:pageNum&pageSize=:pageSize',
    PAY_EXPERT: '/ItemPayment/:id/PayExpert',
    PAY_SELLER: '/ItemPayment/:id/PaySeller',
  }


  @Action({ rawError: true })
  async actGetPayment(params?: any): Promise<string | undefined> {
    try {
      let stateUrl = StorePayment.STATE_URL.GET_PAYMENT
      if (params?.completed !== undefined && params?.completed !== null && params?.completed !== '') {
        stateUrl = `${StorePayment.STATE_URL.GET_PAYMENT}&completed=${params?.completed === 2}`
      }
      const url = PathBind.transform(this.context, stateUrl, params)
      return await $api.get(url) 
    } catch (error) {}
  }

  @Action({ rawError: true })
  async actUpdatePayment(param: any): Promise<string | undefined> {
    try {
      const typePayment = param?.type === 1 ? StorePayment.STATE_URL.PAY_EXPERT : StorePayment.STATE_URL.PAY_SELLER
      const url = PathBind.transform(this.context, typePayment, param)
      return await $api.patch(url)
    } catch (error) {}
  }
}
