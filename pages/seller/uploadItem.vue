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
          <div class="field md:col-8 col-12 ">
            <label>Tên sản phẩm<span class="text-danger">*</span></label>
            <Textarea :class="{ 'input-invalid': error.name }" class="text-left w-full" :autoResize="true" v-model="name"
              rows="1" placeholder="Tên sản phẩm" />
          </div>
          <div class="field md:col-4 col-12">
            <label>Thể loại<span class="text-danger">*</span></label>
            <Dropdown :class="{ 'input-invalid': error.categoryId }" class="w-100 line-height-1" v-model="categoryId"
              :options="oCategories" optionLabel="name" optionValue="id" placeholder="Chọn thể loại" :filter="true"
              filterPlaceholder="Tìm kiếm" />
          </div>
        </div>
        <div class="grid formgrid">
          <h4 class="col-12 font-bold text-brown">2. Hình ảnh</h4>
          <span class="col-12">
            Tải lên những bức ảnh thể hiện rất nhiều điều của bạn theo cách tốt
            nhất. Hãy nhớ đưa vào những nội dung khác nhau và đặt bức ảnh đẹp nhất
            của bạn lên hàng đầu.
          </span>
          <div class="field col-4">
            <div class="card-header font-medium text-xl">Ảnh bìa<span class="text-danger">*</span></div>
            <div class="card-body p-5">
              <div class="field">
                <div :class="{ 'input-invalid': error.fileThumbnail }"
                  class="w-100 text-center surface-overlay p-1 border-1 border-solid surface-border border-10 w-full">
                  <ImagePreview :src="thumbnailUrl || require('~/assets/images/default.jpg')" alt="Image"
                    imageClass="w-max-100" imageStyle="height:200px;object-fit: contain" />
                  <div class="font-italic text-danger mb-2">
                    JPG or PNG no larger than 20 MB
                  </div>
                  <input type="file" @change="onUploadThumbnail($event)" accept="image/*" />
                </div>
              </div>
            </div>
          </div>
          <div class="field col-8  text-center">
            <input type="file" @change="onUploadFile($event)" accept="image/*" multiple />
            <div class="grid formgrid">
              <div v-for="(image, index) in images" :key="index" class="image-item col-3">
                <div id="image-container" class="flex flex-column w-full">
                  <div class="image-container w-full bg-center bg-cover"
                    :style="{ backgroundImage: 'url(' + image.objectURL + ')' }" style="padding-bottom: 100%;">
                  </div>
                  <div class="image-info text-left white-space-nowrap overflow-hidden text-overflow-ellipsis">
                    <span class=" text-overflow-ellipsis">Name: {{ image.name }}</span>
                  </div>
                  <div class="product-list-action p-2 w-100 text-right">
                    <Button class="btn" @click="removeImage(index)" label="Xóa" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="grid formgrid">
          <h4 class="col-12 font-bold text-brown">3. Mô tả sản phẩm<span class="text-danger">*</span></h4>
          <span class="col-12">
            Thêm mô tả chi tiết về sản phẩm của bạn. Cung cấp nhiều thông tin hơn
            sẽ giúp khách hàng của bạn tin tưởng sản phẩm hơn
          </span>
          <div class="field col-12">
            <Textarea class="text-left w-full" :class="{ 'input-invalid': error.description }" :autoResize="true"
              v-model="description" rows="5" placeholder="Sử dụng phần này để thêm thông tin mô tả."
              style="height: 3rem;" />
          </div>
        </div>
        <div class="grid formgrid">
          <h4 class="col-12 font-bold text-brown">4. Giá sàn<span class="text-danger">*</span></h4>
          <span class="col-12">
          </span>
          <div class="field col-12 md:col-4">
            <InputNumber :class="{ 'input-invalid': error.reservePrice }" class="text-right w-full" suffix=" vnđ"
              v-model="reservePrice" />
          </div>
        </div>
        <div class="grid formgrid">
          <h4 class="col-12 font-bold text-brown">5. Thuộc tính</h4>
          <div class="field col-12 md:col-12">
            <DataTable :value="properties" editMode="cell" @cell-edit-complete="onCellEditComplete"
              class="editable-cells-table p-invalid border-bottom-1 border-300" responsiveLayout="scroll">
              <Column field="index" header="STT">
                <template #body="slotProps"><span>{{ slotProps.index + 1 }}</span></template>
              </Column>
              <Column v-for="col of columns" :field="col.field" :header="col.header" :styles="{ width: '50%' }"
                :key="col.field">
                <template #editor="slotProps">
                  <InputText :class="{ 'p-invalid': (!slotProps.data[slotProps.column.field]) }" class="w-full"
                    v-model="slotProps.data[slotProps.column.field]" autofocus />
                </template>
              </Column>
              <Column header="">
                <template #body="slotProps">
                  <Button class="border-0 p-0 ml-1 h-2rem w-2rem justify-content-center " icon="pi pi-times"
                    @click="onDeleteProperty(slotProps.index)">
                  </Button>
                </template>
              </Column>
            </DataTable>
          </div>
          <span class="col-12 field">
            <Button icon="pi pi-plus" label="Thêm dòng" @click="onAddProperty()" />
          </span>
        </div>
        <div class="grid formgrid">
          <div class="field col-12 flex justify-content-center">
            <BlockUI :blocked="blockedAddButton">
              <Button class="mx-2 btn-final" @click="onSubmit()">
                <span v-if="blockedAddButton"><i class="pi pi-spin pi-spinner mr-2"></i> Đang xử
                  lý</span>
                <span v-else> Hoàn thành</span>
              </Button>
            </BlockUI>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
