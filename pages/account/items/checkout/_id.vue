<template>
    <section class="surface-0 flex align-items-center justify-content-center p-2">
        <div class="box-page-container flex flex-column container w-full">
            <div class="card-body my-3">
                <div class="grid">
                    <div class="field col-12">
                        <h4 class="font-bold text-brown mb-0">
                            <span class="material-icons vertical-align-bottom mr-2">
                                location_on
                            </span>Địa chỉ nhận hàng
                        </h4>
                    </div>
                    <div class="col-12">
                        <div class="border-1 border-solid surface-border ">
                            <div class="envelope"></div>
                            <div class="col-12 grid p-3">
                                <div class="align-self-center col-6 field mb-0">
                                    <label class="">Họ và tên người nhận<span class="text-danger">*</span></label>
                                    <InputText :class="{ 'p-invalid': fields.name.error }" class="w-100 line-height-1"
                                        v-model="name" />
                                </div>
                                <div class="align-self-center col-6 field mb-0">
                                    <label class="">Số điện thoại người nhận<span class="text-danger">*</span></label>
                                    <InputText :class="{ 'p-invalid': fields.phone.error }" class="w-100 line-height-1"
                                        v-model="phone" />
                                </div>
                                <div class="align-self-center col-4 field mb-0">
                                    <label class="">Thành phố<span class="text-danger">*</span></label>
                                    <Dropdown :class="{ 'p-invalid': fields.city.error }" class="w-100 line-height-1"
                                        v-model="selectedCity" :options="oCitys" :filter="true" filterPlaceholder="Tìm kiếm"
                                        optionLabel="name" placeholder="-Chọn Thành phố-" @change="onSelectCity()" />
                                </div>
                                <div class="align-self-center col-4 field mb-0">
                                    <label class="">Quận/ Huyện<span class="text-danger">*</span></label>
                                    <Dropdown :class="{ 'p-invalid': fields.district.error }" class="w-100 line-height-1"
                                        v-model="selectedDistrict" :options="oDistricts" :filter="true"
                                        filterPlaceholder="Tìm kiếm" optionLabel="name" placeholder="-Chọn Quận/Huyện-"
                                        @change="getStreet()" />
                                </div>
                                <div class="align-self-center col-4 field mb-0">
                                    <label class="">Phố/ Phường<span class="text-danger">*</span></label>
                                    <Dropdown :class="{ 'p-invalid': fields.street.error }" class="w-100 line-height-1"
                                        v-model="street" :options="oStreets" :filter="true" filterPlaceholder="Tìm kiếm"
                                        optionLabel="name" placeholder="-Chọn Phố/Phường-" optionValue="value" />
                                </div>
                                <div class="align-self-center col-12 field mb-0">
                                    <label class="" v-tooltip.top="'Enter your username'">Địa chỉ cụ thể<span
                                            class="text-danger">*</span></label>
                                    <Textarea :class="{ 'p-invalid': fields.houseNumber.error }" class="text-left w-full"
                                        :autoResize="true" v-model="houseNumber" rows="1" placeholder="Địa chỉ cụ thể" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field col-12">
                        <h4 class="font-bold text-brown mb-0">
                            <span class="material-icons vertical-align-bottom mr-2">
                                view_list
                            </span>Danh sách sản phẩm
                        </h4>
                    </div>
                    <div class="field col-12">
                        <div class="grid nested-grid" v-for="shipment in shipments" :key="shipment.id" :item="shipment">
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
                                    Tiền sản phẩm:
                                </div>
                                <div class="col-3 flex align-items-center justify-content-end">
                                    <span class="">{{ formatNumber(shipment.itemCost - shipment.buyerProtectionFee)
                                    }}</span>
                                </div>
                            </div>
                            <div class="grid nested-grid item p-2 border-10 w-full">
                                <div class="col-3 col-offset-6">
                                    Phí vận chuyển:
                                </div>
                                <div class="col-3 flex align-items-center justify-content-end">
                                    <span class="">{{ formatNumber(shipment.shippingCost) }}</span>
                                </div>
                            </div>
                            <div class="grid nested-grid item p-2 border-10 w-full">
                                <div class="col-3 col-offset-6">
                                    Phí bảo vệ người dùng: <i class="pi pi-question-circle"
                                        v-tooltip.top="'Nhằm mục đích bảo vệ người dùng, VAUX sẽ thu phí 9% giá sản phẩm'"></i>
                                </div>
                                <div class="col-3 flex align-items-center justify-content-end">
                                    <span class="">{{ formatNumber(shipment.buyerProtectionFee) }}</span>
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
                    <div class="field col-12">
                        <h4 class="font-bold text-brown mb-0">
                            <span class="material-icons vertical-align-bottom mr-2">
                                payments
                            </span>Tổng thanh toán</h4>
                    </div>
                    <div class="field col-12" style="">
                        <div class="grid nested-grid justify-content-end">
                            <div class="col-fixed surface-100">
                                <div class="col-12">
                                    <div class="col-12">
                                        <table>
                                            <tr>
                                                <td class="px-3">Tổng tiền hàng </td>
                                                <td class="text-right">{{ formatNumber(totalItemCost) }} </td>
                                            </tr>
                                            <tr>
                                                <td class="px-3">Phí vận chuyển </td>
                                                <td class="text-right">{{ formatNumber(totalShipCost) }} </td>
                                            </tr>
                                            <tr>
                                                <td class="px-3">Phí bảo vệ người dùng <i class="pi pi-question-circle"
                                                        v-tooltip.top="'Nhằm mục đích bảo vệ người dùng, VAUX sẽ thu phí 9% giá sản phẩm'"></i>
                                                </td>
                                                <td class="text-right">{{ formatNumber(totalProtectFeeCost) }} </td>
                                            </tr>
                                            <tr>
                                                <td class="px-3">Tổng thanh toán </td>
                                                <td class="text-right">
                                                    <h3 class="text-brown m-0">{{ formatNumber(totalCost) }} </h3>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="col-12 flex justify-content-end">
                                        <Button @click="createPayment()" class="btn-final border-10"><span
                                                class="material-icons vertical-align-bottom mr-2">
                                                check
                                            </span> Thanh toán</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
  
