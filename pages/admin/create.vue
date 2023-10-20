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
              <Button @click="CreateAdmin">Tạo tài khoản</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
      
  <script>
import axios from 'axios'
export default {
  name: 'CreateAdmin',
  layout: 'default',
  data() {
    return {
      phone: '',
      email: '',
      name: '',
      cccd: '',
      address: '',
    }
  },
  methods: {
    async CreateAdmin() {
      try {
        let result = await this.$axios.post(
          process.env.BASE_URL + '/api/Admin/CreateAdmin',
          {
            name: this.name,
            phone: this.phone,
            email: this.email,
            citizenId: this.cccd,
          }
        )
        console.log(result)
        if (result.status === 200) {
          console.log('Yêu cầu thành công')
        }
      } catch (error) {
        if (error.response) {
          console.log('Lỗi Bad Request:', error.response.data)
          // Xử lý lỗi 400 ở đây
        } else {
          console.error('Lỗi khi gửi yêu cầu:', error)
        }
      }
    }
  },
}
</script>
  
  <style lang="sass" scoped>
.card-control
  display: block
  background: $color-white
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
              