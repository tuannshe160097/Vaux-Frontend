// View User Detail
<template>
  <div class="box-page-container flex flex-column">
    <div class="header flex justify-content-between container">
      <div class="col-fixed">
        <div v-if="curThread === 'ADD'">
          <div v-if="curSubject === 'MOD'">
            <h2 class="font-bold m-0 text-uppercase">
              Tạo tài khoản quản trị viên
            </h2>
          </div>
          <div v-else-if="curSubject === 'EXP'">
            <h2 class="font-bold m-0 text-uppercase">
              Tạo tài khoản chuyên gia kiểm định
            </h2>
          </div>
          <div v-else>
            <h2 class="font-bold m-0 text-uppercase">Tạo tài khoản</h2>
          </div>
        </div>
        <div v-else-if="curThread === 'UPDATE'">
          <h2 class="font-bold m-0 text-uppercase">
            Cập nhật thông tin người dùng
          </h2>
        </div>
        <div v-else>
          <h2 class="font-bold m-0 text-uppercase">Thông tin người dùng</h2>
        </div>
      </div>
      <div class="col-fixed">
        <div class="grid align-content-center">
          <!-- <div class="col-fixed">
            <Button class="w-9rem h-3rem" type="button" label="Thêm Mới" @click="onAddNew()"></Button>
            </div> -->
        </div>
      </div>
    </div>

    <div class="card-body">
      <form @submit.prevent="formSubmit">
        <div class="col-fixed grid">
          <div class="md:col-8 sm:col-12">
            <div class="card-control card">
              <div class="card-header justify-content-between flex align-items-center"
                style="padding: 0.8rem 1.5rem !important">
                <div class="title text-xl flex">
                  <span>Thông tin tài khoản</span>
                </div>
                <div class="card-action">
                  <label class="text-normal">Quyền hạn<span class="text-danger">*</span>:</label>
                  <Dropdown v-model="curSubject" :class="{ 'p-invalid': fields.curSubject.error }" :options="oRoles"
                    optionLabel="name" optionValue="value" />
                </div>
              </div>
              <div class="p-4 grid formgrid">
                <div class="field col-6">
                  <label>Tên<span class="text-danger">*</span></label>
                  <InputText class="w-100" :class="{ 'p-invalid': fields.name.error }" type="text" v-model="name" />
                </div>
                <div class="field col-6">
                  <label>Số điện thoại<span class="text-danger">*</span></label>
                  <InputText class="w-100" :class="{ 'p-invalid': fields.phone.error }" type="text" v-model="phone" />
                </div>
                <div class="field col-6">
                  <label>Email<span class="text-danger">*</span></label>
                  <InputText class="w-100" :class="{ 'p-invalid': fields.email.error }" type="text" v-model="email" />
                </div>
                <div class="field col-6">
                  <label>Số CCCD<span class="text-danger">*</span></label>
                  <InputText class="w-100" :class="{ 'p-invalid': fields.cccd.error }" type="text" v-model="cccd" />
                </div>
                <div class="field col-6">
                  <label>Giới tính<span class="text-danger">*</span></label>
                  <Dropdown class="w-100" :class="{ 'p-invalid': fields.gender.error }" v-model="gender"
                    :options="oGenders" optionLabel="name" optionValue="value" />
                </div>
                <div class="field col-6">
                  <label>Ngày sinh<span class="text-danger">*</span></label>
                  <Calendar class="w-100" :class="{ 'p-invalid': fields.dob.error }" v-model="dob"
                    dateFormat="dd-mm-yy" />
                </div>
                <div class="field col-4">
                  <label>Thành phố<span class="text-danger">*</span></label>
                  <!-- <InputText class="w-100" type="text" v-model="city" /> -->
                  <Dropdown class="w-100  line-height-1" :class="{ 'p-invalid': fields.city.error }"
                    v-model="selectedCity" :options="oCitys" :filter="true" filterPlaceholder="Tìm kiếm"
                    optionLabel="name" placeholder="-Chọn Thành phố-" @change="onSelectCity()" />
                </div>
                <div class="field col-4">
                  <label>Quận, huyện<span class="text-danger">*</span></label>
                  <!-- <InputText class="w-100" type="text" v-model="district" /> -->
                  <Dropdown class="w-100 line-height-1" :class="{ 'p-invalid': fields.district.error }"
                    v-model="selectedDistrict" :options="oDistricts" :filter="true" filterPlaceholder="Tìm kiếm"
                    optionLabel="name" placeholder="-Chọn Quận/Huyện-" @change="getStreet()" />
                </div>
                <div class="field col-4">
                  <label>Phường, xã<span class="text-danger">*</span></label>
                  <!-- <InputText class="w-100" type="text" v-model="street" /> -->
                  <Dropdown class="w-100 line-height-1" :class="{ 'p-invalid': fields.street.error }"
                    v-model="selectedStreet" :options="oStreets" :filter="true" filterPlaceholder="Tìm kiếm"
                    optionLabel="name" placeholder="-Chọn Phố/Phường-" @change="onSelectStreet()" optionValue="value" />
                </div>
                <div class="field col-12">
                  <label>Địa chỉ cụ thể<span class="text-danger">*</span></label>
                  <InputText class="w-100" :class="{ 'p-invalid': fields.houseNumber.error }" type="text"
                    v-model="houseNumber" />
                </div>
                <div class="field col-6">
                  <label>Ngân hàng<span class="text-danger">*</span></label>
                  <Dropdown class="w-100 line-height-1" :class="{ 'p-invalid': fields.bankName.error }"
                    v-model="selectedBank" :options="oBanks" :filter="true" filterPlaceholder="Tìm kiếm"
                    optionLabel="name" placeholder="-Chọn Ngân hàng-" @change="onSelectBank()" />
                </div>
                <div class="field col-6">
                  <label>Số tài khoản<span class="text-danger">*</span></label>
                  <InputText class="w-full" :class="{ 'p-invalid': fields.bankAccountNum.error }" type="text"
                    v-model="bankAccountNum" />
                </div>

                <div class="field col-4">
                  <label>Ngày tạo</label>
                  <input
                    class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                    type="text" v-model="dateCreated" disabled />
                </div>
                <div class="field col-4">
                  <label>Ngày cập nhật</label>
                  <input
                    class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                    type="text" v-model="dateUpdated" disabled />
                </div>
                <div class="field col-4">
                  <label>Ngày cấm</label>
                  <input
                    class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                    type="text" v-model="dateDeleted" disabled />
                </div>
                <div class="field col-12 justify-content-center flex">
                  <div v-if="curThread === 'ADD'">
                    <Button class="btn-final border-10" type="submit" label="Tạo mới" />
                  </div>
                  <div v-else-if="curThread === 'UPDATE'">
                    <Button class="btn-final border-10" type="submit" label="Cập nhật" />
                  </div>
                  <div v-else>
                    <Button class="btn-final border-10" label="Button" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="md:col-4 sm:col">
            <div class="card-control">
              <div class="card-header font-medium text-xl">Ảnh Đại Diện<span class="text-danger">*</span></div>
              <div class="p-5 text-center">

                <div :class="{ 'input-invalid': fields.fileCitizenId.error }"
                  class="w-100 text-center surface-overlay p-1 border-1 border-solid surface-border border-10 w-full">
                  <ImagePreview
                    :src="portraitUrl || 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'"
                    alt="Image" class="w-100" preview imageStyle="width: 100%" />
                  <input ref="portrait" class="hidden" type="file" @change="onUploadFile($event, 'Portrait')"
                    accept="image/*" />
                  <Button class="btn-primary border-10" @click="openPortraitInput">Chọn ảnh</Button>
                </div>
              </div>
            </div>
            <div class="card-control mt-3">
              <div class="card-header font-medium text-xl">Ảnh CCCD<span class="text-danger">*</span></div>
              <div class="p-5 text-center">
                <div :class="{ 'input-invalid': fields.filePortrait.error }"
                  class="w-100 text-center surface-overlay p-1 border-1 border-solid surface-border border-10 w-full">
                  <ImagePreview
                    :src="citizenIdUrl || 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'"
                    alt="Image" class="w-100" preview imageStyle="width: 100%" />
                  <input class="hidden" ref="citizenid" type="file" @change="onUploadFile($event, 'CitizenId')"
                    accept="image/*" />
                  <Button class="btn-primary border-10" @click="openCitizenInput">Chọn ảnh</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
    
