<template>
  <div class="category-page-container flex flex-column">
    <div class="grid justify-content-between">
      <div class="col-fixed">
        <h1 class="font-bold m-0 font-size-4xlarge line-height-1">
          Danh sách thể loại
        </h1>
        <span class="text-600 font-size-small" v-if="categories">{{ totalItemsCount }} products found</span>
      </div>
      <div class="col-fixed">
        <div class="grid">
          <div class="col-fixed">
            <InputText class="w-21rem h-3rem" type="text" placeholder="Tìm kiếm"></InputText>
          </div>
          <div class="col-fixed">
            <Button class="w-9rem h-3rem" type="button" label="Thêm Mới" @click="openModelCategory(null)"></Button>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-nogutter flex-1 relative overflow-hidden mt-2">
      <div class="col h-full absolute top-0 left-0 right-0">
        <DataTable class="w-full airtag-datatable h-full flex flex-column" v-if="categories" :value="categories"
          responsiveLayout="scroll" dataKey="id" :resizableColumns="true" :rows="20" :scrollable="false">
          <Column field="id" header="STT" sortable="sortable">
            <template #body="slotProps">
              <span class="">{{ slotProps.index + 1 }}</span>
            </template>
          </Column>
          <Column field="name" className="font-semibold" header="Tên" sortable="sortable"></Column>
          <Column field="description" header="Mô tả" sortable="sortable" className="w-3"></Column>
          <Column field="status" header="TRẠNG THÁI" sortable="sortable" className="p-text-right">
            <template #body="{ data }">
              <div>
                <Tag class="px-2 bg-green-100" v-if="!data.deleted" severity="success"><span
                    class="font-bold text-green-400 font-size-small">Đang hoạt động</span></Tag>
                <Tag class="px-2 surface-200" v-else severity="success"><span
                    class="font-bold text-400 font-size-small">Dừng hoạt động</span></Tag>
              </div>
            </template>
          </Column>
          <Column :exportable="false" header="Hoạt động" sortable="sortable" className="p-text-right">
            <template #body="{ data }">
              <Button class="border-0 p-0 h-2rem w-2rem justify-content-center surface-200"
                @click="openModelCategory(data)">
                <div class="icon--small icon-edit"></div>
              </Button>
              <Button class="border-0 p-0 ml-1 h-2rem w-2rem justify-content-center surface-200"
                @click="onDeleteCategory(data)">
                <div class="icon--small icon-delete"></div>
              </Button>
            </template>
          </Column>
          <template #footer="">
            <div>
              <div class="flex align-items-center">
                <div class="icon--large icon-footer-paginator surface-400"></div>
                <span class="ml-3 text-400 font-size-small">Showing 01 - 100 of 1280</span>
              </div>
            </div>
            <Paginator class="p-0" :rows="20" :totalRecords="totalItemsCount"></Paginator>
          </template>
        </DataTable>
      </div>
      <Dialog :header="titleModel" :visible.sync="displayBasic" :containerStyle="{ width: '50vw' }" :maximizable="true"
        :modal="true">
        <div class="field">
          <label>Tên</label>
          <InputText
            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
            type="text" v-model="sName" placeholder="Vui lòng nhập tên" />
        </div>
        <div class="field">
          <label>Mô tả</label>
          <Textarea class="text-left w-full" v-model="sDescription" rows="15" cols="100"
            placeholder="Vui lòng nhập mô tả" />
        </div>
        <template #footer>
          <Button label="Hủy bỏ" icon="pi pi-times" @click="closeModel" class="p-button-text" />
          <Button label="Lưu" icon="pi pi-check" @click="onSaveCategory" />
        </template>
      </Dialog>
      <ConfirmDialog></ConfirmDialog>
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

  categories = []
  sName: string = ''
  sDescription: string = ''
  categorySelected: any = null
  displayBasic = false

  @nsStoreCategory.Action
  actGetCategory!: () => Promise<any>
  //actGetCategory!: (params: any) => Promise<any>

  @nsStoreCategory.Action
  actAddCategory!: (params: { name: string, description: string }) => Promise<any>

  @nsStoreCategory.Action
  actUpdateCategory!: (params: { id: string, name: string, description: string }) => Promise<any>

    //LTA nsStoreCategory.Action  => Xóa()

  get totalItemsCount() {
    return this.categories?.length || 0
  }

  get titleModel() {
    return this.categorySelected ? 'Cập nhật thể loại' : 'Thêm mới thể loại'
  }

  async mounted() {
    const response = await this.actGetCategory()
    if (response){
      this.categories = response.records
    }
  }

  async onSaveCategory() {
    let response = null
    const params = {
      name: this.sName || '',
      description: this.sDescription || ''
    }

    if (this.categorySelected) {
      response = await this.actUpdateCategory({ id: this.categorySelected?.id, ...params })
    } else {
      response = await this.actAddCategory(params)
    }
    if (response) {
      this.categories = await this.actGetCategory() || []
      this.$toast.add({ severity: 'success', summary: 'Success Message', detail: 'Yêu cầu thành công', life: 3000 })
      this.closeModel()
    }
  }

  openModelCategory(row?: any) {
    if (row) {
      this.categorySelected = row
      this.setParamsModel(row)
    } else {
      this.setParamsModel()
    }
    this.displayBasic = true
  }

  onDeleteCategory(row?: any) {
    const _this: any = this
    confirmDelete(_this, () => {
      this.$toast.add({ severity: 'info', summary: 'Xác nhận', detail: 'Record deleted', life: 3000 });
      //Lta Xoa()=> list lại cate
      // 
    })
  }

  closeModel() {
    this.displayBasic = false
    this.categorySelected = null
  }

  setParamsModel(row?: any) {
    this.sName = row?.name || ''
    this.sDescription = row?.description || ''
  }
}
export default CategoryList
</script>

<style lang="sass" scoped>
.category-page-container
  height: calc(100vh - 24px)

</style>