const nsStoreItem = namespace('item/store-seller-item')
const nsCategory = namespace('category/store-category')

@Component({
  middleware: ['authenticate'],
  layout: 'public',
  // meta: {
  //   role: [3, 2]
  // }
})
class CreateItem extends Vue {
  name: string = ''
  categoryId: number = 0
  description: string = ''
  reservePrice: number = 0
  fileThumbnail: any = null
  thumbnailUrl: string = ''

  files: File[] = []
  images: any[] = []

  properties: any[] = []
  columns = [
    { field: 'label', header: 'Tên' },
    { field: 'value', header: 'Giá trị' }
  ];

  error: any = {
    name: false,
    categoryId: false,
    description: false,
    fileThumbnail: false,
    reservePrice: false
  }

  blockedAddButton: boolean = false
  //---------------------------------------
  home = { icon: 'pi pi-home', to: '/homepage' }
  items = [
    { label: 'Kênh bán', to: '/Seller' },
    { label: 'Tạo sản phẩm' }
  ]
  //----------------------------------------
  oCategories: Array<any> | null = null

  @nsCategory.Action
  actGetAllCategory!: () => Promise<any>
  @nsStoreItem.Action
  actAddItemApplication!: (params: any) => Promise<any>
  @nsStoreItem.Action
  actAddItemApplicationImage!: (params: any) => Promise<any>
  @nsStoreItem.Action
  actAddItemApplicationThumbnail!: (params: any) => Promise<any>

