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
        BASE_URL_PROV: 'https://provinces.open-api.vn',
        GET_PROVINCE: '/p/',
        GET_DISTRICT: '/p/:cityId?depth=2',
        GET_STREET: '/d/:districtId?depth=2',
    }
    @Action({ rawError: true })
    async actGetCity(): Promise<string | undefined> {
        //thirdParty
        const config: CustomAxiosRequestConfig = {
            baseURL: StoreCategory.STATE_URL.BASE_URL_PROV,
            isThirdPartyAPI: true,
        };
        try {
            const url = PathBind.transform(this.context, StoreCategory.STATE_URL.GET_PROVINCE)
            return await $api.get(url, config)
        } catch (error) { }
    }
    @Action({ rawError: true })
    async actGetDistrict(params: any): Promise<string | undefined> {
        //thirdParty
        const config: CustomAxiosRequestConfig = {
            baseURL: StoreCategory.STATE_URL.BASE_URL_PROV,
            isThirdPartyAPI: true,
        };
        try {
            const url = PathBind.transform(this.context, StoreCategory.STATE_URL.GET_DISTRICT, { cityId: params?.cityId })
            const response : any =  await $api.get(url, config)
            return response
        } catch (error) { }
    }
    @Action({ rawError: true })
    async actGetStreet(params: any): Promise<string | undefined> {
        //thirdParty
        const config: CustomAxiosRequestConfig = {
            baseURL: StoreCategory.STATE_URL.BASE_URL_PROV,
            isThirdPartyAPI: true,
        };
        try {
            const url = PathBind.transform(this.context, StoreCategory.STATE_URL.GET_STREET, { districtId: params?.districtId })
            const response : any =  await $api.get(url, config)
            return response
        } catch (error) { }
    }
}
