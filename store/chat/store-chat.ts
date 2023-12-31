import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { $api, PathBind } from '~/utils'
@Module({
  stateFactory: true,
  namespaced: true
})

export default class StoreChatApplication extends VuexModule {
  private static readonly STATE_URL = {
    GET_CHAT_HISTORY: '/Chat/:itemId',//&search=:search&category=:category&status=:status
    SEND_CHAT: '/Chat',
    GET_IMAGE: '/Chat/:itemId/Image/:imageId'
  }

  @Action({ rawError: true })
  async actGetChatHistory(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreChatApplication.STATE_URL.GET_CHAT_HISTORY, { itemId: params?.itemId })
      return await $api.get(url)
    } catch (error) { }
  }
  @Action({ rawError: true })
  async actSendChat(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreChatApplication.STATE_URL.SEND_CHAT)
      return await $api.post(url, params.formdata, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    } catch (error) { }
  }
  @Action({ rawError: true })
  async actGetImageChat(params: any): Promise<string | undefined> {
    try {
      const url = PathBind.transform(this.context, StoreChatApplication.STATE_URL.GET_IMAGE, { itemId: params.itemId, imageId: params.imageId })
      return await $api.get(url, { responseType: 'blob' })
    } catch (error) { }
  }
}
