// View User Detail
<template>
  <div class="box-page-container flex flex-column">
    <div class="header flex justify-content-between container">
      <div class="col-fixed">
        <h2 class="font-bold m-0 text-uppercase">Đơn xin quyền người bán</h2>
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
      <div class="col-fixed grid">
        <div class="col-2"></div>
        <div class="md:col-8 sm:col-12">
          <div class="card-control card">
            <div class="card-header justify-content-between flex align-items-center"
              style="padding: 0.8rem 1.5rem !important">
              <div class="title text-xl flex">
                <span>Thông tin đơn</span>
              </div>
              <div class="card-action"></div>
            </div>
            <div class="p-4 grid formgrid">
              <div class="field col-12">
                <label>Họ và tên</label>
                <InputText class="w-100" type="text" v-model="name" disabled />
              </div>
              <div class="field col-12">
                <label>Số điện thoại</label>
                <InputText class="w-100" type="text" v-model="phone" disabled />
              </div>
              <div class="field col-4">
                <label>Email</label>
                <InputText class="w-100" type="text" v-model="email" disabled />
              </div>
              <div class="field col-4">
                <label>Giới tính</label>
                <Dropdown class="w-100" v-model="gender" :options="oGenders" optionLabel="name" optionValue="value"
                  disabled />
              </div>
              <div class="field col-4">
                <label>Ngày sinh</label>
                <Calendar class="w-100" v-model="dob" dateFormat="dd-mm-yy" disabled />
              </div>
              <div class="field col-4">
                <label>Thành phố</label>
                <!-- <InputText class="w-100" type="text" v-model="city" disabled /> -->
                <Dropdown class="w-100 line-height-1" v-model="selectedCity" :options="oCitys" :filter="true"
                  filterPlaceholder="Tìm kiếm" optionLabel="name" placeholder="-Chọn Thành phố-" @change="onSelectCity()"
                  disabled />
              </div>
              <div class="field col-4">
                <label>Quận, huyện</label>
                <!-- <InputText class="w-100" type="text" v-model="district" disabled /> -->
                <Dropdown class="w-100 line-height-1" v-model="selectedDistrict" :options="oDistricts" :filter="true"
                  filterPlaceholder="Tìm kiếm" optionLabel="name" placeholder="-Chọn Quận/Huyện-" @change="getStreet()"
                  disabled />
              </div>
              <div class="field col-4">
                <label>Phường, xã</label>
                <!-- <InputText class="w-100" type="text" v-model="street" disabled /> -->
                <Dropdown class="w-100 line-height-1" v-model="street" :options="oStreets" :filter="true"
                  filterPlaceholder="Tìm kiếm" optionLabel="name" placeholder="-Chọn Phố/Phường-" optionValue="value"
                  disabled />
              </div>
              <div class="field col-12">
                <label>Địa chỉ</label>
                <InputText class="w-100" type="text" v-model="houseNumber" disabled />
              </div>
              <div class="field col-12">
                <label>Số CCCD</label>
                <InputText class="w-100" type="text" v-model="cccd" disabled />
              </div>
              <div class="field col-6">
                <label>Ảnh chân dung</label>
                <div class="w-100 text-center surface-overlay p-1 border-1 border-solid surface-border border-10 w-full">
                  <ImagePreview :src="portraitUrl || require('~/assets/images/default.jpg')" alt="Image"
                    imageClass="w-max-100" imageStyle="height:200px;object-fit: contain" />
                </div>
              </div>
              <div class="field col-6">
                <label>Ảnh cccd/cmnd</label>
                <div class="w-100 text-center surface-overlay p-1 border-1 border-solid surface-border border-10 w-full">
                  <ImagePreview :src="citizenIdUrl || require('~/assets/images/default.jpg')
                  " imageClass="w-max-100" imageStyle="height:200px;" alt="Image" />
                </div>
              </div>
              <div class="field col-12">
                <label>Nội dung muốn bán</label>
                <Textarea class="text-left w-full" v-model="content" rows="15" cols="100" placeholder="Ghi chú..."
                  disabled />
              </div>
              <div class="field col-12">
                <label>Phản hồi từ người bán</label>
                <Textarea class="text-left w-full" v-model="reason" rows="15" cols="100" placeholder="Lý do..." />
              </div>
            <!-- <div class="field col-4">
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
                </div> -->
              <div v-if="appId != null && appStatus == 1" class="field col-12 justify-content-center flex">
                <Button class="btn-danger border-10" label="Từ chối" @click="onDeny()" />
                <Button class="ml-3 btn-success border-10" label="Đồng ý" @click="onAccept()" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script lang="ts" >
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { GENDER_OPTION } from '~/utils'
import { Option } from '~/models/Option'
const nsStoreSeller = namespace('seller/store-seller')
const nsStoreAddress = namespace('address/store-address')

