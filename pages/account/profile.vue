<template>
    <section class="surface-0 flex align-items-center justify-content-center p-2">
        <div class="box-page-container flex flex-column container w-full">
            <Breadcrumb :home="home" :model="items" />
            <div class="card-body my-3">
                <TabView class="tabview-custom">
                    <TabPanel>
                        <template #header>
                            <i class="pi pi-calendar"></i>
                            <span>Hồ sơ</span>
                        </template>
                        <div class="grid formgrid">
                            <div class="field col-12">
                                <h2 class="font-bold text-brown mb-0">Hồ sơ của tôi</h2>
                            </div>
                            <div class="field col-12">
                                Quản lý thông tin của bạn
                            </div>
                            <div class="field md:col-6 md:col-offset-3 col-12">
                                <div class="grid">
                                    <div class="align-self-center col-4 field">
                                        <label class="md:m-0">Tên người dùng</label>
                                    </div>
                                    <div class="col-8 field">
                                        <InputText class="w-full" type="text" v-model="name" />
                                    </div>
                                    <div class="align-self-center col-4 field">
                                        <label class="md:m-0">Số điện thoại</label>
                                    </div>
                                    <div class="col-8 field">
                                        <InputText class="w-full" type="text" v-model="phone" />
                                    </div>
                                    <div class="align-self-center col-4 field">
                                        <label class="md:m-0">Email</label>
                                    </div>
                                    <div class="col-8 field">
                                        <InputText class="w-full" type="text" v-model="mail" />
                                    </div>
                                    <div class="align-self-center col-4 field">
                                        <label class="md:m-0">Gender</label>
                                    </div>
                                    <div class="col-8 field">
                                        <Dropdown class="w-100 line-height-1" v-model="gender" :options="oGenders"
                                            optionLabel="name" optionValue="value" />
                                    </div>
                                    <div class="align-self-center col-4 field">
                                        <label class="md:m-0">Ngày sinh</label>
                                    </div>
                                    <div class="col-8 field">
                                        <Calendar class="surface-overlay w-100 m-0" v-model="doB" dateFormat="dd-mm-yy">
                                        </Calendar>
                                    </div>
                                    <div class="col-8 col-offset-4">
                                        <BlockUI :blocked="disableButton">
                                            <Button class="btn-primary border-10" label="Cập nhật" @click="onUpdate()" />
                                        </BlockUI>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <template #header>
                            <i class="pi pi-user"></i>
                            <span>Địa chỉ</span>
                        </template>
                        <div class="grid formgrid">
                            <div class="field col-12">
                                <h2 class="font-bold text-brown mb-0">Địa chỉ của tôi</h2>
                            </div>
                            <div class="field md:col-6 md:col-offset-3 col-12">
                                <div class="grid">
                                    <div class="align-self-center col-4 field">
                                        <label class="md:m-0">Thành phố</label>
                                    </div>
                                    <div class="col-8 field">
                                        <!-- <InputText class="w-full" type="text" v-model="city" /> -->
                                        <Dropdown class="w-100 line-height-1" v-model="selectedCity" :options="oCitys"
                                            :filter="true" filterPlaceholder="Tìm kiếm" optionLabel="name"
                                            placeholder="-Chọn Thành phố-" @change="onSelectCity()" />
                                    </div>
                                    <div class="align-self-center col-4 field">
                                        <label class="md:m-0">Quận/ Huyện</label>
                                    </div>
                                    <div class="col-8 field">
                                        <!-- <InputText class="w-full" type="text" v-model="district" /> -->
                                        <Dropdown class="w-100 line-height-1" v-model="selectedDistrict"
                                            :options="oDistricts" :filter="true" filterPlaceholder="Tìm kiếm"
                                            optionLabel="name" placeholder="-Chọn Quận/Huyện-" @change="getStreet()" />
                                    </div>
                                    <div class="align-self-center col-4 field">
                                        <label class="md:m-0">Phố/ Phường</label>
                                    </div>
                                    <div class="col-8 field">
                                        <!-- <InputText class="w-full" type="text" v-model="street" /> -->
                                        <Dropdown class="w-100 line-height-1" v-model="street" :options="oStreets"
                                            :filter="true" filterPlaceholder="Tìm kiếm" optionLabel="name"
                                            placeholder="-Chọn Phố/Phường-" optionValue="value" />
                                    </div>
                                    <div class="align-self-center col-4 field">
                                        <label class="md:m-0">Địa chỉ cụ thể</label>
                                    </div>
                                    <div class="col-8 field">
                                        <InputText class="w-full" type="text" v-model="houseNumber" />
                                    </div>
                                    <div class="col-8 col-offset-4">
                                        <BlockUI :blocked="disableButton">
                                            <Button class="btn-primary border-10" label="Cập nhật" @click="onUpdate()" />
                                        </BlockUI>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <template #header>
                            <i class="pi pi-user"></i>
                            <span>Tài khoản ngân hàng</span>
                        </template>
                        <div class="grid formgrid">
                            <div class="field col-12">
                                <h2 class="font-bold text-brown mb-0">Thông tin tài khoản ngân hàng</h2>
                            </div>
                            <div class="field md:col-6 md:col-offset-3 col-12">
                                <div class="grid">
                                    <div class="align-self-center col-4 field">
                                        <label class="md:m-0">Ngân hàng</label>
                                    </div>
                                    <div class="col-8 field">
                                        <Dropdown class="w-100 line-height-1" v-model="selectedBank" :options="oBanks"
                                            :filter="true" filterPlaceholder="Tìm kiếm" optionLabel="name"
                                            placeholder="-Chọn Ngân hàng-" @change="onSelectBank()" />
                                    </div>
                                    <div class="align-self-center col-4 field">
                                        <label class="md:m-0">Số tài khoản</label>
                                    </div>
                                    <div class="col-8 field">
                                        <InputText class="w-full" type="text" v-model="bankAccountNum" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <!-- <TabPanel>
                        <template #header>
                            <i class="pi pi-user"></i>
                            <span>Yêu cầu lên người bán</span>
                        </template>
                        <div>
                            <div v-if="!userApliId">
                                <div class="field col-12">
                                    <h4 class="font-bold text-brown mb-0">Có vẻ bạn chưa từng làm đơn xin trở thành người
                                        bán</h4>
                                </div>
                                <div class="field col-12">
                                    <Button class="btn-primary border-10" label="Tham gia ngay" @click="onCreateApp()" />
                                </div>
                            </div>
                            <div v-else>
                                <div v-if="userApliStatus == 1">
                                    <div class="check">
                                        <div class="check">
                                            <div class="check__border"></div>
                                            <div class="check__check">
                                                <div class="check__check-bottom"></div>
                                                <div class="check__check-top"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>Thành công</div>
                                </div>
                                <div v-else-if="userApliStatus == 3">
                                    <div class="check">
                                        <div class="check">
                                            <div class="x__border"></div>
                                            <div class="x__check">
                                                <div class="x__check-bottom"></div>
                                                <div class="x__check-top"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>Thất bại</div>
                                </div>
                                <div v-else>
                                    Quản trị viên chưa duyệt
                                </div>
                            </div>
                        </div>
                    </TabPanel> -->
                </TabView>
            </div>
        </div>
    </section>
