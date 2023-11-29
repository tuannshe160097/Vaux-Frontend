import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { $api, PathBind } from '~/utils'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    isThirdPartyAPI?: boolean;
}
@Module({
    stateFactory: true,
    namespaced: true
})

export default class StoreCategory extends VuexModule {
    private static readonly STATE_URL = {
        BASE_URL_PROV: 'https://api.vietqr.io/',
        GET_BANKS: '/v2/banks',
    }
    @Action({ rawError: true })
    async actGetBanksList(): Promise<string | undefined> {
        //thirdParty
        const config: CustomAxiosRequestConfig = {
            baseURL: StoreCategory.STATE_URL.BASE_URL_PROV,
            isThirdPartyAPI: true,
        };
        try {
            const url = PathBind.transform(this.context, StoreCategory.STATE_URL.GET_BANKS)
            return await $api.get(url, config)
        } catch (error) { }
    }
}
