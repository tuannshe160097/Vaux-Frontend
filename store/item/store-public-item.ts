import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { $api, PathBind } from '~/utils'
@Module({
  stateFactory: true,
  namespaced: true
})

export default class StoreItem extends VuexModule {
  private static readonly STATE_URL = {
    GET_ITEM: '/Item?pageNum=:pageNum&pageSize=:pageSize&search=:search&category=:category',
  }

  @Action({ rawError: true })
  async actGetItem(param: any): Promise<any | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItem.STATE_URL.GET_ITEM, param)
      return await $api.get(url)
    } catch (error) {}
  }

}
