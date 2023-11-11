import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { $api, PathBind } from '~/utils'
@Module({
  stateFactory: true,
  namespaced: true
})

export default class StoreItemApplication extends VuexModule {
  private static readonly STATE_URL = {
    GET_ITEMAPPLICATION: '/Expert/ItemApplication/:itemId',
    UPDATE_ITEMAPPLICATION: '/Expert/ItemApplication/:itemId',
    SEARCH_ITEMAPPLICATION: '/Expert/ItemApplication',
    GET_ITEMAPPLICATION_IMAGE: '/Expert/ItemApplication/:itemId/Images/:imgId',
    ASSIGN_ITEMAPPLICATION: '/Expert/ItemApplication/:itemId/Assign',
    UNASSIGN_ITEMAPPLICATION: '/Expert/ItemApplication/:itemId/Unassign',
    ACCEPT_ITEMAPPLICATION: '/Expert/ItemApplication/:itemId/Accept',
    REJECT_ITEMAPPLICATION: '/Expert/ItemApplication/:itemId/Reject',
  }

  @Action({ rawError: true })
  async actSearchItemApplication(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.SEARCH_ITEMAPPLICATION)
      return await $api.get(url)
    } catch (error) { }
  }

  @Action({ rawError: true })
  async actGetItemApplication(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.GET_ITEMAPPLICATION, { itemId: params?.itemId })
      return await $api.get(url)
    } catch (error) { }
  }

  @Action({ rawError: true })
  async actUpdateItemApplication(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.UPDATE_ITEMAPPLICATION, { itemId: params?.itemId })
      return await $api.put(url, params)
    } catch (error) { }
  }

  @Action({ rawError: true })
  async actGetItemApplicationImage(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.GET_ITEMAPPLICATION_IMAGE, { itemId: params?.itemId, imgId: params?.imgId })
      return await $api.get(url,{responseType: 'blob'})
    } catch (error) { }
  }

  @Action({ rawError: true })
  async actAssignItemApplication(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.ASSIGN_ITEMAPPLICATION, { itemId: params?.itemId })
      return await $api.put(url)
    } catch (error) { }
  }

  @Action({ rawError: true })
  async actUnassignItemApplication(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.UNASSIGN_ITEMAPPLICATION, { itemId: params?.itemId })
      return await $api.put(url)
    } catch (error) { }
  }

  @Action({ rawError: true })
  async actAcceptItemApplication(params: any): Promise<string | undefined> {
      try {
          const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.ACCEPT_ITEMAPPLICATION, { itemId: params?.itemId })
          return await $api.patch(url, params.content)
      } catch (error) { }
  }

  @Action({ rawError: true })
  async actRejectItemApplication(params: any): Promise<string | undefined> {
      try {
          const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.REJECT_ITEMAPPLICATION, { itemId: params?.itemId })
          return await $api.patch(url, params.content)
      } catch (error) { }
  }

}
