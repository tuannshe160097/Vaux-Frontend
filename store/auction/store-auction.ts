import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { $api, PathBind } from '~/utils'
@Module({
  stateFactory: true,
  namespaced: true
})

export default class StoreAuction extends VuexModule {
  private static readonly STATE_URL = {
    GET_AUCTION: '/Mod/Auction?pageNum=:pageNum&pageSize=:pageSize&from=:from&to=:to&status=:status',
    CREATE_AUCTION: '/Mod/Auction',
    DELETE_AUCTION: '/Mod/Auction/:id',
    GET_DETAIL_AUCTION: '/Mod/Auction/:id',
    UPDATE_AUCTION: '/Mod/Auction/:id',
    FORCE_START_AUCTION: '/Mod/Auction/:id/ForceStart',
    FORCE_END_AUCTION: '/Mod/Auction/:id/ForceEnd',
  }


  @Action({ rawError: true })
  async actGetAuction(params?: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreAuction.STATE_URL.GET_AUCTION, params)
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

  @Action({ rawError: true })
  async actForceStartAuction(param: { id: number }): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreAuction.STATE_URL.FORCE_START_AUCTION, param)
      return await $api.patch(url) 
    } catch (error) {}
  }

  @Action({ rawError: true })
  async actForceEndAuction(param: { id: number }): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreAuction.STATE_URL.FORCE_END_AUCTION, param)
      return await $api.patch(url) 
    } catch (error) {}
  }
}
