import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { $api, PathBind } from '~/utils'
@Module({
  stateFactory: true,
  namespaced: true
})

export default class StoreOrderMod extends VuexModule {
  private static readonly STATE_URL = {
    GET_MOD_ORDER: '/Mod/Order?pageNum=:pageNum&pageSize=:pageSize&search=:search',
    GET_DETAIL_ORDER: '/Mod/Order/:id',
  }


  @Action({ rawError: true })
  async actGetOrderMod(params?: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreOrderMod.STATE_URL.GET_MOD_ORDER, params)
      return await $api.get(url) 
    } catch (error) {}
  }

  @Action({ rawError: true })
  async actGetOrderById(param: { id: number }): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreOrderMod.STATE_URL.GET_DETAIL_ORDER, param)
      return await $api.get(url) 
    } catch (error) {}
  }
}
