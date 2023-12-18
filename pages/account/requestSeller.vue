//Request seller
<template>
  <section class="surface-0 flex align-items-center justify-content-center min-h-screen  p-2">
    <div class="box-page-container flex flex-column container">
      <Breadcrumb :home="home" :model="items" />
      <div class="card-body my-3">
        <div class="grid formgrid">
          <div class="field col-12">
            <h2 class="font-bold text-brown">Đăng ký tài khoản người bán</h2>
          </div>
        </div>
        <div class="grid grid-form">
          <div class="field col-6">
            <label>
              {{ fields.name.label }}<span class="text-danger">*</span>
            </label>
            <InputText class="w-100" v-model="name" :class="{ 'p-invalid': fields.name.error }">
            </InputText>
          </div>
          <div class="field col-6">
            <label>{{ fields.gender.label }}</label><span class="text-danger">*</span>
            <Dropdown class="w-100 line-height-1" :class="{ 'p-invalid': fields.gender.error }" v-model="gender"
              :options="oGenders" optionLabel="name" optionValue="value" />
          </div>
          <div class="field col-6">
            <label>{{ fields.dob.label }}</label><span class="text-danger">*</span><br />
            <Calendar class="surface-overlay w-100" :class="{ 'p-invalid': fields.dob.error }" v-model="dob"
              dateFormat="dd-mm-yy">
            </Calendar>
          </div>
          <div class="field col-6">
            <label>{{ fields.phone.label }}<span class="text-danger">*</span></label>
            <InputText class="w-100" :class="{ 'p-invalid': fields.phone.error }" type="text" v-model="phone" />
          </div>
          <div class="field col-6">
            <label>{{ fields.email.label }}<span class="text-danger">*</span></label>
            <InputText class="w-100" :class="{ 'p-invalid': fields.email.error }" type="text" v-model="email" />
          </div>
          <div class="field col-6">
            <label>{{ fields.cccd.label }}<span class="text-danger">*</span></label>
            <InputText class="w-100" :class="{ 'p-invalid': fields.cccd.error }" type="text" v-model="cccd" />
          </div>
          <div class="field col-4">
            <label>{{ fields.city.label }}<span class="text-danger">*</span></label>
            <Dropdown class="w-100 line-height-1" :class="{ 'p-invalid': fields.city.error }" v-model="selectedCity"
              :options="oCitys" :filter="true" filterPlaceholder="Tìm kiếm" optionLabel="name"
              placeholder="-Chọn Thành phố-" @change="onSelectCity()" />
          </div>
          <div class="field col-4">
            <label>{{ fields.district.label }}<span class="text-danger">*</span></label>
            <Dropdown class="w-100 line-height-1" :class="{ 'p-invalid': fields.district.error }"
              v-model="selectedDistrict" :options="oDistricts" :filter="true" filterPlaceholder="Tìm kiếm"
              optionLabel="name" placeholder="-Chọn Quận/Huyện-" @change="getStreet()" />
          </div>
          <div class="field col-4">
            <label>{{ fields.street.label }}<span class="text-danger">*</span></label>
            <Dropdown class="w-100 line-height-1" :class="{ 'p-invalid': fields.street.error }" v-model="street"
              :options="oStreets" :filter="true" filterPlaceholder="Tìm kiếm" optionLabel="name"
              placeholder="-Chọn Phố/Phường-" optionValue="value" />
          </div>
          <div class="field col-12">
            <label>
              {{ fields.houseNumber.label }}<span class="text-danger">*</span>
            </label>
            <InputText class="w-100" :class="{ 'p-invalid': fields.houseNumber.error }" type="text"
              v-model="houseNumber" />
          </div>
          <div class="field col-6">
            <label>{{ fields.filePortrait.label }}<span class="text-danger">*</span></label>
            <div :class="{ 'input-invalid': fields.filePortrait.error }"
              class="w-100 text-center surface-overlay p-1 border-1 border-solid surface-border border-10 w-full">
              <ImagePreview :src="portraitUrl || require('~/assets/images/default.jpg')" alt="Image"
                imageClass="w-max-100" imageStyle="height:200px;object-fit: contain" />
              <div class="small font-italic text-muted mb-2">
                JPG or PNG no larger than 3 MB
              </div>
              <input type="file" @change="onUploadFile($event, 'Portrait')" accept="image/*" />
            </div>
          </div>
          <div class="field col-6">
            <label>{{ fields.fileCitizenId.label }}<span class="text-danger">*</span></label>
            <div :class="{ 'input-invalid': fields.fileCitizenId.error }"
              class="w-100 text-center surface-overlay p-1 border-1 border-solid surface-border border-10 w-full">
              <ImagePreview :src="citizenIdUrl || require('~/assets/images/default.jpg')
                " imageClass="w-max-100" imageStyle="height:200px;" alt="Image" />
              <div class="small font-italic text-muted mb-2">
                JPG or PNG no larger than 3 MB
              </div>
              <input type="file" @change="onUploadFile($event, 'CitizenId')" accept="image/*" />
            </div>
          </div>
          <div class="field col-6">
            <label>{{ fields.bankName.label }}<span class="text-danger">*</span></label>
            <Dropdown class="w-100 line-height-1" :class="{ 'p-invalid': fields.bankName.error }" v-model="selectedBank"
              :options="oBanks" :filter="true" filterPlaceholder="Tìm kiếm" optionLabel="name"
              placeholder="-Chọn Ngân hàng-" @change="onSelectBank()" />
          </div>
          <div class="field col-6">
            <label>{{ fields.bankAccountNum.label }}<span class="text-danger">*</span></label>
            <InputText class="w-100" type="text" :class="{ 'input-invalid': fields.bankAccountNum.error }"
              v-model="bankAccountNum" />
          </div>
          <div class="field col-12">
            <label>{{ fields.content.label }}<span class="text-danger">*</span></label>
            <Textarea class="text-left w-full" v-model="content" rows="15" cols="100"
              :class="{ 'input-invalid': fields.content.error }"
              placeholder="Ví dụ: Tôi sẽ bán các sản phẩm đồ gia dụng cổ" />
          </div>
          <div class="field col-12 flex justify-content-center">
            <BlockUI :blocked="disableButton">
              <Button class="btn-final" label="Yêu cầu" @click="onSubmit()">
                <i v-if="disableButton" class="pi pi-spin pi-spinner mr-2"></i>Yêu cầu
              </Button>
            </BlockUI>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
      