</template>
  
<script lang="ts">
import { BlobOptions } from 'buffer'
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { Option } from '~/models/Option'
import { GENDER_OPTION } from '~/utils'
const nsStoreUser = namespace('user-auth/store-user')
const nsStoreAddress = namespace('address/store-address')
const nsStoreBank = namespace('bank/store-bank')

@Component({
    middleware: ['authenticate'],
    layout: 'public',
    // meta: {
    //   role: [3, 2]
    // }
})
class Profile extends Vue {
    name: string = ''
    phone: string = ''
    mail: string = ''
    gender: string = ''
    doB: Date = new Date()
    houseNumber: string = ''
    city: string = ''
    district: string = ''
    street: string = ''
    bankCode: string = ''
    bankName: string = ''
    bankAccountNum: string = ''
    userApliId: any
    userApliStatus: any
    user: any = null
    //option data------------------------------
    oGenders = GENDER_OPTION
    selectedCity: Option.Option | null = null
    selectedDistrict: Option.Option | null = null
    selectedStreet: Option.Option | null = null
    selectedBank: any | null = null
    option: Option.Option | undefined
    oCitys: Option.Option[] = []
    oDistricts: Option.Option[] = []
    oStreets: Option.Option[] = []
    oBanks: any[] = []

    //---------------------------------------
    home = { icon: 'pi pi-home', to: '/homepage' }
    items = [
        { label: 'Profile' }
    ]
    disableButton: boolean = false
    //----------------------------------------
    @nsStoreUser.Action
    actGetUserDetail!: () => Promise<string>
    @nsStoreUser.Action
    actUpdateProfile!: (params: any) => Promise<string>
    @nsStoreUser.Action
    actGetSellerApplication!: (params: any) => Promise<string>
    @nsStoreAddress.Action
    actGetCity!: () => Promise<string>
    @nsStoreAddress.Action
    actGetDistrict!: (params: any) => Promise<string>
    @nsStoreAddress.Action
    actGetStreet!: (params: any) => Promise<string>
    @nsStoreBank.Action
    actGetBanksList!: () => Promise<string>

