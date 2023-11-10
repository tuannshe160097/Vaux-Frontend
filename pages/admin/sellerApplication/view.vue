// View User Detail
<template>
  <div class="box-page-container flex flex-column">
    <div class="header flex justify-content-between container">
      <div class="col-fixed">
        <h2 class="font-bold m-0 text-uppercase">Thông tin người dùng</h2>
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
                <span>Thông tin tài khoản</span>
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
                <InputText class="w-100" type="text" v-model="phone" />
              </div>
              <div class="field col-4">
                <label>Email</label>
                <InputText class="w-100" type="text" v-model="email" />
              </div>
              <div class="field col-4">
                <label>Giới tính</label>
                <Dropdown class="w-100" v-model="gender" :options="oGenders" optionLabel="name" optionValue="value" />
              </div>
              <div class="field col-4">
                <label>Ngày sinh</label>
                <Calendar class="w-100" v-model="dob" dateFormat="dd-mm-yy" />
              </div>
              <div class="field col-12">
                <label>Địa chỉ</label>
                <InputText class="w-100" type="text" v-model="houseNumber" />
              </div>
              <div class="field col-4">
                <label>Phường, xã</label>
                <InputText class="w-100" type="text" v-model="street" />
              </div>
              <div class="field col-4">
                <label>Quận, huyện</label>
                <InputText class="w-100" type="text" v-model="district" />
              </div>
              <div class="field col-4">
                <label>Thành phố</label>
                <InputText class="w-100" type="text" v-model="city" />
              </div>
              <div class="field col-12">
                <label>Số CCCD</label>
                <InputText class="w-100" type="text" v-model="cccd" />
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
                <Textarea class="text-left w-full" v-model="content" rows="15" cols="100" placeholder="Ghi chú..." />
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
              <div v-if="appId != null" class="field col-12 justify-content-center flex">
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
const nsStoreSeller = namespace('seller/store-seller')

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
  citizenIdUrl: string = ''
  portraitUrl: string = ''
  content: string = ''
  dateCreated: string = ''
  dateUpdated: string = ''
  dateDeleted: string = ''

  imagePortrait: any | null
  imageCccd: any | null
  //option data
  oGenders = GENDER_OPTION

  @nsStoreSeller.Action
  actGetSeller!: (params: any) => Promise<any>
  @nsStoreSeller.Action
  actGetImageSeller!: (imageId: any) => Promise<any>
  @nsStoreSeller.Action
  actApproveSeller!: (params: any) => Promise<any>
  @nsStoreSeller.Action
  actDenySeller!: (params: any) => Promise<any>

  async mounted() {
    this.fetchData()
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
      this.citizenIdUrl = 'https://localhost:6565'+'/api/Seller/Application/Get/Image/'+result.citizenIdImageId
      this.portraitUrl = 'https://localhost:6565'+'/api/Seller/Application/Get/Image/'+result.portraitId
      this.content = result.content

      // this.citizenIdUrl = `data:image/*;base64,${await this.blobToBase64(blobCccd)}`;
      // this.citizenIdUrl = URL.createObjectURL(blobCccd);

      // this.portraitUrl = URL.createObjectURL(blobPortrait);

      console.log(this.citizenIdUrl);
      console.log(this.portraitUrl);
      // this.dateCreated = this.formatDate(result.created)
      // this.dateUpdated = this.formatDate(result.updated)
      // this.dateDeleted = result.deleted ? this.formatDate(result.deleted) : ''
    }
    else {
      this.$store.commit('commons/store-error/setError', "Không tìm thấy thông tin application Id")
    }
  }
  formatDate(dateString: string) {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Tháng trong JavaScript bắt đầu từ 0
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  async onAccept() {
    const params = {
      applicationId: this.appId || '',
    }
    const result = await this.actApproveSeller(params)
    this.$toast.add({severity: 'info', summary: 'Success', detail: 'Đã đồng ý đơn duyệt', life: 10000})
    console.log(result)
  }
  async onDeny() {
    const params = {
      applicationId: this.appId || '',
    }
    const result = await this.actDenySeller(params)
    this.$toast.add({severity: 'info', summary: 'Success', detail: 'Đã từ chối đơn duyệt', life: 10000})
    console.log(result)
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
            