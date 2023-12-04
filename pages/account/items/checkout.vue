<template>
    <section class="surface-0 flex align-items-center justify-content-center p-2">
        <div class="box-page-container flex flex-column container w-full">
            <div class="card-body my-3">
                <div class="grid">
                    <div class="field col-12">
                        <h4 class="font-bold text-brown mb-0">Địa chỉ nhận hàng</h4>
                    </div>
                    <div class="col-12">
                        <div class="border-1 border-solid surface-border ">
                            <div class="envelope"></div>
                            <div class="col-12 grid p-3">
                                <div class="align-self-center col-6 field mb-0">
                                    <label class="">Họ và tên người nhận</label>
                                    <InputText class="w-100 line-height-1" v-model="name" />
                                </div>
                                <div class="align-self-center col-6 field mb-0">
                                    <label class="">Số điện thoại người nhận</label>
                                    <InputText class="w-100 line-height-1" v-model="phone" />
                                </div>
                                <div class="align-self-center col-4 field mb-0">
                                    <label class="">Thành phố</label>
                                    <Dropdown class="w-100 line-height-1" v-model="selectedCity" :options="oCitys"
                                        :filter="true" filterPlaceholder="Tìm kiếm" optionLabel="name"
                                        placeholder="-Chọn Thành phố-" @change="onSelectCity()" />
                                </div>
                                <div class="align-self-center col-4 field mb-0">
                                    <label class="">Quận/ Huyện</label>
                                    <Dropdown class="w-100 line-height-1" v-model="selectedDistrict" :options="oDistricts"
                                        :filter="true" filterPlaceholder="Tìm kiếm" optionLabel="name"
                                        placeholder="-Chọn Quận/Huyện-" @change="getStreet()" />
                                </div>
                                <div class="align-self-center col-4 field mb-0">
                                    <label class="">Phố/ Phường</label>
                                    <Dropdown class="w-100 line-height-1" v-model="street" :options="oStreets"
                                        :filter="true" filterPlaceholder="Tìm kiếm" optionLabel="name"
                                        placeholder="-Chọn Phố/Phường-" optionValue="value" />
                                </div>
                                <div class="align-self-center col-12 field mb-0">
                                    <label class="">Địa chỉ cụ thể</label>
                                    <Textarea class="text-left w-full" :autoResize="true" v-model="houseNumber" rows="1"
                                        placeholder="Sử dụng phần này để thêm thông tin lý do." />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field col-12">
                        <h4 class="font-bold text-brown mb-0">Danh sách sản phẩm</h4>
                    </div>
                    <div class="field col-12">
                        <DataTable class="w-full airtag-datatable h-full flex flex-column" v-if="items" :value="items"
                            responsiveLayout="scroll" dataKey="id" :rows="10" :scrollable="false" stripedRows>
                            <Column field="id" header="STT">
                                <template #body="slotProps">
                                    <span class="">{{ slotProps.index + 1 }}</span>
                                </template>
                            </Column>
                            <Column className="max-w-10rem" header="Image" width="50px" height="50px">
                                <template #body="slotProps">
                                    <img :src="getImageUrl(slotProps.data.id, slotProps.data.itemId)"
                                        :alt="slotProps.data.image" class="product-image w-full h-full" />
                                </template>
                            </Column>
                            <Column field="name" className="" header="Tên" bodyStyle="width:100%">
                                <!-- <template #body="slotProps">
                                    <div class="w-10 white-space-nowrap overflow-hidden text-overflow-ellipsis">
                                        {{ slotProps.data.name }}
                                    </div>
                                </template> -->
                            </Column>
                            <Column field="price" className="" header="Giá">
                                <template #body="slotProps">
                                    <span class="overflow-ellipsis text-overflow-ellipsis">
                                        {{ formatNumber(slotProps.data.price) }}
                                    </span>
                                </template>
                            </Column>
                            <Column field="price" className="" header="Phí ship">
                                <template #body="slotProps">
                                    <span class="overflow-ellipsis text-overflow-ellipsis">
                                        {{ formatNumber(slotProps.data.shipFee ? slotProps.data.shipFee : 10000) }}
                                    </span>
                                </template>
                            </Column>
                        </DataTable>
                    </div>
                    <div class="field col-12 surface-0" style="">
                        <div class="flex justify-content-center align-items-center">
                            <button class="btn-primary p-2 px-5 border-10 "> Thanh toán</button>
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
    totalRecords: number = 0
    //---------------------------------------
    home = { icon: 'pi pi-home', to: '/homepage' }
    breads = [
        { label: 'Giỏ hàng' }
    ]
    user: any = null
    items: any[] = [
        {
            id: 1, name: 'Đồ cổ thời khỳ trung đông, đồ ăn đã thất truyền và thiu qua nhiều thế hệ',
            catName: 'Đồ ăn', price: 12000000, imgId: 1, date: '2023-12-01T20:00:00'
        },
        {
            id: 1, name: 'Đồ cổ thời khỳ trung đông, đồ ăn đã thất truyền và thiu qua nhiều thế hệ',
            catName: 'Đồ ăn', price: 12000000, imgId: 1, date: '2023-12-01T20:00:00'
        },
        {
            id: 1, name: 'Đồ cổ thời khỳ trung đông, đồ ăn đã thất truyền và thiu qua nhiều thế hệ',
            catName: 'Đồ ăn', price: 12000000, imgId: 1, date: '2023-12-01T20:00:00'
        },
        {
            id: 1, name: 'Đồ cổ thời khỳ trung đông, đồ ăn đã thất truyền và thiu qua nhiều thế hệ',
            catName: 'Đồ ăn', price: 12000000, imgId: 1, date: '2023-12-01T20:00:00'
        },
        {
            id: 1, name: 'Đồ cổ thời khỳ trung đông, đồ ăn đã thất truyền và thiu qua nhiều thế hệ',
            catName: 'Đồ ăn', price: 12000000, imgId: 1, date: '2023-12-01T20:00:00'
        },
    ]
    selectedCity: Option.Option | null = null
    selectedDistrict: Option.Option | null = null
    selectedStreet: Option.Option | null = null
    oCitys: Option.Option[] = []
    oDistricts: Option.Option[] = []
    oStreets: Option.Option[] = []
    houseNumber: string = ''
    city: string = ''
    district: string = ''
    street: string = ''
    name : string = ''
    phone : string = ''
    @nsStoreUser.Action
    actGetUserDetail!: () => Promise<string>
    @nsStoreItem.Action
    actGetItem!: (param: any) => Promise<any>
    @nsStoreCategory.Action
    actGetCategory!: (params: any) => Promise<any>
    @nsStoreAddress.Action
    actGetCity!: () => Promise<string>
    @nsStoreAddress.Action
    actGetDistrict!: (params: any) => Promise<string>
    @nsStoreAddress.Action
    actGetStreet!: (params: any) => Promise<string>

    async mounted() {
        this.user = await this.actGetUserDetail()
        if (this.user == null) {
            this.$store.commit(
                'commons/store-error/setError',
                'Không tìm thấy thông tin tài khoản'
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
    }

    async getItem() {
    }

    async getCategory() {
    }

    getImageUrl(itemId: any, imgId: any) {
        try {
            return 'https://localhost:6565/api/Item/2/Images/29'
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
    viewItem(id: any) {
        this.$router.push("/p/item/" + id)
    }
    formatNumber(number: any) {
        const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return formattedNumber + "vnđ";
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
  