<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
const nsStoreOrder = namespace('order/store-order')
import { Option } from '~/models/Option'
const nsStoreUser = namespace('user-auth/store-user')
const nsStoreAddress = namespace('address/store-address')
const nsStoreItem = namespace('item/store-public-item')
const nsStoreCategory = namespace('category/store-category')

@Component({
    middleware: ['authenticate'],
    layout: 'payment'
})
class ItemList extends Vue {
    //================================================
    orderId: any
    home = { icon: 'pi pi-home', to: '/homepage' }
    breads = [
        { label: 'Giỏ hàng' }
    ]
    user: any = null
    shipments: any[] = []
    totalCost: any = 0
    totalItemCost: any = 0
    totalShipCost: any = 0
    totalProtectFeeCost: any = 0
    //================================================
    selectedCity: Option.Option | null = null
    selectedDistrict: Option.Option | null = null
    selectedStreet: Option.Option | null = null
    oCitys: Option.Option[] = []
    oDistricts: Option.Option[] = []
    oStreets: Option.Option[] = []
    //================================================
    houseNumber: string = ''
    city: string = ''
    district: string = ''
    street: string = ''
    name: string = ''
    phone: string = ''
    fields: any = {
        name: { label: 'Tên người dùng', required: true, error: false, value: '' },
        phone: { label: 'Số điện thoại', required: true, error: false, value: '' },
        city: { label: 'Thành phố', required: true, error: false, value: '' },
        district: { label: 'Quận, huyện', required: true, error: false, value: '' },
        street: { label: 'Phường, xã', required: true, error: false, value: '' },
        houseNumber: { label: 'Địa chỉ cụ thể', required: true, error: false, value: '' },
    }
    @nsStoreUser.Action
    actGetUserDetail!: () => Promise<string>
    @nsStoreAddress.Action
    actGetCity!: () => Promise<string>
    @nsStoreAddress.Action
    actGetDistrict!: (params: any) => Promise<string>
    @nsStoreAddress.Action
    actGetStreet!: (params: any) => Promise<string>
    @nsStoreOrder.Action
    actGetOrderById!: (params: any) => Promise<any>
    @nsStoreOrder.Action
    actConfirmPayment!: (params: any) => Promise<any>
    @nsStoreOrder.Action
    actPostOrderPaymentLink!: (params: any) => Promise<any>

