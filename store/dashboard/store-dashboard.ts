import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { $api, PathBind } from '~/utils'
@Module({
  stateFactory: true,
  namespaced: true
})

export default class StoreDashboard extends VuexModule {
  private static readonly STATE_URL = {
    GET_ACCOUNTS: '/Mod/Dashboard/Accounts?from=:from&to=:to',
  }


  @Action({ rawError: true })
  async actGetAccounts(params?: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreDashboard.STATE_URL.GET_ACCOUNTS, params)
      return await $api.get(url) 
    } catch (error) {}
  }
}
