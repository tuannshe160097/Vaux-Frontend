<template>
  <section class="surface-0 flex align-items-center justify-content-center min-h-screen  p-2">
    <div class="box-page-container flex flex-column container">
      <Breadcrumb :home="home" :model="items" />
      <div class="card-body my-3">
        <div class="grid formgrid">
          <div class="field col-12">
            <h2 class="font-bold text-brown">Tạo sản phẩm mới</h2>
          </div>
          <div class="field col-12">
            Hãy cho chúng tôi biết mọi thứ về sản phẩm của bạn bằng cách điền
            thông tin chi tiết bên dưới. Nếu bạn không chắc chắn về điều gì đó,
            đừng lo lắng! Một chuyên gia sẽ xem xét bài đăng của bạn.
          </div>
        </div>
        <div class="grid formgrid">
          <h4 class="text-brown font-bold col-12">1. Thông tin cơ bản</h4>
          <div class="field col-12">
            <!-- <h4 class="font-bold">Tên sản phẩm</h4> -->

            <label>Tên sản phẩm</label>
            <InputText class="w-100" type="text" v-model="name" />
            <!-- <input
              class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
              type="text" v-model="name" placeholder="Nhập tên sản phẩm" /> -->
          </div>
          <div class="field md:col-4 col-12">
            <label>Thể loại</label>
            <Dropdown class="w-100" v-model="selectedCity1" :options="cities" optionLabel="name"
              placeholder="Chọn thể loại" />
          </div>
        </div>
        <div class="grid formgrid">
          <h4 class="col-12 font-bold text-brown">2. Hình ảnh</h4>
          <span class="col-12">
            Tải lên những bức ảnh thể hiện rất nhiều điều của bạn theo cách tốt
            nhất. Hãy nhớ đưa vào những nội dung khác nhau và đặt bức ảnh đẹp nhất
            của bạn lên hàng đầu.
          </span>
          <div class="field col-8  text-center">
              <FileUpload name="demo[]" :customUpload="true" @uploader="myUploader" :multiple="true" accept="image/*"
                :maxFileSize="5242880" :fileLimit="20" showUploadButton="false" showCancelButton="false" 
                invalidFileSizeMessage="File ảnh được chấp nhận không quá 5mb"
                invalidFileTypeMessage="Chỉ chấp nhận ảnh có đuôi là jpg hoặc png">
                <template #empty>
                  <p>Danh sách ảnh đã tải lên</p>
                </template>
              </FileUpload>
          </div>
          <div class="field col-4">
            <div class="card-header font-medium text-xl">Lưu ý</div>
            <div class="card-body p-5">
              <div class="field">
                <label>*Tối thiểu 5 ảnh</label>
                <label>*Người bán thành công tải lên ít nhất 8 ảnh </label>
                <label>*Sử dụng ánh sáng hợp lý</label>
              </div>
            </div>
          </div>
        </div>
        <div class="grid formgrid">
          <h4 class="col-12 font-bold text-brown">3. Mô tả sản phẩm</h4>
          <span class="col-12">
            Thêm mô tả chi tiết về sản phẩm của bạn. Cung cấp nhiều thông tin hơn
            sẽ giúp khách hàng của bạn tin tưởng sản phẩm hơn
          </span>
          <div class="field col-12">
            <Textarea class="text-left w-full" :autoResize="true" v-model="description" rows="5"
              placeholder="Sử dụng phần này để thêm thông tin mô tả." style="height: 3rem;" />
          </div>
        </div>
        <div class="grid formgrid">
          <h4 class="col-12 font-bold text-brown">4. Giá sàn</h4>
          <span class="col-12">
          </span>
          <div class="field col-12 md:col-4">
            <InputNumber class="text-right w-full" suffix=" vnđ" v-model="reversePrice"/>
          </div>
        </div>
        <div class="grid formgrid">
          <div class="col-12">

          </div>
        </div>
        <div class="grid formgrid">
          <div class="field col-12 flex justify-content-center">
            <Button class="mx-2" label="Trao đổi với người bán hàng" />
            <Button class="mx-2 btn-danger" label="Hủy bỏ" />
            <Button class="mx-2 btn-success" label="Chấp Nhận" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { confirmDelete } from '~/utils/commons/helper'
const nsStoreCategory = namespace('category/store-category')

@Component({
  middleware: ['authenticate'],
  layout: 'public',
  meta: {
    role: [3]
  }
})
class CategoryList extends Vue {
  home = { icon: 'pi pi-home', to: '/homepage' }
  items = [
    { label: 'Kênh bán', to: '/Seller' },
    { label: 'Tạo sản phẩm' }
  ]
  // methods: {
  // 	onUpload() {
  // 		this.$toast.add({severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000})
  // 	}
  // }
}
export default CategoryList
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

.element
  @include overflow-ellipsis(400px)
</style>