    async created() {
        this.orderId = this.$route?.params?.id
        // this.orderId = Array.isArray(this.$route.query.id)
        //     ? this.$route.query.id[0]
        //     : this.$route.query.id
        console.log(this.orderId)
        const vnp_ResponseCode = Array.isArray(this.$route.query.vnp_ResponseCode)
            ? this.$route.query.vnp_ResponseCode[0]
            : this.$route.query.vnp_ResponseCode
        if (vnp_ResponseCode) {
            const params = {
                orderId: this.orderId,
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
        this.user = await this.actGetUserDetail()
        if (this.user == null) {
            this.$store.commit(
                'commons/store-error/setError',
                'Không tìm thấy thông tin người dùng'
            )
            return
        }
        this.houseNumber = this.user?.houseNumber
        this.city = this.user?.city
        this.district = this.user?.district
        this.street = this.user?.street
        this.name = this.user?.name
        this.phone = this.user?.phone
        await this.GetCity();
        await this.getDistrict();
        await this.getStreet();
        await this.getOrder()
    }
    async getOrder() {
        const response = await this.actGetOrderById({ orderId: this.orderId })
        console.log(response)
        if (!response) {
            return
        }
        if (response.shipment.length <= 0) {
            return
        }
        for (let i = 0; i < response.shipment.length; i++) {
            if (response.shipment[i].items.length <= 0) {
                continue
            }
            let shipment: any = {
                id: response.shipment[i].id,
                sellerName: response.shipment[i].seller.name,
                itemCost: response.shipment[i].itemCost,
                buyerProtectionFee: response.shipment[i].buyerProtectionFee,
                shippingCost: response.shipment[i].shippingCost,
                items: [],
            }
            for (let j = 0; j < response.shipment[i].items.length; j++) {
                shipment.items.push({
                    id: response.shipment[i].items[j].id,
                    name: response.shipment[i].items[j].name,
                    catName: response.shipment[i].items[j].category.name,
                    price: response.shipment[i].items[j].highestBid.amount,
                    thumbnailId: response.shipment[i].items[j].thumbnailId,
                })
            }
            this.totalShipCost += response.shipment[i].shippingCost
            this.totalItemCost += (response.shipment[i].itemCost - response.shipment[i].buyerProtectionFee)
            this.totalProtectFeeCost += response.shipment[i].buyerProtectionFee
            this.shipments.push(shipment)
        }
        this.totalCost = response.totalCost
    }
    async createPayment() {
        if (!this.checkValid()) {
            return
        }
        const param = {
            orderId: this.orderId,
            receiverName: this.name,
            receiverPhone: this.phone,
            address: this.getAddress()
        }
        const response = await this.actPostOrderPaymentLink(param)
        console.log(response)
        window.location.href = response;
    }
    getImageUrl(itemId: any, imgId: any) {
        console.log(itemId, imgId)
        try {
            if (itemId == null || imgId == null) {
                return ''
            }
            const params = {
                itemId: itemId,
                imgId: imgId,
            }
            return process.env.BE_API_URL + '/api/Item/' + itemId + '/Images/' + imgId
        } catch (error) {
            this.$store.commit('commons/store-error/setError', "Error fetching or converting image")
            console.error("Error fetching or converting image:", error);
            return undefined;
        }
    }
    getAddress() {
        return this.houseNumber + ', ' + this.selectedStreet?.name + ', ' + this.selectedDistrict?.name + ', ' + this.selectedCity?.name
    }
    formatNumber(number: any) {
        const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return "₫" + formattedNumber;
    }
    async GetCity() {
        const response: any = await this.actGetCity()
        this.oCitys = response.map((city: any) => ({
            id: city.code,
            name: city.name,
            value: city.codename,
        }));
        this.selectedCity = this.oCitys.find((city) => city.value === this.city) || null;
    }
    async getDistrict() {
        if (this.selectedCity == undefined || this.selectedCity == null) return
        this.city = this.selectedCity.value
        const response: any = await this.actGetDistrict({ cityId: this.selectedCity?.id })
        this.oDistricts = response.districts.map((district: any) => ({
            id: district.code,
            name: district.name,
            value: district.codename,
        }));
        this.selectedDistrict = this.oDistricts.find((district) => district.value === this.district) || null;
    }
    async getStreet() {
        if (this.selectedDistrict == undefined || this.selectedDistrict == null) return
        this.district = this.selectedDistrict.value
        const response: any = await this.actGetStreet({ districtId: this.selectedDistrict?.id })
        this.oStreets = response.wards.map((street: any) => ({
            id: street.code,
            name: street.name,
            value: street.codename,
        }));
        this.selectedStreet = this.oStreets.find((street) => street.value === this.street) || null;
    }
    onSelectCity() {
        this.district = ''
        this.street = ''
        this.oStreets = []
        this.getDistrict()
    }
    checkValid() {
        this.fetchFormData();
        if (!this.checkNullValue(this.fields)) {
            return false
        }
        if (this.fields.name.value && this.fields.name.value.length > 40) {
            this.fields.name.error = true;
            this.$store.commit('commons/store-error/setError', "Tên người dùng không được dài quá 40 ký tự")
            return false
        }
        const phoneRegex = /^(0|\+84)(9[0-9]|8[0-9]|7[0-9]|5[0-9]|3[0-9]|2[0-9]|6[0-9]|4[0-9]|1[0-9])+([0-9]{7})\b/;
        if (!phoneRegex.test(this.fields.phone.value)) {
            this.fields.phone.error = true;
            this.$store.commit('commons/store-error/setError', "Số điện thoại không đúng định dạng")
            return false
        }
        if (!(this.fields.houseNumber.value.trim() == '') && this.fields.houseNumber.value.length > 100) {
            this.fields.mail.error = true;
            this.$store.commit('commons/store-error/setError', "Địa chỉ cụ thể quá dài (100 ký tự)")
            return false
        }
        return true
    }
    fetchFormData() {
        for (const fieldName in this.fields) {
            if (this.fields.hasOwnProperty(fieldName)) {
                this.fields[fieldName].value = (this as any)[fieldName];
                this.fields[fieldName].error = false
            }
        }
    }
    checkNullValue(fields: any) {
        const invalidFields: any[] = []
        for (const fieldName in fields) {
            if (fields.hasOwnProperty(fieldName)) {
                const fieldProperties = fields[fieldName];
                if (fieldProperties.required) {
                    const value = fieldProperties.value;
                    const trimmedValue = value != null && typeof value === 'string' ? value.trim() : value;

                    // if (!fieldProperties.value || fieldProperties.value.trim() === '') {
                    if (!trimmedValue || trimmedValue === '') {
                        fieldProperties.error = true;
                        invalidFields.push(fieldProperties.label)
                    } else {
                        fieldProperties.error = false;
                    }
                }
            }
        }
        if (invalidFields.length > 0) {
            const errorFields = invalidFields
                // .map((field: any) => field.label)
                .join(', ')
            const errorMessage = `Vui lòng điền thêm thông tin: ${errorFields}`
            this.$store.commit('commons/store-error/setError', errorMessage)
            return false
        }
        return true
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
            this.$router.push("/account/orders")
        }
    }

}
export default ItemList
</script>
  
<style lang="sass">
.envelope    
    height: 3px
    width: 100%
    background-position-x: -30px
    background-size: 116px 3px
    background-image: repeating-linear-gradient(45deg,#6fa6d6,#6fa6d6 33px,transparent 0,transparent 41px,#f18d9b 0,#f18d9b 74px,transparent 0,transparent 82px)
  </style>
  