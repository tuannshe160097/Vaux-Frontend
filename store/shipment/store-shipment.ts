import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { $api, PathBind } from '~/utils'
@Module({
  stateFactory: true,
  namespaced: true
})

export default class StoreShipmentMod extends VuexModule {
  private static readonly STATE_URL = {
    CHANGE_STATUS: '/Mod/Shipment/:id/ChangeStatus',
  }


  @Action({ rawError: true })
  async actChangeShipmentStatus(params?: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreShipmentMod.STATE_URL.CHANGE_STATUS, params)
      return await $api.patch(url, params?.status, {
        headers: { 'Content-Type': 'application/json' }
      }) 
    } catch (error) {}
  }
}