@Component({
  middleware: ['authenticate'],
  layout: 'admin',
})
class ViewUser extends Vue {
  appId: string | null = ''
  name: string = ''
  phone: string = ''
  email: string = ''
  gender: string = ''
  dob: string = ''
  houseNumber: string = ''
  street: string = ''
  city: string = ''
  district: string = ''
  cccd: string = ''
  citizenIdUrl: string | ArrayBuffer | null = ''
  portraitUrl: any = ''
  content: string = ''
  reason: string = ''
  dateCreated: string = ''
  dateUpdated: string = ''
  dateDeleted: string = ''

  appStatus: any = null

  imagePortrait: any | null
  imageCccd: any | null
  //option data
  oGenders = GENDER_OPTION
  selectedCity: Option.Option | null = null
  selectedDistrict: Option.Option | null = null
  selectedStreet: Option.Option | null = null
  option: Option.Option | undefined
  oCitys: Option.Option[] = []
  oDistricts: Option.Option[] = []
  oStreets: Option.Option[] = []


  @nsStoreSeller.Action
  actGetSeller!: (params: any) => Promise<any>
  @nsStoreSeller.Action
  actGetImageSeller!: (imageId: any) => Promise<any>
  @nsStoreSeller.Action
  actApproveSeller!: (params: any) => Promise<any>
  @nsStoreSeller.Action
  actDenySeller!: (params: any) => Promise<any>
  @nsStoreAddress.Action
  actGetCity!: () => Promise<string>
  @nsStoreAddress.Action
  actGetDistrict!: (params: any) => Promise<string>
  @nsStoreAddress.Action
  actGetStreet!: (params: any) => Promise<string>

  async mounted() {
    this.fetchData()
    await this.GetCity()
    await this.getDistrict()
    await this.getStreet()
  }
  async fetchData() {
    this.appId = Array.isArray(this.$route.query.appliId)
      ? this.$route.query.appliId[0]
      : this.$route.query.appliId
    if (this.appId) {
      const params = {
        appId: this.appId || '',
      }
      const result = await this.actGetSeller(params)
      console.log(result)
      this.name = result.user.name
      this.phone = result.user.phone
      this.email = result.email
      this.cccd = result.citizenId
      this.dob = this.formatDate(result.doB)
      this.gender = result.gender
      this.houseNumber = result.houseNumber
      this.street = result.street
      this.district = result.district
      this.city = result.city
      this.portraitUrl = await this.getImageUrl(result.portraitId)
      this.citizenIdUrl = await this.getImageUrl(result.citizenIdImageId)
      this.content = result.content
      this.reason = result.reason
      this.appStatus = result.status
      console.log(result.id, '???' , result.appStatus)
    }
    else {
      this.$store.commit('commons/store-error/setError', "Không tìm thấy thông tin application Id")
    }
  }
  async getImageUrl(imgId: any): Promise<string | ArrayBuffer | null> {
    try {
      const response = await this.actGetImageSeller(imgId);
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onloadend = () => {
          const base64Image = reader.result;
          resolve(base64Image);
        };
      });
    } catch (error) {
      console.error("Error fetching or converting image:", error);
      return null;
    }
  }
  formatDate(dateString: string) {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  async onAccept() {
    const params = {
      applicationId: this.appId || '',
      reason: this.reason || '',
    }
    const result = await this.actApproveSeller(params)
    if (result) {
      this.$toast.add({ severity: 'info', summary: 'Success', detail: 'Đã đồng ý đơn duyệt', life: 10000 })
      this.$router.push('/admin/sellerApplication')
    }
  }
  async onDeny() {
    const params = {
      applicationId: this.appId || '',
      reason: this.reason || '',
    }
    const result = await this.actDenySeller(params)
    if (result) {
      this.$toast.add({ severity: 'info', summary: 'Từ chối thành công', detail: 'Đã từ chối đơn duyệt', life: 10000 })
      this.$router.push('/admin/sellerApplication')
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
}
export default ViewUser
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
            