<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { GENDER_OPTION } from '~/utils'
import { User } from '~/models/User'
import { Option } from '~/models/Option'
const nsStoreAddress = namespace('address/store-address')
const nsStoreBank = namespace('bank/store-bank')
const nsStoreSeller = namespace('seller/store-seller')
const nsStoreUser = namespace('user-auth/store-user')

@Component({
  layout: 'public',
  middleware: ['authenticate'],
})
class requestSeller extends Vue {
  name: string = ''
  gender: string = ''
  dob: any = null
  phone: string = ''
  email: string = ''
  cccd: string = ''
  city: string = ''
  district: string = ''
  street: string = ''
  houseNumber: string = ''
  filePortrait: any = null
  fileCitizenId: any = null
  bankAccountNum: string = ''
  bankCode: string = ''
  bankName: string = ''
  content: string = ''

  //private
  portraitUrl: string = ''
  citizenIdUrl: string = ''
  disableButton: boolean = false
  //
  fields: any = {
    name: { label: 'Tên người dùng', required: true, error: false, value: '' },
    gender: { label: 'Giới tính', required: true, error: false, value: '' },
    dob: { label: 'Ngày sinh', required: true, error: false, value: '' },
    phone: { label: 'Số điện thoại', required: true, error: false, value: '' },
    email: { label: 'Email', required: true, error: false, value: '' },
    cccd: { label: 'Số CCCD', required: true, error: false, value: '' },
    city: { label: 'Thành phố', required: true, error: false, value: '' },
    district: { label: 'Quận, huyện', required: true, error: false, value: '' },
    street: { label: 'Phường, xã', required: true, error: false, value: '' },
    houseNumber: { label: 'Địa chỉ', required: true, error: false, value: '' },
    filePortrait: { label: 'Ảnh chân dung', required: true, error: false, value: '' },
    fileCitizenId: { label: 'Ảnh thẻ cccd/cmnd mặt trước', required: true, error: false, value: '' },
    bankAccountNum: { label: 'Số tài khoản', required: true, error: false, value: '' },
    bankName: { label: 'Ngân hàng', required: true, error: false, value: '' },
    content: { label: 'Tại sao bạn lại muốn trở thành người bán?', required: true, error: false, value: '' },
  }
  //---------------------------------------
  home = { icon: 'pi pi-home', to: '/homepage' }
  items = [
    { label: 'Kênh bán', to: '/Seller' },
    { label: 'Đăng ký tài khoản người bán' }
  ]
  //option data
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

