import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { $api, PathBind } from '~/utils'
@Module({
  stateFactory: true,
  namespaced: true
})

export default class StoreAuction extends VuexModule {
  private static readonly STATE_URL = {
    GET_AUCTION: '/Mod/Auction',
    CREATE_AUCTION: '/Mod/Auction',
    DELETE_AUCTION: '/Mod/Auction/:id',
    GET_DETAIL_AUCTION: '/Mod/Auction/:id',
    UPDATE_AUCTION: '/Mod/Auction/:id',
  }


  @Action({ rawError: true })
  async actGetAuction(params?: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreAuction.STATE_URL.GET_AUCTION)
     return await $api.get(url) 
    } catch (error) {}
  }

  @Action({ rawError: true })
  async actCreateAuction(param?: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreAuction.STATE_URL.CREATE_AUCTION)
      return await $api.post(url, param)
    } catch (error) {}
  }

  @Action({ rawError: true })
  async actDeleteAuction(param: { id: number }): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreAuction.STATE_URL.DELETE_AUCTION, param)
     return await $api.delete(url) 
    } catch (error) {}
  }

  @Action({ rawError: true })
  async actGetAuctionById(param: { id: number }): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreAuction.STATE_URL.GET_DETAIL_AUCTION, param)
     return await $api.get(url) 
    } catch (error) {}
  }

  @Action({ rawError: true })
  async actUpdateAuction(param: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreAuction.STATE_URL.UPDATE_AUCTION, param)
      return await $api.put(url, param)
    } catch (error) {}
  }
}