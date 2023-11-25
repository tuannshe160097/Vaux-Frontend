import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { $api, PathBind } from '~/utils'
@Module({
  stateFactory: true,
  namespaced: true
})

export default class StoreItem extends VuexModule {
  private static readonly STATE_URL = {
    GET_ITEM: '/Item/:itemId',
    GET_ITEM_LIST: '/Item?pageNum=:pageNum&pageSize=:pageSize&search=:search&category=:category',
    GET_ITEM_APPROVED: '/Item/Approved',
    GET_ITEM_COMMENT: '/Item/:itemId/Comments?pageNum=:pageNum&pageSize=:pageSize',
    POST_ITEM_COMMENT: '/Item/:itemId/Comments',
    GET_ITEM_IMAGE: '/Item/:itemId/Images/:imageId',
    GET_ITEM_BIDS: '/Item/:itemId/Bids',
    POST_ITEM_BID: '/Item/:itemId/Bids',
  }
  
  @Action({ rawError: true })
  async actGetItem(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItem.STATE_URL.GET_ITEM, { itemId: params?.itemId })
      return await $api.get(url)
    } catch (error) { }
  }
  @Action({ rawError: true })
  async actGetItemApproved(): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItem.STATE_URL.GET_ITEM_APPROVED)
      return await $api.get(url)
    } catch (error) { }
  }
  @Action({ rawError: true })
  async actGetItemList(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItem.STATE_URL.GET_ITEM_LIST,
        { pageNum: params?.pageNum, pageSize: params?.pageSize, search: params?.search, category: params?.category })
      return await $api.get(url)
    } catch (error) { }
  }
  @Action({ rawError: true })
  async actGetItemComments(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItem.STATE_URL.POST_ITEM_COMMENT,
        { pageNum: params?.pageNum, pageSize: params?.pageSize, itemId: params?.itemId })
      return await $api.get(url)
    } catch (error) { }
  }
  @Action({ rawError: true })
  async actAddItemComment(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItem.STATE_URL.POST_ITEM_COMMENT, { itemId: params?.itemId })
      return await $api.post(url, params)
    } catch (error) { }
  }
  @Action({ rawError: true })
  async actGetItemBids(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItem.STATE_URL.GET_ITEM_BIDS, { itemId: params?.itemId })
      return await $api.get(url)
    } catch (error) { }
  }
  @Action({ rawError: true })
  async actAddItemBids(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItem.STATE_URL.POST_ITEM_BID, { itemId: params?.itemId })
      return await $api.post(url, params)
    } catch (error) { }
  }
  @Action({ rawError: true })
  async actGetItemImage(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreItem.STATE_URL.GET_ITEM_IMAGE, { itemId: params?.itemId, imgId: params?.imgId })
      return await $api.get(url, { responseType: 'blob' })
    } catch (error) { }
  }

}