  async mounted() {
    const response = await this.actGetAllCategory()
    this.oCategories = response.records
  }
  onUploadFile(event: any) {
    const files: FileList = event.target.files;
    const fileList = Array.from(files);
    if (files != null) {
      for (const file of fileList) {
        if (file.size / 1024 / 1024 > 20) {
          this.$store.commit(
            'commons/store-error/setError',
            'File tải lên quá lớn'
          )
          return
        }
        const objectURL = URL.createObjectURL(file);
        const imageInfo = { objectURL, name: file.name, size: file.size };
        this.images.push(imageInfo);
        this.files.push(file);
      }
    }
    console.log(this.files)
  }
  onUploadThumbnail(event: Event) {
    const inputElement = event.target as HTMLInputElement
    const files = inputElement.files
    if (files && files.length > 0) {
      if (files[0].size / 1024 / 1024 > 20) {
        this.$store.commit(
          'commons/store-error/setError',
          'File tải lên quá lớn'
        )
        return
      }
      this.fileThumbnail = files[0]
      this.thumbnailUrl = URL.createObjectURL(this.fileThumbnail)
    }
  }
  removeImage(index: number) {
    this.$delete(this.images, index);
    this.$delete(this.files, index);
  }
  async onSubmit() {
    if (!this.checkValid()) return
    this.blockedAddButton = true
    this.$toast.add({ severity: 'warn', summary: 'Thành công', detail: 'Đang tạo sản phẩm, Vui lòng đợi trong giây lát', life: 3000 })
    const params = {
      name: this.name,
      categoryId: this.categoryId,
      reservePrice: this.reservePrice,
      description: this.description,
      itemProperties: this.properties,
    }
    const response = await this.actAddItemApplication(params)
    if (response) {
      const result = await this.AddMultiImage(response.id, this.files)
      const result2 = await this.AddImage(response.id, this.fileThumbnail)
      if (result2 && result) {
        this.$toast.add({ severity: 'success', summary: 'Thành công', detail: 'Đã thêm sản phẩm mới', life: 10000 })
      }
    }
    this.blockedAddButton = false
    this.$router.push('/seller')
  }
  checkValid() {
    this.error.name = false
    this.error.categoryId = false
    this.error.fileThumbnail = false
    this.error.description = false
    this.error.reservePrice = false
    if (this.name.trim() == '' || this.name.length > 100) {
      this.error.name = true
      this.$store.commit('commons/store-error/setError', 'Chưa có tên sản phẩm')
      return false
    }
    if (this.categoryId == 0) {
      this.error.categoryId = true
      this.$store.commit('commons/store-error/setError', 'Chưa chọn thể loại')
      return false
    }
    if (this.fileThumbnail == null) {
      this.error.fileThumbnail = true
      this.$store.commit('commons/store-error/setError', 'Chưa có ảnh bìa cho sản phẩm')
      return false
    }
    if (this.images.length < 3 || this.images.length > 10) {
      this.$store.commit('commons/store-error/setError', 'Danh sách ảnh chi tiết cần có ít nhất là 3 ảnh và nhiều nhất là 10 ảnh')
      return false
    }
    if (this.description.trim() == '') {
      this.error.description = true
      this.$store.commit('commons/store-error/setError', 'Chưa có mô tả sản phẩm')
      return false
    }
    if (this.reservePrice < 0) {
      this.error.reservePrice = true
      this.$store.commit('commons/store-error/setError', 'Giá sàn phải lớn hơn hoặc bằng 0 vnđ')
      return false
    }
    return true
  }
  async AddMultiImage(itemId: any, fileList: any) {
    const formData = new FormData();
    for (const file of fileList) {
      formData.append('images', file, file.name)
    }
    const param = {
      formData: formData,
      itemId: itemId,
    }
    return this.actAddItemApplicationImage(param)
  }
  async AddImage(itemId: any, file: any) {
    const formData = new FormData();
    formData.append('image', file, file.name)
    const param = {
      formData: formData,
      itemId: itemId,
    }
    return this.actAddItemApplicationThumbnail(param)
  }
  onCellEditComplete(event: any) {
    let { data, newValue, field } = event;
    switch (field) {
      default:
        if (newValue != null && newValue.trim().length > 0)
          data[field] = newValue;
        else {
          event.preventDefault()
        }
        break;
    }
    // console.log(this.properties)
  }
  onAddProperty() {
    this.properties.push({ label: null, value: null })
  }
  onDeleteProperty(index: any) {
    this.properties.splice(index, 1)
  }
}
export default CreateItem
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
.p-orderlist .p-orderlist-controls 
  display: none
</style>
