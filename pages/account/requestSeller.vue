//Request seller
<template>
  <div class="userdetails-page-container flex flex-column">
    <h3>Đăng ký tài khoản người bán</h3>
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
              <label>Giới tính</label>
              <div class="field-radiobutton">
                <RadioButton
                  name="gender"
                  value="Chicago"
                  v-model="gender"
                ></RadioButton>
                <label>Nam</label>
              </div>
              <div class="field-radiobutton">
                <RadioButton
                  name="gender"
                  value="Los Angeles"
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
                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full"
                type="text"
              />
            </div>
            <div class="field">
              <label>Email</label>
              <input
                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full"
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
              <Textarea
                class="w-full"
                v-model="value1"
                rows="15"
                cols="100"
              ></Textarea>
            </div>
            <div class="field"><Button label="Cập nhật" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
      
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
class requestSeller extends Vue {}
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
                