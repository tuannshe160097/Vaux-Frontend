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
        DELETE_ORDER: '/Order/:orderId',
        POST_ORDER_PAYMENT_LINK: '/Order/:orderId/Pay',
        PATCH_CONFIRM_PAYMENT: '/Order/:orderId/ConfirmPayment?'
            + 'vnp_Amount=:vnp_Amount'
            + '&vnp_BankCode=:vnp_BankCode'
            + '&vnp_BankTranNo=:vnp_BankTranNo'
            + '&vnp_CardType=:vnp_CardType'
            + '&vnp_OrderInfo=:vnp_OrderInfo'
            + '&vnp_PayDate=:vnp_PayDate'
            + '&vnp_ResponseCode=:vnp_ResponseCode'
            + '&vnp_TmnCode=:vnp_TmnCode'
            + '&vnp_TransactionNo=:vnp_TransactionNo'
            + '&vnp_TransactionStatus=:vnp_TransactionStatus'
            + '&vnp_SecureHash=:vnp_SecureHash'
            + '&vnp_TxnRef=:vnp_TxnRef'
        ,
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
    async actDeleteOrder(params: any): Promise<string | undefined> {
        try {
            const url = PathBind.transform(this.context, StoreItem.STATE_URL.DELETE_ORDER, { orderId: params.orderId })
            return await $api.delete(url)
        } catch (error) { }
    }
    @Action({ rawError: true })
    async actPostOrderPaymentLink(params: any): Promise<string | undefined> {
        try {
            const url = PathBind.transform(this.context, StoreItem.STATE_URL.POST_ORDER_PAYMENT_LINK, { orderId: params.orderId })
            return await $api.post(url, params)
        } catch (error) { }
    }
    @Action({ rawError: true })
    async actConfirmPayment(params: any): Promise<string | undefined> {
        try {
            debugger
            const url = PathBind.transform(this.context, StoreItem.STATE_URL.PATCH_CONFIRM_PAYMENT, params)
            return await $api.patch(url)
        } catch (error) { }
    }
}

