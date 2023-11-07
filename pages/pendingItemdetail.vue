<template>
  <div class="box-page-container flex flex-column container">
    <div class="header container">
      <div class="col-fixed">
        <h2 class="font-bold m-0 font-size-4xlarge line-height-1">
          Tạo sản phẩm mới
        </h2>
      </div>
    </div>
    <div class="card-body">
      <div class="row justify-content-between">
        <div class="field">
          <h4 class="font-bold">Thêm mô tả chi tiết cho sản phẩm của bạn</h4>
        </div>
        <div class="field">
          <h6 class="card-body p-0">
            Hãy cho chúng tôi biết mọi thứ về sản phẩm của bạn bằng cách điền
            thông tin chi tiết bên dưới. Nếu bạn không chắc chắn về điều gì đó,
            đừng lo lắng! Một chuyên gia sẽ xem xét bài đăng của bạn.
          </h6>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="row justify-content-between">
        <div class="field">
          <h4 class="font-bold">Tên sản phẩm</h4>
          <input
            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
            type="text"
            v-model="name"
            placeholder="Nhập tên sản phẩm"
          />
        </div>
        <div class="field">
          <h4 class="font-bold">Thể loại sản phẩm</h4>
          <Dropdown
            v-model="selectedCity1"
            :options="cities"
            optionLabel="name"
            placeholder="Chọn thể loại"
          />
        </div>
      </div>
    </div>
    <div class="grid card-body">
      <div class="row justify-content-between">
        <h4 class="font-bold">Hình ảnh</h4>
        <h6 class="card-body p-0">
          Tải lên những bức ảnh thể hiện rất nhiều điều của bạn theo cách tốt
          nhất. Hãy nhớ đưa vào những nội dung khác nhau và đặt bức ảnh đẹp nhất
          của bạn lên hàng đầu.
        </h6>
      </div>
      <div class="col-8">
        <div class="card-control">
          <div class="card-header font-medium text-xl">
            Chọn hình ảnh sản phẩm
          </div>
          <div class="card-body p-5 text-center">
            <FileUpload
              name="demo[]"
              url="./upload.php"
              @upload="onUpload"
              :multiple="true"
              accept="image/*"
              :maxFileSize="1000000"
            >
              <template #empty>
                <p>Kéo thả file vào đây để tải ảnh lên.</p>
              </template>
            </FileUpload>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card-control">
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
    </div>
    <div class="card-body">
      <div class="row justify-content-between">
        <div class="field">
          <h4 class="font-bold">Chi tiết</h4>
          <Textarea
            class="text-left w-full"
            v-model="sDescription"
            rows="15"
            cols="100"
            placeholder="Sử dụng phần này để thêm bất kỳ thông tin bổ sung."
          />
        </div>
      </div>
    </div>
    <div class="field">
      <Button class="" label="Trao đổi với người bán hàng" />
      <Button class="" label="Hủy bỏ" />
      <Button class="" label="Chấp Nhận" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { confirmDelete } from '~/utils/commons/helper'
const nsStoreCategory = namespace('category/store-category')

@Component({
  middleware: ['authenticate'],
  layout: 'admin',
})
class CategoryList extends Vue {
  // methods: {
  // 	onUpload() {
  // 		this.$toast.add({severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000})
  // 	}
  // }
}
export default CategoryList
</script>

<style lang="sass" scoped>
.box-page-container
  height: calc(100vh - 100px)

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