    async mounted() {
        this.user = await this.actGetUserDetail()
        console.log(this.user)
        if (this.user == null) {
            this.$store.commit(
                'commons/store-error/setError',
                'Không tìm thấy thông tin tài khoản'
            )
            return
        }
        this.name = this.user?.name
        this.phone = this.user?.phone
        this.mail = this.user?.email
        this.gender = this.user?.gender
        this.houseNumber = this.user?.houseNumber
        this.city = this.user?.city
        this.district = this.user?.district
        this.street = this.user?.street
        this.bankCode = this.user?.bankCode
        this.bankName = this.user?.bankName
        this.bankAccountNum = this.user?.bankAccountNum
        this.doB = this.getDate(this.user?.doB)
        await this.GetCity();
        await this.getDistrict();
        await this.getStreet();
        await this.GetBank();
        const result: any = await this.actGetSellerApplication({ userId: this.user?.id });
        if (!result) {
            this.userApliId = null
        }
        else if (result) {
            this.userApliId = result.id
            this.userApliStatus = result.status
        }
    }
    async onUpdate() {

        // console.log(this.parseDate(this.doB))
        this.disableButton = true;
        const params = {
            name: this.name,
            phone: this.phone,
            email: this.mail,
            city: this.city,
            district: this.district,
            street: this.street,
            houseNumber: this.houseNumber,
            gender: this.gender,
            doB: this.parseDate(this.doB)
        }
        const response: any = await this.actUpdateProfile(params)
        if (response.status == 200) this.$toast.add({ severity: 'success', summary: 'Success', detail: 'Đã cập nhật thông tin', life: 10000 })
        this.disableButton = false;
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
    async GetBank() {
        const response: any = await this.actGetBanksList()
        console.log(response)
        if (response.code == '00') {

        }
        this.oBanks = response.data.map((bank: any) => ({
            id: bank.id,
            name: bank.shortName + ' - ' + bank.name,
            fullname: bank.name,
            value: bank.code,
        }));
        this.selectedBank = this.oBanks.find((bank) => bank.value === this.bankCode) || null;
        // this.selectedCity = this.oCitys.find((city) => city.value === this.city) || null;
    }
    onSelectBank() {
        this.bankName = this.selectedBank?.fullname
        this.bankCode = this.selectedBank?.value
    }
    onCreateApp() {
        this.$router.push("/account/requestseller")
    }
    formatDate(dateString: string) {
        const date = new Date(dateString)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0') // Tháng trong JavaScript bắt đầu từ 0
        const year = date.getFullYear()
        return `${day}-${month}-${year}`
    }
    getDate(string: string) {
        return new Date(string)
    }
    parseDate(string: Date) {
        const date = new Date(string);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const milliseconds = date.getMilliseconds().toString().padStart(3, '0');

        const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

        return formattedDate;
    }
}
export default Profile
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
  .tabview-custom i
    vertical-align: middle
  .tabview-custom span
    vertical-align: middle
    margin: 0.5rem

