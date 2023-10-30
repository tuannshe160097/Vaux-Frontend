// View User Detail
<template>
  <div class="userdetails-page-container flex flex-column">
    <h3>Thông tin người dùng</h3>
    <div class="grid">
      <div class="col-4">
        <div class="card-control">
          <div class="card-header font-medium text-xl">Ảnh Đại Diện</div>
          <div class="card-body p-5 text-center">
            <img
              class="rounded-circle mb-2"
              src="http://bootdey.com/img/Content/avatar/avatar1.png"
              alt=""
            />
            <div class="small font-italic text-muted mb-4">
              JPG or PNG no larger than 5 MB
            </div>
            <Button>Chọn ảnh đại diện</Button>
          </div>
        </div>
        <div class="card-control mt-3">
          <div class="card-header font-medium text-xl">Ảnh CCCD</div>
          <div class="card-body p-5 text-center">
            <img
              class="mb-2"
              src="http://bootdey.com/img/Content/avatar/avatar1.png"
              alt=""
            />
            <div class="small font-italic text-muted mb-4">
              JPG or PNG no larger than 5 MB
            </div>
            <Button>Chọn ảnh CCCD</Button>
          </div>
        </div>
      </div>
      <div class="col-8">
        <div class="card-control">
          <div class="card-header font-medium text-xl">Thông tin tài khoản</div>
          <div class="card-body p-5">
            <div class="field">
              <label>Tên</label>
              <input
                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                type="text"
                v-model="name"
              />
            </div>
            <div class="field">
              <label>Số điện thoại</label>
              <input
                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                type="text"
                v-model="phone"
              />
            </div>
            <div class="field">
              <label>Email</label>
              <input
                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                type="text"
                v-model="email"
              />
            </div>
            <div class="field">
              <label>Số CCCD</label>
              <input
                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                type="text"
                v-model="cccd"
              />
            </div>
            <div class="field">
              <label>Địa chỉ</label>
              <input
                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                type="text"
                v-model="address"
              />
            </div>
            <div class="field">
              <label>Quyền hạn</label>
              <input
                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                type="text"
                v-model="role"
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
            <div class="field"><Button label="Cập nhật" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script >
export default {
  name: 'DetailUser',
  layout: 'default',
  data() {
    return {
      name: '',
      phone: '',
      email: '',
      cccd: '',
      address: '',
      role: '',
      dateCreated: '',
      dateUpdated: '',
      dateDeleted: '',
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        const userId = this.$route.query.userId
        console.log('LTA: ' + userId)
        const result = await this.$axios.get(
          process.env.BASE_URL + `/api/mod/account/${userId}`,
          {}
        )
        console.log(result.data)
        this.name = result.data.name
        this.phone = result.data.phone
        this.email = result.data.email
        this.cccd = result.data.citizenId
        this.address =
          result.data.houseNumber +
          ', ' +
          result.data.street +
          ', ' +
          result.data.district +
          ', ' +
          result.data.city
        this.role = result.data.role.title
        this.dateCreated = this.formatDate(result.data.created)
        this.dateUpdated = this.formatDate(result.data.updated)
        this.dateDeleted = result.data.deleted?this.formatDate(result.data.deleted):''
      } catch (error) {
        console.log(error)
        if (error.response) {
          console.log('Lỗi khi xử lý yêu cầu:', error.response.data)
          if ([401, 403].includes(error.response.status)) {
            this.$router.push('/authen/login')
          }
        } else {
          console.error('Lỗi khi gửi yêu cầu:', error)
        }
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      const day = date.getDate().toString().padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0') // Tháng trong JavaScript bắt đầu từ 0
      const year = date.getFullYear()
      return `${day}-${month}-${year}`
    },
  },
}
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
            