<script lang="ts" >
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { GENDER_OPTION, ROLE_OPTION_ADMIN, ROLE_OPTION_MOD } from '~/utils'
import { Option } from '~/models/Option'
import { User } from '~/models/User'
const nsStoreUser = namespace('user/store-user')
const nsStoreAddress = namespace('address/store-address')
const nsUser = namespace('user-auth/store-user')
const nsStoreBank = namespace('bank/store-bank')

@Component({
  middleware: ['authenticate'],
  layout: 'admin',
})
class DetailUser extends Vue {
  //data
  name: string = ''
  phone: string = ''
  email: string = ''
  cccd: string = ''
  houseNumber: string = ''
  city: string = ''
  district: string = ''
  street: string = ''
  dob: Date = new Date()
  gender: any = 'MALE'
  dateCreated: string = ''
  dateUpdated: string = ''
  dateDeleted: string = ''
  bankCode: string = ''
  bankName: string = ''
  bankAccountNum: string = ''
  filePortrait: any = null
  fileCitizenId: any = null
  //format

  fields: any = {
    name: { label: 'Tên người dùng', required: true, error: false, value: '' },
    phone: { label: 'Số điện thoại', required: true, error: false, value: '' },
    email: { label: 'Email', required: true, error: false, value: '' },
    cccd: { label: 'Số CCCD', required: true, error: false, value: '' },
    gender: { label: 'Giới tính', required: true, error: false, value: '' },
    dob: { label: 'Ngày sinh', required: true, error: false, value: '' },
    city: { label: 'Thành phố', required: true, error: false, value: '' },
    district: { label: 'Quận, huyện', required: true, error: false, value: '' },
    street: { label: 'Phường, xã', required: true, error: false, value: '' },
    houseNumber: { label: 'Địa chỉ', required: true, error: false, value: '' },
    filePortrait: { label: 'Ảnh chân dung', required: true, error: false, value: '' },
    fileCitizenId: { label: 'Ảnh thẻ cccd/cmnd mặt trước', required: true, error: false, value: '' },
    bankName: { label: 'Ngân hàng', required: true, error: false, value: '' },
    bankAccountNum: { label: 'Số tài khoản', required: true, error: false, value: '' },
    curSubject: { label: 'Quyền hạn', required: true, error: false, value: '' },
  }
  //temp
  portraitUrl: string = ''
  citizenIdUrl: string = ''
  curThread: string = 'ADD'
  curSubject: string = ''
  curUserId: string = ''
  //option data
  oGenders = GENDER_OPTION
  oRoles: any = null
  selectedCity: Option.Option | null = null
  selectedDistrict: Option.Option | null = null
  selectedStreet: Option.Option | null = null
  selectedBank: any | null = null
  option: Option.Option | undefined
  oCitys: Option.Option[] = []
  oDistricts: Option.Option[] = []
  oStreets: Option.Option[] = []
  oBanks: any[] = []

