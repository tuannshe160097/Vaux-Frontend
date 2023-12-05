<template>
    <section class="surface-0 flex align-items-center justify-content-center p-2">
        <div class="box-page-container flex flex-column container w-full">
            <Breadcrumb :home="home" :model="breads" />
            <div class="card-body my-3">
                <h2 class="font-bold text-brown">Danh sách đơn hàng</h2>
                <TabView class="tabview-custom">
                    <TabPanel>
                        <template #header>
                            <i class="pi pi-calendar mr-2"></i>
                            <span>Tất cả</span>
                        </template>
                        <div class="grid nested-grid formgrid">
                            <div class="col-12">
                                <InputText class="w-21rem h-3rem" type="text" placeholder="Tìm theo tên sản phẩm"
                                    v-model="search">
                                </InputText>
                                <Button label="Tìm kiếm" style="height: 36px" @click="getShipmentsAll()"
                                    class="w-full max-w-6rem" />
                            </div>
                            <div class="field col-12">
                                <div class=" mt-4 grid nested-grid border-1 border-solid surface-border border-round"
                                    v-for="shipment in AllShipments" :key="shipment.id" :item="shipment">
                                    <div class="col-12 flex justify-content-between"
                                        style="border-bottom: 1px dashed rgba(0,0,0,.09)">
                                        <span class="text-brown">
                                            <span class="material-icons vertical-align-bottom mr-2">person</span>
                                            {{ shipment.sellerName }}
                                        </span>
                                        <span v-if="shipment.status == 0" class="text-success">Đơn hàng đang được người bán
                                            chuẩn bị</span>
                                        <span v-if="shipment.status == 1" class="text-success">Đơn hàng đang được giao tới
                                            bạn</span>
                                        <span v-if="shipment.status == 2" class="text-success">Đơn hàng đã được giao thành
                                            công</span>
                                    </div>
                                    <div class="grid nested-grid item p-2 border-10 w-full" v-for="item in shipment.items"
                                        :key="item.id" :item="item">
                                        <div
                                            class="col flex align-items-center white-space-nowrap overflow-hidden text-overflow-ellipsis">
                                            <img :src="getImageUrl(item.id, item.thumbnailId)" alt="image"
                                                style="object-fit: contain; width: 50px; height: 50px;" />
                                            <div
                                                class="ml-2 white-space-nowrap overflow-hidden text-overflow-ellipsis font-medium">
                                                <span class="">{{ item.name }}</span>
                                            </div>
                                            <br />
                                            <div class="block">{{ item.catName }}</div>
                                        </div>
                                        <div class="col-fixed flex align-items-center justify-content-end">
                                            <span class="">{{ formatNumber(item.price) }}</span>
                                        </div>
                                    </div>
                                    <div class="grid nested-grid item p-2 border-10 w-full justify-content-end"
                                        style="border-top: 1px dashed rgba(0,0,0,.09)">
                                        <div class="col-fixed ">
                                            Thành tiền:
                                        </div>
                                        <div class="col-fixed flex align-items-center justify-content-end text-brown">
                                            <h5 class="m-0">{{ formatNumber(shipment.itemCost + shipment.shippingCost) }}
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <template #header>
                            <i class="pi pi-user"></i>
                            <span>Đang lấy hàng</span>
                        </template>
                        <div class="grid formgrid">
                            <div class="field col-12">
                            </div>
                            <div class="field col-12">
                                <div class="grid nested-grid" v-for="shipment in PendingShipments" :key="shipment.id"
                                    :item="shipment">
                                    <div class="col-12" style="border-bottom: 1px dashed rgba(0,0,0,.09)">
                                        <span class="text-brown">
                                            <span class="material-icons vertical-align-bottom mr-2">person</span>
                                            {{ shipment.sellerName }}
                                        </span>
                                    </div>
                                    <div class="grid nested-grid item p-2 border-10 w-full" v-for="item in shipment.items"
                                        :key="item.id" :item="item">
                                        <div
                                            class="col-6 flex align-items-center white-space-nowrap overflow-hidden text-overflow-ellipsis">
                                            <img :src="getImageUrl(item.id, item.thumbnailId)" alt="image"
                                                style="object-fit: contain; width: 50px; height: 50px;" />
                                            <span
                                                class="ml-2 white-space-nowrap overflow-hidden text-overflow-ellipsis font-medium">
                                                <span class="">{{ item.name }}</span>
                                            </span>
                                        </div>
                                        <div class="col-3 flex align-items-center font-light">
                                            <span class="">{{ item.catName }}</span>
                                        </div>
                                        <div class="col-3 flex align-items-center justify-content-end">
                                            <span class="">{{ formatNumber(item.price) }}</span>
                                        </div>
                                    </div>
                                    <div class="grid nested-grid item p-2 border-10 w-full"
                                        style="border-top: 1px dashed rgba(0,0,0,.09)">
                                        <div class="col-3 col-offset-6">
                                            Phí vận chuyển:
                                        </div>
                                        <div class="col-3 flex align-items-center justify-content-end">
                                            <span class="">{{ formatNumber(shipment.shippingCost) }}</span>
                                        </div>
                                    </div>
                                    <div class="grid nested-grid item p-2 border-10 w-full">
                                        <div class="col-3 col-offset-6">
                                            Tổng số tiền:
                                        </div>
                                        <div class="col-3 flex align-items-center justify-content-end text-brown">
                                            <h5 class="">{{ formatNumber(shipment.itemCost + shipment.shippingCost) }}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <template #header>
                            <i class="pi pi-user"></i>
                            <span>Đang giao hàng</span>
                        </template>
                        <div class="grid formgrid">
                            <div class="field col-12">
                            </div>
                            <div class="field col-12">
                                <div class="grid nested-grid" v-for="shipment in ShippingShipments" :key="shipment.id"
                                    :item="shipment">
                                    <div class="col-12" style="border-bottom: 1px dashed rgba(0,0,0,.09)">
                                        <span class="text-brown">
                                            <span class="material-icons vertical-align-bottom mr-2">person</span>
                                            {{ shipment.sellerName }}
                                        </span>
                                    </div>
                                    <div class="grid nested-grid item p-2 border-10 w-full" v-for="item in shipment.items"
                                        :key="item.id" :item="item">
                                        <div
                                            class="col-6 flex align-items-center white-space-nowrap overflow-hidden text-overflow-ellipsis">
                                            <img :src="getImageUrl(item.id, item.thumbnailId)" alt="image"
                                                style="object-fit: contain; width: 50px; height: 50px;" />
                                            <span
                                                class="ml-2 white-space-nowrap overflow-hidden text-overflow-ellipsis font-medium">
                                                <span class="">{{ item.name }}</span>
                                            </span>
                                        </div>
                                        <div class="col-3 flex align-items-center font-light">
                                            <span class="">{{ item.catName }}</span>
                                        </div>
                                        <div class="col-3 flex align-items-center justify-content-end">
                                            <span class="">{{ formatNumber(item.price) }}</span>
                                        </div>
                                    </div>
                                    <div class="grid nested-grid item p-2 border-10 w-full"
                                        style="border-top: 1px dashed rgba(0,0,0,.09)">
                                        <div class="col-3 col-offset-6">
                                            Phí vận chuyển:
                                        </div>
                                        <div class="col-3 flex align-items-center justify-content-end">
                                            <span class="">{{ formatNumber(shipment.shippingCost) }}</span>
                                        </div>
                                    </div>
                                    <div class="grid nested-grid item p-2 border-10 w-full">
                                        <div class="col-3 col-offset-6">
                                            Tổng số tiền:
                                        </div>
                                        <div class="col-3 flex align-items-center justify-content-end text-brown">
                                            <h5 class="">{{ formatNumber(shipment.itemCost + shipment.shippingCost) }}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <template #header>
                            <i class="pi pi-user"></i>
                            <span>Đã giao hàng</span>
                        </template>
                        <div class="grid formgrid">
                            <div class="field col-12">
                            </div>
                            <div class="field col-12">
                                <div class="grid nested-grid" v-for="shipment in ShippedShipments" :key="shipment.id"
                                    :item="shipment">
                                    <div class="col-12" style="border-bottom: 1px dashed rgba(0,0,0,.09)">
                                        <span class="text-brown">
                                            <span class="material-icons vertical-align-bottom mr-2">person</span>
                                            {{ shipment.sellerName }}
                                        </span>
                                    </div>
                                    <div class="grid nested-grid item p-2 border-10 w-full" v-for="item in shipment.items"
                                        :key="item.id" :item="item">
                                        <div
                                            class="col-6 flex align-items-center white-space-nowrap overflow-hidden text-overflow-ellipsis">
                                            <img :src="getImageUrl(item.id, item.thumbnailId)" alt="image"
                                                style="object-fit: contain; width: 50px; height: 50px;" />
                                            <span
                                                class="ml-2 white-space-nowrap overflow-hidden text-overflow-ellipsis font-medium">
                                                <span class="">{{ item.name }}</span>
                                            </span>
                                        </div>
                                        <div class="col-3 flex align-items-center font-light">
                                            <span class="">{{ item.catName }}</span>
                                        </div>
                                        <div class="col-3 flex align-items-center justify-content-end">
                                            <span class="">{{ formatNumber(item.price) }}</span>
                                        </div>
                                    </div>
                                    <div class="grid nested-grid item p-2 border-10 w-full"
                                        style="border-top: 1px dashed rgba(0,0,0,.09)">
                                        <div class="col-3 col-offset-6">
                                            Phí vận chuyển:
                                        </div>
                                        <div class="col-3 flex align-items-center justify-content-end">
                                            <span class="">{{ formatNumber(shipment.shippingCost) }}</span>
                                        </div>
                                    </div>
                                    <div class="grid nested-grid item p-2 border-10 w-full">
                                        <div class="col-3 col-offset-6">
                                            Tổng số tiền:
                                        </div>
                                        <div class="col-3 flex align-items-center justify-content-end text-brown">
                                            <h5 class="">{{ formatNumber(shipment.itemCost + shipment.shippingCost) }}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    </section>