  @nsStoreSeller.Action
  actCreateSeller!: (params: any) => Promise<any>
  @nsStoreSeller.Action
  actGetCategory!: (params: any) => Promise<any>
  @nsStoreUser.State('user')
  user!: User.Model | undefined
  @nsStoreAddress.Action
  actGetCity!: () => Promise<string>
  @nsStoreAddress.Action
  actGetDistrict!: (params: any) => Promise<string>
  @nsStoreAddress.Action
  actGetStreet!: (params: any) => Promise<string>
  @nsStoreBank.Action
  actGetBanksList!: () => Promise<string>
  async mounted() {
    this.name = this.user?.name || ''
    this.gender = this.user?.gender || ''
    this.dob = this.getDate(this.user?.doB)
    this.phone = this.user?.phone || ''
    this.email = this.user?.email || ''
    this.cccd = this.user?.citizenId || ''
    this.city = this.user?.city || ''
    this.district = this.user?.district || ''
    this.street = this.user?.street || ''
    this.houseNumber = this.user?.houseNumber || ''
    await this.GetCity();
    await this.getDistrict();
    await this.getStreet();
    await this.GetBank();
  }
  async onSubmit() {
    this.disableButton = true
    //const response = await this.actGetCategory(null)
    //console.log(response)
    if (!this.checkValid()) {
      this.disableButton = false
      return
    }
    const formData = new FormData();
    formData.append('CitizenId', this.cccd);
    formData.append('Email', this.email);
    formData.append('City', this.city);
    formData.append('District', this.district);
    formData.append('Street', this.street);
    formData.append('HouseNumber', this.houseNumber);
    formData.append('gender', this.gender);
    formData.append('BankAccountNum', this.bankAccountNum);
    formData.append('BankCode', this.bankCode);
    formData.append('BankName', this.bankName);
    formData.append('DoB', this.parseDate(this.dob));
    formData.append('Content', this.content);
    formData.append('Address', this.houseNumber + ', ' + this.selectedStreet?.name + ', ' + this.selectedDistrict?.name + ', ' + this.selectedCity?.name);
    formData.append('RawPortrait', this.filePortrait, this.filePortrait.name);
    formData.append('RawCitizenIdImage', this.fileCitizenId, this.fileCitizenId.name);
    console.log(formData)
    console.log(this.fileCitizenId.name)
    const response = await this.actCreateSeller(formData)
    if (response) {
      this.$toast.add({ severity: 'info', summary: 'Success', detail: 'Đã gửi yêu cầu cho VAUX', life: 10000 })
      this.$router.push('/seller')
    }
    this.disableButton = false
  }
  onUploadFile(event: Event, imgFor: string) {
    const inputElement = event.target as HTMLInputElement
    const files = inputElement.files
    if (files && files.length > 0) {
      if (files[0].size / 1024 / 1024 > 3) {
        this.$store.commit(
          'commons/store-error/setError',
          'File tải lên quá lớn'
        )
        return
      }
      if (imgFor === 'Portrait') {
        this.filePortrait = files[0]
        this.portraitUrl = URL.createObjectURL(this.filePortrait)
      } else if (imgFor === 'CitizenId') {
        this.fileCitizenId = files[0]
        this.citizenIdUrl = URL.createObjectURL(this.fileCitizenId)
      }
    }
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
    // this.selectedCity = this.oCitys.find((city) => city.value === this.city) || null;
  }
  onSelectBank() {
    this.bankName = this.selectedBank?.fullname
    this.bankCode = this.selectedBank?.value
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
  fetchFormData() {
    for (const fieldName in this.fields) {
      if (this.fields.hasOwnProperty(fieldName)) {
        this.fields[fieldName].value = (this as any)[fieldName];
        this.fields[fieldName].error = false
      }
    }
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.fields.email.value) || this.fields.cccd.value.trim().length > 64) {
      this.fields.email.error = true;
      this.$store.commit('commons/store-error/setError', "email không đúng định dạng")
      return false
    }
    if (this.fields.cccd.value && this.fields.cccd.value.trim().length > 13) {
      this.fields.cccd.error = true;
      this.$store.commit('commons/store-error/setError', "Tên người dùng không được dài quá 40 ký tự")
      return false
    }
    if (this.fields.houseNumber.value && this.fields.houseNumber.value.trim().length > 100) {
      this.fields.houseNumber.error = true;
      this.$store.commit('commons/store-error/setError', "Tên người dùng không được dài quá 40 ký tự")
      return false
    }
    if (this.fields.bankAccountNum.value && this.fields.bankAccountNum.value.trim().length > 20) {
      this.fields.bankAccountNum.error = true;
      this.$store.commit('commons/store-error/setError', "Tên người dùng không được dài quá 40 ký tự")
      return false
    }
    // console.log(this.fields.dob.value)
    return true
  }
  getDate(string: any) {
    if (!string) {
      return new Date()
    }
    return new Date(string)
  }
  parseDate(value: Date) {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }
}
export default requestSeller
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
.rounded-circle
  border-radius: 50% !important
</style>
                