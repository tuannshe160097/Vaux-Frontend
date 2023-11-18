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
        GET_SELLER: '/Seller/Application/Get/:appId',
        GET_IMAGE_SELLER: '/Seller/Application/Get/Image/:imageId',
        SEARCH_SELLERS: '/Seller/Application/GetAll?pageNum=:pageNum&pageSize=:pageSize&search=:search&status=:status',
        APPROVE_SELLER: '/Seller/Application/Approve?applicationId=:applicationId',
        DENY_SELLER: '/Seller/Application/Deny?applicationId=:applicationId',

        BASE_URL_PROV: 'https://provinces.open-api.vn',
        GET_PROVINCE: '/p/',
    }

    @Action({ rawError: true })
    async actGetSeller(params: any): Promise<string | undefined> {
        try {
            const url = PathBind.transform(this.context, StoreCategory.STATE_URL.GET_SELLER, { appId: params?.appId })
            return await $api.get(url)
        } catch (error) { }
    }
    @Action({ rawError: true })
    async actGetImageSeller(imageId: any): Promise<string | undefined> {
        try {
            const url = PathBind.transform(this.context, StoreCategory.STATE_URL.GET_IMAGE_SELLER, { imageId: imageId })
            return await $api.get(url, { responseType: 'blob' })
        } catch (error) { }
    }
    @Action({ rawError: true })
    async actGetAllSeller(params: any): Promise<string | undefined> {
        try {
            const url = PathBind.transform(this.context, StoreCategory.STATE_URL.SEARCH_SELLERS,
                { pageNum: params?.pageNum, pageSize: params?.pageSize, search: params?.search, status: params?.status })
            return await $api.get(url, params)
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
            return await $api.patch(url, params.reason, {
                headers: { 'Content-Type': 'application/json' }
            })
        } catch (error) { }
    }
    @Action({ rawError: true })
    async actDenySeller(params: any): Promise<string | undefined> {
        try {
            const url = PathBind.transform(this.context, StoreCategory.STATE_URL.DENY_SELLER, { applicationId: params?.applicationId })
            return await $api.patch(url, params.reason, {
                headers: { 'Content-Type': 'application/json' }
            })
        } catch (error) { }
    }
}