</template>
  
<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { User } from '~/models/User'
const nsStoreItem = namespace('item/store-seller-item')
const nsCategory = namespace('category/store-category')
const nsStoreUser = namespace('user-auth/store-user')
const nsStoreOrder = namespace('order/store-order')
const nsStoreShipment = namespace('shipment/store-shipment')

@Component({
    middleware: ['authenticate'],
    layout: 'public',
    // meta: {
    //   role: [3, 2]
    // }
})
class CreateItem extends Vue {
    boxData: any[] = []

    totalWaiting: number = 0

    //-----Pagination---------------------------------
    pPagenum: number = 1
    pPageSize: number = 5
    totalRecords: number = 0
    blockedTable: boolean = false

    //---------------------------------------
    home = { icon: 'pi pi-home', to: '/homepage' }
    breads = [
        { label: 'Kênh bán' },
    ]
    isSeller: boolean = false
    search: string | null = null
    //----------------------------------------
    oCategories: Array<any> | null = null
    AllShipments: any[] = []
    PendingShipments: any[] = []
    ShippingShipments: any[] = []
    ShippedShipments: any[] = []

    @nsStoreUser.State('user')
    user!: User.Model | undefined
    @nsCategory.Action
    actGetAllCategory!: () => Promise<any>
    @nsStoreOrder.Action
    actGetAllOrder!: (params: any) => Promise<any>
    @nsStoreOrder.Action
    actConfirmPayment!: (params: any) => Promise<any>
    @nsStoreShipment.Action
    actGetShipments!: (params: any) => Promise<any>

