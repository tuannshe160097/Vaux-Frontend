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
        <div class="col-4">
          <div class="card-control">
            <div class="card-header font-medium text-xl">Ảnh Đại Diện</div>
            <div class=" p-5 text-center">
              <ImagePreview
                src="https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg"
                alt="Image"
                class="wm-100"
                preview
                imageStyle="width: 100%"
              />
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
            </div>
          </div>
        </div>
        <div class="col-8">
          <div class="card-control">
            <div class="card-header font-medium text-xl">
              Thông tin tài khoản
            </div>
            <div class="p-4">
              <div class="field">
                <label>Tên</label>
                <input
                  class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                  type="text"
                  v-model="name"
                  disabled
                />
              </div>
              <div class="field">
                <label>Số điện thoại</label>
                <input
                  class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                  type="text"
                  v-model="phone"
                  disabled
                />
              </div>
              <div class="field">
                <label>Email</label>
                <input
                  class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                  type="text"
                  v-model="email"
                  disabled
                />
              </div>
              <div class="field">
                <label>Số CCCD</label>
                <input
                  class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                  type="text"
                  v-model="cccd"
                  disabled
                />
              </div>
              <div class="field">
                <label>Địa chỉ</label>
                <input
                  class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                  type="text"
                  v-model="address"
                  disabled
                />
              </div>
              <div class="field">
                <label>Quyền hạn</label>
                <input
                  class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                  type="text"
                  v-model="role"
                  disabled
                />
              </div>
              <div class="field">
                <label>Ngày tạo</label>
                <input
                  class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                  type="text"
                  v-model="dateCreated"
                  disabled
                />
              </div>
              <div class="field">
                <label>Ngày cập nhật</label>
                <input
                  class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                  type="text"
                  v-model="dateUpdated"
                  disabled
                />
              </div>
              <div class="field">
                <label>Ngày cấm</label>
                <input
                  class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                  type="text"
                  v-model="dateDeleted"
                  disabled
                />
              </div>
              <div class="field"><Button label="Sửa" @click="Edit()" /></div>
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
class ViewUser extends Vue {
  name: string = ''
  phone: string = ''
  email: string = ''
  cccd: string = ''
  address: string = ''
  role: string = ''
  dateCreated: string = ''
  dateUpdated: string = ''
  dateDeleted: string = ''
  curUserId: string =''
  curUserRoleId: any

  @nsStoreUser.Action
  actGetUser!: (params: { userId: string }) => Promise<any>

  async mounted() {
    this.fetchData()
  }
  async fetchData() {
    const userId = Array.isArray(this.$route.query.userId) ? this.$route.query.userId[0] : this.$route.query.userId
    if (userId) {
      this.curUserId = userId
      const params = {
        userId: userId || '',
      }
      const result = await this.actGetUser(params)
      this.name = result.name
      this.phone = result.phone
      this.email = result.email
      this.cccd = result.citizenId
      this.address = ''
      if (result.houseNumber) {
        this.address += result.houseNumber
      }
      if (result.street) {
        this.address += ', ' + result.street
      }
      if (result.district) {
        this.address += ', ' + result.district
      }
      if (result.city) {
        this.address += ', ' + result.city
      }
      this.role = result.role.title
      this.curUserRoleId = result.role.id
      this.dateCreated = this.formatDate(result.created)
      this.dateUpdated = this.formatDate(result.updated)
      this.dateDeleted = result.deleted ? this.formatDate(result.deleted) : ''
    }
  }
  formatDate(dateString: string) {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Tháng trong JavaScript bắt đầu từ 0
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  Edit(){
    let url = '/admin/user/detail?userId=' + this.curUserId
    if(this.curUserRoleId == 5) url + '&subject=ADM'
    else if(this.curUserRoleId == 1) url + '&subject=MOD'
    else if(this.curUserRoleId == 2) url + '&subject=EXP'
    this.$router.push(url)
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
            