  @nsUser.State('user')
  user!: User.Model | undefined
  @nsStoreUser.Action
  actGetUser!: (params: { userId: string }) => Promise<any>
  @nsStoreUser.Action
  actCreateMod!: (params: any) => Promise<any>
  @nsStoreUser.Action
  actCreateExpert!: (params: any) => Promise<any>
  @nsStoreUser.Action
  actUpdateUser!: (params: any) => Promise<any>
  @nsStoreAddress.Action
  actGetCity!: () => Promise<string>
  @nsStoreAddress.Action
  actGetDistrict!: (params: any) => Promise<string>
  @nsStoreAddress.Action
  actGetStreet!: (params: any) => Promise<string>
  @nsStoreBank.Action
  actGetBanksList!: () => Promise<string>

  async mounted() {
    this.fetchData()
    const role = this.user?.role.id
    if (role == 1) {
      this.oRoles = ROLE_OPTION_MOD
    } else if (role == 5) {
      this.oRoles = ROLE_OPTION_ADMIN
    }
    await this.GetCity()
    await this.getDistrict()
    await this.getStreet()
    await this.GetBank();
  }
  async fetchData() {
    this.curUserId =
      (Array.isArray(this.$route.query.userId)
        ? this.$route.query.userId[0]
        : this.$route.query.userId) || ''

    // this.curSubject =
    //   (Array.isArray(this.$route.query.subject)
    //     ? this.$route.query.subject[0]
    //     : this.$route.query.subject) || 'MOD'
    if (this.curUserId) {
      this.curThread = 'UPDATE'
      const params = {
        userId: this.curUserId || '',
      }
      const result = await this.actGetUser(params)
      console.log(result)
      this.curSubject = result.role.id
      this.name = result.name
      this.phone = result.phone
      this.email = result.email
      this.cccd = result.citizenId
      this.houseNumber = result.houseNumber
      this.street = result.street
      this.district = result.district
      this.city = result.city
      this.dob = this.getDate(result.doB)
      this.dateCreated = this.formatDate(result.created)
      this.dateUpdated = this.formatDate(result.updated)
      this.dateDeleted = result.deleted ? this.formatDate(result.deleted) : ''
      this.bankCode = result.bankCode
      this.bankName = result.bankName
      this.bankAccountNum = result.bankAccountNum
    } else {
    }
  }
  async GetCity() {
    const response: any = await this.actGetCity()
    this.oCitys = response.map((city: any) => ({
      id: city.code,
      name: city.name,
      value: city.codename,
    }))
    this.selectedCity =
      this.oCitys.find((city) => city.value === this.city) || null
  }
  async getDistrict() {
    if (this.selectedCity == undefined || this.selectedCity == null) return
    this.city = this.selectedCity.value
    const response: any = await this.actGetDistrict({
      cityId: this.selectedCity?.id,
    })
    this.oDistricts = response.districts.map((district: any) => ({
      id: district.code,
      name: district.name,
      value: district.codename,
    }))
    this.selectedDistrict =
      this.oDistricts.find((district) => district.value === this.district) ||
      null
  }
  async getStreet() {
    if (this.selectedDistrict == undefined || this.selectedDistrict == null)
      return
    this.district = this.selectedDistrict.value
    const response: any = await this.actGetStreet({
      districtId: this.selectedDistrict?.id,
    })
    this.oStreets = response.wards.map((street: any) => ({
      id: street.code,
      name: street.name,
      value: street.codename,
    }))
    this.selectedStreet =
      this.oStreets.find((street) => street.value === this.street) || null
  }
  onSelectCity() {
    this.district = ''
    this.street = ''
    this.oStreets = []
    this.getDistrict()
  }
  onSelectStreet() {
    if (this.selectedStreet == undefined || this.selectedStreet == null)
      return
    this.street = this.selectedStreet.value
  }
  async GetBank() {
    const response: any = await this.actGetBanksList()
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
  async createUser() {
    const params = {
      subject: this.curSubject,
      name: this.name,
      phone: this.phone,
      email: this.email,
      houseNumber: this.houseNumber,
      city: this.city,
      district: this.district,
      street: this.street,
      citizenId: this.cccd,
      gender: this.gender,
      doB: this.parseDate(this.dob),
      bankAccountNum: this.bankAccountNum,
      bankCode: this.bankCode,
      bankName: this.bankName,
      RawCitizenIdImage: this.fileCitizenId,
      RawPortrait: this.filePortrait,
      // address: this.getAddress(this.houseNumber, this.selectedStreet?.name, this.selectedDistrict?.name, this.selectedCity?.name)
      address: this.houseNumber + ', ' + this.selectedStreet?.name + ', ' + this.selectedDistrict?.name + ', ' + this.selectedCity?.name
    }
    let result
    if (this.curSubject === 'MOD') {
      result = await this.actCreateMod(params)
    } else if (this.curSubject === 'EXP') {
      result = await this.actCreateExpert(params)
    } else {
      this.$store.commit(
        'commons/store-error/setError',
        'Chưa chọn loại tài khoản muốn tạo'
      )
    }
    if (result) {
      this.$toast.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Yêu cầu thành công',
        life: 3000,
      })
      this.$router.push('/admin/user')
    }
  }
  async UpdateUser() {
    console.log(this.dob)
    const params = {
      userId: this.curUserId,
      name: this.name,
      phone: this.phone,
      email: this.email,
      houseNumber: this.houseNumber,
      city: this.city,
      district: this.district,
      street: this.street,
      citizenId: this.cccd,
      gender: this.gender,
      doB: this.parseDate(this.dob),
    }
    const result = await this.actUpdateUser(params)
    if (result) {
      this.$toast.add({
        severity: 'success',
        summary: 'Success Message',
        detail: 'Cập nhật thành công',
        life: 3000,
      })
      this.$router.push('/admin/user/view?userId=' + this.curUserId)
    }
  }
  async formSubmit() {
    if (this.checkValid()) {
      if (this.curThread === 'UPDATE') {
        await this.UpdateUser();
      }
      else if (this.curThread === 'ADD') {
        await this.createUser();
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
  fetchFormData() {
    for (const fieldName in this.fields) {
      if (this.fields.hasOwnProperty(fieldName)) {
        this.fields[fieldName].value = (this as any)[fieldName];
        this.fields[fieldName].error = false
      }
    }
  }
  checkValid() {
    console.log(this.street)
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
    if (!emailRegex.test(this.fields.email.value)) {
      this.fields.email.error = true;
      this.$store.commit('commons/store-error/setError', "email không đúng định dạng")
      return false
    }
    // console.log(this.fields.dob.value)
    return true
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
  getAddress(houseNumber: any, street: any, district: any, city: any,) {
    let address = ''
    if (houseNumber.trim() !== "") {
      address += houseNumber.trim() + " ";
    }

    if (street.trim() !== "") {
      address += street.trim() + ", ";
    }

    if (district.trim() !== "") {
      address += district.trim() + ", ";
    }

    if (city.trim() !== "") {
      address += city.trim();
    }
    return address
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
  openPortraitInput() {
    const inputRef = this.$refs.portrait as HTMLInputElement | undefined;
    if (inputRef) {
      inputRef.click();
    }
  }
  openCitizenInput() {
    const inputRef = this.$refs.citizenid as HTMLInputElement | undefined;
    if (inputRef) {
      inputRef.click();
    }
  }
}
export default DetailUser
</script>

<style lang="sass" scoped>
.header
  height: 90px
  background: #fff
  width: auto
  align-items: center
  display: flex
  padding: 2rem
  color: #a16b56
  text-transform: uppercase
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

.card-body
  margin: 1rem
  background: #fff
  border-radius: 10px
  padding: 1rem

table .p-datatable-thead
  background: #ead9d2

.p-datatable.p-datatable-striped .p-datatable-tbody > tr:nth-child(even)
  background-color: #fbf8f7 !important

.element
  @include overflow-ellipsis(400px)
</style>
            