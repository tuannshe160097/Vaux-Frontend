<template>
  <div class="adminDetails-page-container flex flex-column">
    <h3>Thông tin quản trị viên</h3>
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
              />
            </div>
            <div class="field">
              <label>Giới tính</label>
              <div class="field-radiobutton">
                <RadioButton
                  name="gender"
                  value="Male"
                  v-model="gender"
                ></RadioButton>
                <label>Nam</label>
              </div>
              <div class="field-radiobutton">
                <RadioButton
                  name="gender"
                  value="Female"
                  v-model="gender"
                ></RadioButton>
                <label>Nữ</label>
              </div>
            </div>
            <div class="field">
              <label>Năm sinh</label><br />
              <Calendar
                class="surface-overlay"
                v-model="date"
                dateFormat="dd/mm/yy"
              >
              </Calendar>
            </div>
            <div class="field">
              <label>Số điện thoại</label>
              <input
                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                type="text"
              />
            </div>
            <div class="field">
              <label>Email</label>
              <input
                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                type="text"
              />
            </div>
            <div class="field">
              <label>Số CCCD</label>
              <input
                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                type="text"
              />
            </div>
            <div class="field">
              <label>Địa chỉ</label>
              <input
                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                type="text"
              />
            </div>
            <div class="field">
              <label>Quyền hạn</label>
              <input
                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                type="text"
              />
            </div>
            <div class="field">
              <label>Ngày tạo</label>
              <input
                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                type="text"
              />
            </div>
            <div class="field">
              <label>Ngày cập nhật</label>
              <input
                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                type="text"
              />
            </div>
            <div class="field">
              <label>Ngày cấm</label>
              <input
                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                type="text"
              />
            </div>
            <div class="field">
              <Button class="m-7">Cấm tài khoản</Button>
              <Button class="m-7">Cảnh báo</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
      
<script>
export default {
  name: 'UserDetail',
  layout: 'default',
  data() {
    return {
      gender : "Male",
      totalItemsCount: 150,
      selectedBoxes: [],
    }
  },
  created() {
    // Gọi API khi component được tạo
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        const result = await this.$axios.get(
          process.env.BASE_URL + '/api/mod/account?pageNum=1&pageSize=20',
          {}
        )
        this.boxData = result.data
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
    viewDetail(id) {
      this.$router.push('/user/detail?id=' + id)
    },
  },
}
</script>

<style scoped>
.card-control {
  display: block;
  background: $white;
  font-weight: 1;
  font-size: 0.875rem;
  line-height: 1;
  color: #69707a;
  background-clip: padding-box;
  border: 1px solid #c5ccd6;
  appearance: none;
  border-radius: 0.35rem;
}
.card-header {
  padding: 1.2rem 1.35rem;
  margin-bottom: 0;
  background-color: rgba(33, 40, 50, 0.03);
  border-bottom: 1px solid rgba(33, 40, 50, 0.125);
}
.rounded-circle {
  border-radius: 50% !important;
}
</style>
              