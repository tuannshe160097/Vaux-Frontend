import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { $api, PathBind } from '~/utils'
@Module({
  stateFactory: true,
  namespaced: true
})

export default class StoreItemApplication extends VuexModule {
  private static readonly STATE_URL = {
    GET_ITEMAPPLICATION_LIST: '/Mod/Item?pageNum=:pageNum&pageSize=:pageSize&search=:search&category=:category',
    GET_ITEMAPPLICATION: '/Mod/Item/:itemId',
    UPDATE_ITEMAPPLICATION: '/Mod/Item/:itemId',
    CHANGE_STATUS_ITEMAPPLICATION: '/Mod/Item/:itemId/ChangeStatus',
    ADD_ITEMAPPLICATION_IMAGE: '/Mod/Item/:itemId/Images',
    DELETE_ITEMAPPLICATION_IMAGE: '/Mod/Item/:itemId/Images',
    UNASSIGN_ITEMAPPLICATION: '/Mod/Item/:itemId/Unassign',
  }

  @Action({ rawError: true })
  async actGetItemList(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.GET_ITEMAPPLICATION_LIST, params)
      return await $api.get(url)
    } catch (error) {
      console.log(error);
    }
  }
  @Action({ rawError: true })
  async actGetItem(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.GET_ITEMAPPLICATION, { itemId: params.itemId })
      return await $api.get(url)
    } catch (error) {
      console.log(error);
    }
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
      const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.CHANGE_STATUS_ITEMAPPLICATION, { itemId: params?.itemId })
      return await $api.patch(url, params)
    } catch (error) { }
  }

  @Action({ rawError: true })
  async actAddItemApplicationImage(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.ADD_ITEMAPPLICATION_IMAGE, { itemId: params?.itemId })
      debugger
      return await $api.post(url, params.formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    } catch (error) { }
  }

  @Action({ rawError: true })
  async actDeleteItemApplicationImage(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.DELETE_ITEMAPPLICATION_IMAGE, { itemId: params?.itemId })
      return await $api.delete(url, {
        data: params?.images,
        headers: { 'Content-Type': 'application/json' }
      })
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
