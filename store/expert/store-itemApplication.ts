import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { $api, PathBind } from '~/utils'
@Module({
  stateFactory: true,
  namespaced: true
})

export default class StoreItemApplication extends VuexModule {
  private static readonly STATE_URL = {
    SEARCH_ITEMAPPLICATION: '/Expert/ItemApplication?pageNum=:pageNum&pageSize=:pageSize&search=:search',
    GET_ITEMAPPLICATION: 'Expert/ItemApplication/:itemId',
    ADD_CATEGORY: '/Mod/Category',
    UPDATE_CATEGORY: '/Mod/Category/:id',
    DELETE_CATEGORY: '/Mod/Category/:id',
  }


  @Action({ rawError: true })
  async actGetItemApplication(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.SEARCH_ITEMAPPLICATION,{ pageNum: params?.pageNum, pageSize: params?.pageSize, search: params?.search})
     return await $api.get(url, params) 
    } catch (error) {}
  }

  @Action({ rawError: true })
  async actGetUser(params: any): Promise<string | undefined> {
      try {
          const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.GET_ITEMAPPLICATION, { userId: params?.userId })
          return await $api.get(url)
      } catch (error) { }
  }

  @Action({ rawError: true })
  async actAddCategory(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.ADD_CATEGORY)
      return await $api.post(url, params) 
    } catch (error) {}
  }

  @Action({ rawError: true })
  async actUpdateCategory(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.UPDATE_CATEGORY, { id: params?.id })
     return await $api.put(url, params) 
    } catch (error) {}
  }
  //Lta xoa 
  @Action({ rawError: true })
  async actDeleteCategory(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.DELETE_CATEGORY, { id: params?.id })
     return await $api.delete(url, params) 
    } catch (error) {}
  }
}
