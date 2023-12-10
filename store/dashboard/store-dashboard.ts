import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { $api, PathBind } from '~/utils'
@Module({
  stateFactory: true,
  namespaced: true
})

export default class StoreDashboard extends VuexModule {
  private static readonly STATE_URL = {
    GET_ACCOUNTS: '/Mod/Dashboard/Accounts?from=:from&to=:to',
    GET_SOLD_ITEMS: '/Mod/Dashboard/SoldItems?from=:from&to=:to',
    GET_UNSOLD_ITEMS: '/Mod/Dashboard/UnsoldItems?from=:from&to=:to',
    GET_UNPAID_ITEMS: '/Mod/Dashboard/UnpaidItems?from=:from&to=:to',
    GET_EXPERT_CONTRIBUTION: '/Mod/Dashboard/ExpertContribution?from=:from&to=:to',
    GET_AUCTION_REPORT: '/Mod/Dashboard/AuctionReport?from=:from&to=:to',
  }


  @Action({ rawError: true })
  async actGetAccounts(params?: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreDashboard.STATE_URL.GET_ACCOUNTS, params)
      return await $api.get(url) 
    } catch (error) {}
  }

  @Action({ rawError: true })
  async actGetSoldItems(params?: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreDashboard.STATE_URL.GET_SOLD_ITEMS, params)
      return await $api.get(url) 
    } catch (error) {}
  }

  @Action({ rawError: true })
  async actGetUnsoldItems(params?: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreDashboard.STATE_URL.GET_UNSOLD_ITEMS, params)
      return await $api.get(url) 
    } catch (error) {}
  }

  @Action({ rawError: true })
  async actGetUnpaidItems(params?: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreDashboard.STATE_URL.GET_UNPAID_ITEMS, params)
      return await $api.get(url) 
    } catch (error) {}
  }

  @Action({ rawError: true })
  async actGetExpertContribution(params?: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreDashboard.STATE_URL.GET_EXPERT_CONTRIBUTION, params)
      return await $api.get(url) 
    } catch (error) {}
  }

  @Action({ rawError: true })
  async actGetAuctionReport(params?: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreDashboard.STATE_URL.GET_AUCTION_REPORT, params)
      return await $api.get(url) 
    } catch (error) {}
  }
}
