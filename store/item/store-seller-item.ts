import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { $api, PathBind } from '~/utils'
@Module({
  stateFactory: true,
  namespaced: true
})

export default class StoreItemApplication extends VuexModule {
  private static readonly STATE_URL = {
    GET_ITEMAPPLICATION: '/Seller/ItemApplication/:itemId',
    UPDATE_ITEMAPPLICATION: '/Seller/ItemApplication/:itemId',
    DELETE_ITEMAPPLICATION: '/Seller/ItemApplication/:itemId',
    SEARCH_ITEMAPPLICATION: '/Seller/ItemApplication?pageNum=:pageNum&pageSize=:pageSize&search=:search&category=:category&status=:status',
    ADD_ITEMAPPLICATION: '/Seller/ItemApplication',
    GET_ITEMAPPLICATION_IMAGE: '/Seller/ItemApplication/:itemId/Images/:imgId',
    ADD_ITEMAPPLICATION_IMAGE: '/Seller/ItemApplication/:itemId/Images',
    ADD_ITEMAPPLICATION_THUMBNAIL: '/Seller/ItemApplication/:itemId/Thumbnail',
    DELETE_ITEMAPPLICATION_IMAGE: '/Seller/ItemApplication/:itemId/Images',
    PATCH_ITEMAPPLICATION_REAUCTION: '/Seller/ItemApplication/:itemId/ReAuction',
  }
  @Action({ rawError: true })
  async actSearchItemApplication(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.SEARCH_ITEMAPPLICATION,
        { pageNum: params?.pageNum, pageSize: params?.pageSize, search: params?.search, category: params?.category, status: params?.status, })
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
  async actAddItemApplication(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.ADD_ITEMAPPLICATION)
      return await $api.post(url, params)
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
  async actDeleteItemApplication(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.DELETE_ITEMAPPLICATION, { itemId: params?.itemId })
      return await $api.delete(url)
    } catch (error) { }
  }
  @Action({ rawError: true })
  async actGetItemApplicationImage(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.GET_ITEMAPPLICATION_IMAGE, { itemId: params?.itemId, imgId: params?.imgId })
      return await $api.get(url, { responseType: 'blob' })
    } catch (error) { }
  }
  @Action({ rawError: true })
  async actAddItemApplicationImage(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.ADD_ITEMAPPLICATION_IMAGE, { itemId: params.itemId })
      return await $api.post(url, params.formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    } catch (error) { }
  }
  @Action({ rawError: true })
  async actAddItemApplicationThumbnail(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.ADD_ITEMAPPLICATION_THUMBNAIL, { itemId: params.itemId })
      return await $api.patch(url, params.formData, {
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
  async actPatchItemApplicationReAuction(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItemApplication.STATE_URL.PATCH_ITEMAPPLICATION_REAUCTION, { itemId: params?.itemId })
      return await $api.patch(url)
    } catch (error) { }
  }

}
