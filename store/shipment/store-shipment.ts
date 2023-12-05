import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { $api, PathBind } from '~/utils'
@Module({
  stateFactory: true,
  namespaced: true
})

export default class StoreShipmentMod extends VuexModule {
  private static readonly STATE_URL = {
    CHANGE_STATUS: '/Mod/Shipment/:id/ChangeStatus',
    BUYER_GET: '/Shipment?pageNum=:pageNum&pageSize=:pageSize&status=:status&search=:search',
  }


  @Action({ rawError: true })
  async actGetShipments(params?: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreShipmentMod.STATE_URL.BUYER_GET, params)
      return await $api.get(url, params) 
    } catch (error) {}
  }
  @Action({ rawError: true })
  async actChangeShipmentStatus(params?: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreShipmentMod.STATE_URL.CHANGE_STATUS, params)
      return await $api.patch(url, params) 
    } catch (error) {}
  }
}
