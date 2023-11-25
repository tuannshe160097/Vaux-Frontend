import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { $api, PathBind } from '~/utils'
@Module({
  stateFactory: true,
  namespaced: true
})

export default class StoreItemApplication extends VuexModule {
  private static readonly STATE_URL = {
    GET_ITEMAPPLICATION_LIST: '/Mod/Item?pageNum=:pageNum&pageSize=:pageSize',//&search=:search&category=:category&status=:status
    UPDATE_ITEMAPPLICATION: '/Mod/ItemApplication/:itemId',
    CHANGE_STATUS_ITEMAPPLICATION: '/Mod/ItemApplication/:itemId/ChangeStatus',
    ADD_ITEMAPPLICATION_IMAGE: '/Mod/ItemApplication/:itemId/Images',
    DELETE_ITEMAPPLICATION_IMAGE: '/Mod/ItemApplication/:itemId/Images',
    UNASSIGN_ITEMAPPLICATION: '/Mod/ItemApplication/:itemId/Unassign',
  }

  @Action({ rawError: true })
  async actGetItemList(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.GET_ITEMAPPLICATION_LIST,
        { pageNum: params?.pageNum, pageSize: params?.pageSize })//, search: params?.search, category: params?.category, status: params?.status
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
  async actChangeStatusItemApplication(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.UPDATE_ITEMAPPLICATION, { itemId: params?.itemId })
      return await $api.patch(url, params)
    } catch (error) { }
  }

  @Action({ rawError: true })
  async actAddItemApplicationImage(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.UPDATE_ITEMAPPLICATION, { itemId: params?.itemId })
      return await $api.post(url, params, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    } catch (error) { }
  }

  @Action({ rawError: true })
  async actDeleteItemApplicationImage(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.UPDATE_ITEMAPPLICATION, { itemId: params?.itemId })
      return await $api.delete(url, params.imgIds)
    } catch (error) { }
  }

  @Action({ rawError: true })
  async actUnassignItemApplication(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.UNASSIGN_ITEMAPPLICATION, { itemId: params?.itemId })
      return await $api.put(url)
    } catch (error) { }
  }

}
