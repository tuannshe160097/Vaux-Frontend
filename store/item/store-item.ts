import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { $api, PathBind } from '~/utils'
@Module({
  stateFactory: true,
  namespaced: true
})

export default class StoreItem extends VuexModule {
  private static readonly STATE_URL = {
    GET_ITEM_APPROVED: '/Item/Approved',
  }

  @Action({ rawError: true })
  async actGetItemApproved(): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItem.STATE_URL.GET_ITEM_APPROVED)
     return await $api.get(url) 
    } catch (error) {}
  }

}
