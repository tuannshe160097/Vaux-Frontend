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
        CREATE_SELLER: '/Seller/Application/Create',
        GET_SELLER: '/Seller/Application/Get/:userId',
        APPROVE_SELLER: '/Seller/Application/Approve/:applicationId',
        DENY_SELLER: '/Seller/Application/Deny/:applicationId',

        BASE_URL_PROV: 'https://provinces.open-api.vn',
        GET_PROVINCE: '/p/',
    }

    @Action({ rawError: true })
    async actGetSeller(params: any): Promise<string | undefined> {
        try {
            const url = PathBind.transform(this.context, StoreCategory.STATE_URL.GET_SELLER, { userId: params?.userId })
            return await $api.get(url)
        } catch (error) { }
    }
    @Action({ rawError: true })
    async actGetCategory(params: any): Promise<string | undefined> {
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
    async actCreateSeller(formData: any): Promise<string | undefined> {
        try {
            const url = PathBind.transform(this.context, StoreCategory.STATE_URL.CREATE_SELLER)
            //formData
            const response: any = await $api.post(url, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            return response
        } catch (error) { }
    }
    @Action({ rawError: true })
    async actApproveSeller(params: any): Promise<string | undefined> {
        try {
            const url = PathBind.transform(this.context, StoreCategory.STATE_URL.APPROVE_SELLER, { applicationId: params?.applicationId })
            return await $api.patch(url, params)
        } catch (error) { }
    }
    @Action({ rawError: true })
    async actDenySeller(params: any): Promise<string | undefined> {
        try {
            const url = PathBind.transform(this.context, StoreCategory.STATE_URL.DENY_SELLER, { applicationId: params?.applicationId })
            return await $api.patch(url, params)
        } catch (error) { }
    }
}
