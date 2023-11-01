import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { $api, PathBind } from '~/utils'
@Module({
  stateFactory: true,
  namespaced: true
})

export default class StoreProvince extends VuexModule {
  private static readonly STATE_URL = {
    GET_CITYS: 'https://provinces.open-api.vn/api/p/',
    GET_DISTRICTS: 'https://provinces.open-api.vn/api/p/:cityId/?depth=2',
    GET_STREETS: 'https://provinces.open-api.vn/api/d/:districtId/?depth=2',
  }


//   @Action({ rawError: true })
//   async actGetCategory(params: any): Promise<string | undefined> {
//     try {
//       const url = PathBind.transform(this.context, StoreCategory.STATE_URL.GET_CATEGORY,{ pageNum: params?.pageNum, pageSize: params?.pageSize, search: params?.search})
//      return await $api.get(url, params) 
//     } catch (error) {}
//   }

}
