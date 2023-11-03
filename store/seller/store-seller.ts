import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { $api, PathBind } from '~/utils'
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
    }

    @Action({ rawError: true })
    async actGetSeller(params: any): Promise<string | undefined> {
        try {
            const url = PathBind.transform(this.context, StoreCategory.STATE_URL.GET_SELLER, { userId: params?.userId })
            return await $api.get(url)
        } catch (error) { }
    }

    @Action({ rawError: true })
    async actCreateSeller(params: any): Promise<string | undefined> {
        try {
            const url = PathBind.transform(this.context, StoreCategory.STATE_URL.CREATE_SELLER)
            return await $api.post(url, params)
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