    async created() {
        const vnp_ResponseCode = Array.isArray(this.$route.query.vnp_ResponseCode)
            ? this.$route.query.vnp_ResponseCode[0]
            : this.$route.query.vnp_ResponseCode
        if (vnp_ResponseCode) {
            const params = {
                vnp_Amount: Array.isArray(this.$route.query.vnp_Amount)
                    ? this.$route.query.vnp_Amount[0]
                    : this.$route.query.vnp_Amount,
                vnp_BankCode: Array.isArray(this.$route.query.vnp_BankCode)
                    ? this.$route.query.vnp_BankCode[0]
                    : this.$route.query.vnp_BankCode,
                vnp_BankTranNo: Array.isArray(this.$route.query.vnp_BankTranNo)
                    ? this.$route.query.vnp_BankTranNo[0]
                    : this.$route.query.vnp_BankTranNo,
                vnp_CardType: Array.isArray(this.$route.query.vnp_CardType)
                    ? this.$route.query.vnp_CardType[0]
                    : this.$route.query.vnp_CardType,
                vnp_OrderInfo: Array.isArray(this.$route.query.vnp_OrderInfo)
                    ? this.$route.query.vnp_OrderInfo[0]
                    : this.$route.query.vnp_OrderInfo,
                vnp_PayDate: Array.isArray(this.$route.query.vnp_PayDate)
                    ? this.$route.query.vnp_PayDate[0]
                    : this.$route.query.vnp_PayDate,
                vnp_ResponseCode: Array.isArray(this.$route.query.vnp_ResponseCode)
                    ? this.$route.query.vnp_ResponseCode[0]
                    : this.$route.query.vnp_ResponseCode,
                vnp_TmnCode: Array.isArray(this.$route.query.vnp_TmnCode)
                    ? this.$route.query.vnp_TmnCode[0]
                    : this.$route.query.vnp_TmnCode,
                vnp_TransactionNo: Array.isArray(this.$route.query.vnp_TransactionNo)
                    ? this.$route.query.vnp_TransactionNo[0]
                    : this.$route.query.vnp_TransactionNo,
                vnp_TransactionStatus: Array.isArray(this.$route.query.vnp_TransactionStatus)
                    ? this.$route.query.vnp_TransactionStatus[0]
                    : this.$route.query.vnp_TransactionStatus,
                vnp_TxnRef: Array.isArray(this.$route.query.vnp_TxnRef)
                    ? this.$route.query.vnp_TxnRef[0]
                    : this.$route.query.vnp_TxnRef,
                vnp_SecureHash: Array.isArray(this.$route.query.vnp_SecureHash)
                    ? this.$route.query.vnp_SecureHash[0]
                    : this.$route.query.vnp_SecureHash,
            }
            this.confirmPayment(params)
        }
    }
    async mounted() {
        this.isSeller = true
        const response1 = await this.actGetAllCategory()
        this.oCategories = response1.records
        this.getShipmentsAll()
        this.getShipmentsPending()
        this.getShipmentsShipping()
        this.getShipmentsShipped()
    }
    async getShipmentsAll(pageNum: number = this.pPagenum) {
        const params = {
            pageNum: pageNum,
            pageSize: this.pPageSize || 5,
            search: this.search ? this.search : '',
            status: '',
        }
        const response = await this.actGetShipments(params)
        console.log(response)
        if (response && response.records.length > 0) {
            this.AllShipments = []
            for (let i = 0; i < response.records.length; i++) {
                if (response.records[i].items.length <= 0) {
                    continue
                }
                let shipment: any = {
                    id: response.records[i].id,
                    sellerName: response.records[i].seller.name,
                    itemCost: response.records[i].itemCost,
                    shippingCost: response.records[i].shippingCost,
                    status: response.records[i].status,
                    items: [],
                }
                for (let j = 0; j < response.records[i].items.length; j++) {
                    shipment.items.push({
                        id: response.records[i].items[j].id,
                        name: response.records[i].items[j].name,
                        catName: response.records[i].items[j].category.name,
                        price: response.records[i].items[j].highestBid.amount,
                        thumbnailId: response.records[i].items[j].thumbnailId,
                    })
                }
                this.AllShipments.push(shipment)
            }
        }
    }
    async getShipmentsPending(pageNum: number = this.pPagenum) {
        const params = {
            pageNum: pageNum,
            pageSize: this.pPageSize || 5,
            search: '',
            status: 0,
        }
        const response = await this.actGetShipments(params)
        if (response && response.records.length > 0) {
            for (let i = 0; i < response.records.length; i++) {
                if (response.records[i].items.length <= 0) {
                    continue
                }
                let shipment: any = {
                    id: response.records[i].id,
                    sellerName: response.records[i].seller.name,
                    itemCost: response.records[i].itemCost,
                    shippingCost: response.records[i].shippingCost,
                    items: [],
                }
                for (let j = 0; j < response.records[i].items.length; j++) {
                    shipment.items.push({
                        id: response.records[i].items[j].id,
                        name: response.records[i].items[j].name,
                        catName: response.records[i].items[j].category.name,
                        price: response.records[i].items[j].highestBid.amount,
                        thumbnailId: response.records[i].items[j].thumbnailId,
                    })
                }
                this.PendingShipments.push(shipment)
            }
        }
    }
    async getShipmentsShipping(pageNum: number = this.pPagenum) {
        const params = {
            pageNum: pageNum,
            pageSize: this.pPageSize || 5,
            search: '',
            status: 1,
        }
        const response = await this.actGetShipments(params)
        if (response && response.records.length > 0) {
            for (let i = 0; i < response.records.length; i++) {
                if (response.records[i].items.length <= 0) {
                    continue
                }
                let shipment: any = {
                    id: response.records[i].id,
                    sellerName: response.records[i].seller.name,
                    itemCost: response.records[i].itemCost,
                    shippingCost: response.records[i].shippingCost,
                    items: [],
                }
                for (let j = 0; j < response.records[i].items.length; j++) {
                    shipment.items.push({
                        id: response.records[i].items[j].id,
                        name: response.records[i].items[j].name,
                        catName: response.records[i].items[j].category.name,
                        price: response.records[i].items[j].highestBid.amount,
                        thumbnailId: response.records[i].items[j].thumbnailId,
                    })
                }
                this.ShippingShipments.push(shipment)
            }
        }
    }
    async getShipmentsShipped(pageNum: number = this.pPagenum) {
        const params = {
            pageNum: pageNum,
            pageSize: this.pPageSize || 5,
            search: '',
            status: 2,
        }
        const response = await this.actGetShipments(params)
        if (response && response.records.length > 0) {
            for (let i = 0; i < response.records.length; i++) {
                if (response.records[i].items.length <= 0) {
                    continue
                }
                let shipment: any = {
                    id: response.records[i].id,
                    sellerName: response.records[i].seller.name,
                    itemCost: response.records[i].itemCost,
                    shippingCost: response.records[i].shippingCost,
                    items: [],
                }
                for (let j = 0; j < response.records[i].items.length; j++) {
                    shipment.items.push({
                        id: response.records[i].items[j].id,
                        name: response.records[i].items[j].name,
                        catName: response.records[i].items[j].category.name,
                        price: response.records[i].items[j].highestBid.amount,
                        thumbnailId: response.records[i].items[j].thumbnailId,
                    })
                }
                this.ShippedShipments.push(shipment)
            }
        }
    }
    getImageUrl(itemId: any, imgId: any) {
        try {
            if (itemId == null || imgId == null) return ''
            return process.env.BE_API_URL + '/api/item/' + itemId + '/images/' + imgId
        } catch (error) {
            this.$store.commit('commons/store-error/setError', "Error fetching or converting image")
            console.error("Error fetching or converting image:", error);
            return '';
        }
    }
    formatNumber(number: any) {
        const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return "₫" + formattedNumber;
    }
    async confirmPayment(param: any) {
        const response = await this.actConfirmPayment(param)
        if (response) {
            this.$toast.add({
                severity: 'success',
                summary: 'Thành công',
                detail: 'Đã thanh toán thành công',
                life: 3000,
            })
        }
    }
}
export default CreateItem
</script>
  
<style lang="sass" scoped>
  .card-control
    display: block
    background: $white
    font-weight: 1
    font-size: 0.875rem
    line-height: 1
    color: #69707a
    background-clip: padding-box
    border: 1px solid #c5ccd6
    appearance: none
    border-radius: 0.35rem
  
  .card-header
    padding: 1.2rem 1.35rem
    margin-bottom: 0
    background-color: rgba(33, 40, 50, 0.03)
    border-bottom: 1px solid rgba(33, 40, 50, 0.125)
  
  .element
    @include overflow-ellipsis(400px)
  .p-orderlist .p-orderlist-controls 
    display: none
  </style>
  