  @keyframes check__border--entrance
    100%
      transform: rotateZ(315deg)
  
  @keyframes check__check--entrance
    0%
      opacity: 0
  
  @keyframes check__check-top--entrance
    0%
      height: 0px
      
  @keyframes x__check-top--entrance
    0%
      top: 0
      height: 0px
  
    100%
      top: 0
  
  @keyframes check__check-bottom--entrance
    0%
      width: 0px
  
  .check
    position: relative
    height: 256px
    width: 256px
    border-radius: 50%
    box-shadow: 0 10px 5px rgba(0, 0, 0, 0.02)
  
  .check__border, .check__check
    position: absolute
  
  .check__border
    border: 24px solid $primary-success
    border-right-color: transparent
    top: 0
    left: 0
    right: 0
    bottom: 0
    border-radius: 50%
    transform: rotateZ(-45deg)
    animation: check__border--entrance 0.5s ease
  
    &::before, &::after
      content: ""
      width: 24px
      height: 24px
      background: $primary-success
      position: absolute
  
    &::before
      top: 9px
      right: 11px
      border-radius: 0 50% 50% 50%
  
    &::after
      bottom: 9px
      right: 11px
      border-radius: 50% 50% 50% 0%
  
  .check__check
    transform: rotateZ(45deg)
    top: -15%
    right: 20%
    bottom: 30%
    left: 45%
    animation: check__check--entrance 0.4s ease
  
  .check__check-top, .check__check-bottom
    position: absolute
    background: $primary-success
    border-radius: 12px
  
  .check__check-top
    width: 24px
    right: 0
    height: 100%
    bottom: 0
    animation: check__check-top--entrance 0.3s ease 0.3s backwards
  
  .check__check-bottom
    height: 24px
    left: 0
    width: 100%
    bottom: 0
    animation: check__check-bottom--entrance 0.3s ease backwards
    
  .x__border, .x__check
    position: absolute
  
  .x__border
    border: 24px solid $primary-danger
    border-right-color: transparent
    top: 0
    left: 0
    right: 0
    bottom: 0
    border-radius: 50%
    transform: rotateZ(-45deg)
    animation: check__border--entrance 0.9s ease backwards
  
    &::before, &::after
      content: ""
      width: 24px
      height: 24px
      background: $primary-danger
      position: absolute
  
    &::before
      top: 9px
      right: 11px
      border-radius: 50% 50% 50% 50%
  
    &::after
      bottom: 9px
      right: 11px
      border-radius: 50% 50% 50% 50%
  
  .x__check
    transform: rotateZ(45deg)
    top: 15%
    right: 15%
    bottom: 15%
    left: 15%
    animation: check__check--entrance 0.4s ease
  
  .x__check-top, .x__check-bottom
    position: absolute
    background: $primary-danger
    border-radius: 12px
  
  .x__check-top
    width: 24px
    right: calc(50% - 12px)
    height: 100%
    bottom: 0
    animation: x__check-top--entrance 0.3s ease 0.3s backwards
  
  .x__check-bottom
    height: 24px
    left: 0
    width: 100%
    bottom: calc(50% - 12px)
    animation: check__check-bottom--entrance 0.3s ease backwards
    
  
  </style>
  