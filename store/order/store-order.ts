import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { $api, PathBind } from '~/utils'
@Module({
    stateFactory: true,
    namespaced: true
})

export default class StoreItem extends VuexModule {
    private static readonly STATE_URL = {
        GET_ALL_ORDER: '/Order',
        GET_ORDER: '/Order?completed=:completed',
        GET_ORDER_BY_ID: '/Order/:orderId',
        POST_ORDER: '/Order',
        GET_ORDER_PAYMENT_LINK: '/Order/:orderId/Pay',
        PATCH_CONFIRM_PAYMENT: '/Order/:orderId/ConfirmPayment',
    }

    @Action({ rawError: true })
    async actGetAllOrder(params: any): Promise<string | undefined> {
        try {
            const url = PathBind.transform(this.context, StoreItem.STATE_URL.GET_ALL_ORDER)
            return await $api.get(url)
        } catch (error) { }
    }
    @Action({ rawError: true })
    async actGetOrder(params: any): Promise<string | undefined> {
        try {
            const url = PathBind.transform(this.context, StoreItem.STATE_URL.GET_ORDER, { completed: params.completed })
            return await $api.get(url)
        } catch (error) { }
    }
    @Action({ rawError: true })
    async actGetOrderById(params: any): Promise<string | undefined> {
        try {
            const url = PathBind.transform(this.context, StoreItem.STATE_URL.GET_ORDER_BY_ID, { orderId: params.orderId })
            return await $api.get(url)
        } catch (error) { }
    }
    @Action({ rawError: true })
    async actPostOrder(params: any): Promise<string | undefined> {
        try {
            const url = PathBind.transform(this.context, StoreItem.STATE_URL.POST_ORDER)
            return await $api.post(url, params.orderIdList)
        } catch (error) { }
    }
    @Action({ rawError: true })
    async actGetOrderPaymentLink(params: any): Promise<string | undefined> {
        try {
            const url = PathBind.transform(this.context, StoreItem.STATE_URL.GET_ORDER_PAYMENT_LINK, { orderId: params.orderId })
            return await $api.get(url)
        } catch (error) { }
    }
    @Action({ rawError: true })
    async actConfirmPayment(params: any): Promise<string | undefined> {
        try {
            const url = PathBind.transform(this.context, StoreItem.STATE_URL.PATCH_CONFIRM_PAYMENT, { orderId: params.orderId })
            return await $api.patch(url)
        } catch (error) { }
    }
}

