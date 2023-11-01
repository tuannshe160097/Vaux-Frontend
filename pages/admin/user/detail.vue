// View User Detail
<template>
  <div class="box-page-container flex flex-column">
    <div class="header flex justify-content-between container">
      <div class="col-fixed">
        <div v-if="curThread === 'ADD'">
          <div v-if="curSubject === 'MOD'">
            <h2 class="font-bold m-0 text-uppercase">
              Tạo tài khoản moderator
            </h2>
          </div>
          <div v-else-if="curSubject === 'EXP'">
            <h2 class="font-bold m-0 text-uppercase">
              Tạo tài khoản chuyên gia kiểm định
            </h2>
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
      <div class="col-fixed grid">
        <div class="md:col-8 sm:col-12">
          <div class="card-control card">
            <div class="card-header font-medium text-xl">
              Thông tin tài khoản
            </div>
            <div class="p-4 grid formgrid">
              <div class="field col-8">
                <label>Tên</label>
                <InputText class="w-100" type="text" v-model="name" />
              </div>
              <div class="field col-4">
                <label>Số điện thoại</label>
                <InputText class="w-100" type="text" v-model="phone" />
              </div>
              <div class="field col-4">
                <label>Email</label>
                <InputText class="w-100" type="text" v-model="email" />
              </div>
              <div class="field col-3">
                <label>Số CCCD</label>
                <InputText class="w-100" type="text" v-model="cccd" />
              </div>
              <div class="field col-2">
                <label>Giới tính</label>
                <Dropdown
                  class="w-100"
                  v-model="gender"
                  :options="oGenders"
                  optionLabel="name"
                  optionValue="value"
                />
              </div>
              <div class="field col-3">
                <label>Ngày sinh</label>
                <Calendar class="w-100" v-model="dob" dateFormat="dd-mm-yy" :locale="vn" />
              </div>
              <div class="field col-6">
                <label>Địa chỉ</label>
                <InputText class="w-100" type="text" v-model="houseNumber" />
              </div>
              <div class="field col-2">
                <label>Phường, xã</label>
                <InputText class="w-100" type="text" v-model="street" />
              </div>
              <div class="field col-2">
                <label>Quận, huyện</label>
                <InputText class="w-100" type="text" v-model="district" />
              </div>
              <div class="field col-2">
                <label>Thành phố</label>
                <InputText class="w-100" type="text" v-model="city" />
              </div>
              <div class="field col-12">
                <label>Quyền hạn</label>
                <input
                  class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                  type="text"
                  v-model="role"
                />
              </div>

              <div class="field col-4">
                <label>Ngày tạo</label>
                <input
                  class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                  type="text"
                  v-model="dateCreated"
                  disabled
                />
              </div>
              <div class="field col-4">
                <label>Ngày cập nhật</label>
                <input
                  class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                  type="text"
                  v-model="dateUpdated"
                  disabled
                />
              </div>
              <div class="field col-4">
                <label>Ngày cấm</label>
                <input
                  class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                  type="text"
                  v-model="dateDeleted"
                  disabled
                />
              </div>
              <div class="field col-12 justify-content-center flex">
                <div v-if="curThread === 'ADD'">
                  <Button label="Tạo mới" @click="createUser()" />
                </div>
                <div v-else-if="curThread === 'UPDATE'">
                  <Button label="Cập nhật" @click="UpdateUser()" />
                </div>
                <div v-else>
                  <Button label="Button" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="md:col-4 sm:col">
          <div class="card-control">
            <div class="card-header font-medium text-xl">Ảnh Đại Diện</div>
            <div class="p-5 text-center">
              <ImagePreview
                src="https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg"
                alt="Image"
                class="wm-100"
                preview
                imageStyle="width: 100%"
              />
              <Button>Xóa ảnh</Button>
            </div>
          </div>
          <div class="card-control mt-3">
            <div class="card-header font-medium text-xl">Ảnh CCCD</div>
            <div class="p-5 text-center">
              <ImagePreview
                src="https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg"
                alt="Image"
                class="wm-100"
                preview
                imageStyle="width: 100%"
              />
              <Button>Xóa ảnh</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script lang="ts" >
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { formatDate } from '~/utils/commons/helper'
const nsStoreUser = namespace('user/store-user')

@Component({
  middleware: ['authenticate'],
  layout: 'admin',
})
class DetailUser extends Vue {
  name: string = ''
  phone: string = ''
  email: string = ''
  cccd: string = ''
  houseNumber: string = ''
  city: string = ''
  district: string = ''
  street: string = ''
  role: string = ''
  dob: string = ''
  gender: any = 'MALE'
  dateCreated: string = ''
  dateUpdated: string = ''
  dateDeleted: string = ''
  curThread: string = 'ADD'
  curSubject: string = 'MOD'
  curUserId: string = ''
  oGenders = [
    { name: 'Nam', value: 'MALE' },
    { name: 'Nữ', value: 'FEMALE' },
  ]

  @nsStoreUser.Action
  actGetUser!: (params: { userId: string }) => Promise<any>
  @nsStoreUser.Action
  actCreateUser!: (params: any) => Promise<any>
  @nsStoreUser.Action
  actUpdateUser!: (params: any) => Promise<any>

  async mounted() {
    this.fetchData()
  }
  async fetchData() {
    this.curUserId =
      (Array.isArray(this.$route.query.userId)
        ? this.$route.query.userId[0]
        : this.$route.query.userId) || ''
    this.curSubject =
      (Array.isArray(this.$route.query.subject)
        ? this.$route.query.subject[0]
        : this.$route.query.subject) || 'MOD'
    if (this.curUserId) {
      this.curThread = 'UPDATE'
      const params = {
        userId: this.curUserId || '',
      }
      const result = await this.actGetUser(params)
      console.log(result)
      this.name = result.name
      this.phone = result.phone
      this.email = result.email
      this.cccd = result.citizenId
      this.houseNumber = result.houseNumber
      this.street = result.street
      this.district = result.district
      this.city = result.city
      this.dob = this.formatDate(result.doB)
      this.role = result.role.title
      this.dateCreated = this.formatDate(result.created)
      this.dateUpdated = this.formatDate(result.updated)
      this.dateDeleted = result.deleted ? this.formatDate(result.deleted) : ''
    } else {
    }
  }

  async createUser() {
    const params = {
      subject: this.curSubject || '',
      name: this.name,
      phone: this.phone,
      email: this.email,
      houseNumber: this.houseNumber,
      city: this.city,
      district: this.district,
      street: this.street,
      citizenId: this.cccd,
      gender: this.gender,
      doB: this.dob,
    }
    const result = await this.actCreateUser(params)
    if (result) {
      this.$toast.add({
        severity: 'success',
        summary: 'Success Message',
        detail: 'Yêu cầu thành công',
        life: 3000,
      })
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
      doB: this.dob,
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
  formatDate(dateString: string) {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Tháng trong JavaScript bắt đầu từ 0
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }
}
export default DetailUser
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
            