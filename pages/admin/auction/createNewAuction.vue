<template>
  <div class="box-page-container flex flex-column container">
    <div class="flex justify-content-between header container">
      <div class="col-fixed">
        <h2 class="font-bold m-0 font-size-4xlarge line-height-1">
          Tạo phiên đấu giá
        </h2>
      </div>
      <div class="col-fixed">
        <div class="grid align-content-center">
          <div class="col-fixed">
            <!-- <Button
              class="w-9rem h-3rem"
              type="button"
              label="Thêm Mới"
              @click="openModelCategory(null)"
            ></Button> -->
          </div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="row justify-content-between">
        <div class="col-fixed">
          <div class="grid formgrid">
            <div class="col-3">
              <label>Thời gian bắt đầu</label>
              <InputText
                class="w-21rem h-3rem"
                type="text"
                placeholder="Alo"
                v-model="search"
              >
              <template #body="{ data }">{{
                data.updated | dateTimeFomat
              }}</template></InputText>
            </div>
            <div class="col-3">
              <label>Thời gian kết thúc</label>
              <InputText
                class="w-21rem h-3rem"
                type="text"
                placeholder="ơi"
              >
              <template #body="{ data }">{{
                data.updated | dateTimeFomat
              }}</template></InputText>
            </div>
            <div class="col field justify-content-end flex pt-5">
              <Button
                class=""
                label="Thêm Mới"
                style="height: 36px"
                @click="openModelCategory(null)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row flex-1 relative">
        <div class="col-12 md:col-12">
          <DataTable
            class="w-full airtag-datatable h-full flex flex-column"
            v-if="categories"
            :value="categories"
            responsiveLayout="scroll"
            dataKey="id"
            :resizableColumns="true"
            :rows="10"
            :scrollable="false"
            stripedRows
          >
            <Column field="id" header="STT" sortable="sortable">
              <template #body="slotProps">
                <span class="">{{ slotProps.index + 1 }}</span>
              </template>
            </Column>
            <Column
              field="name"
              header="TÊN SẢN PHẨM"
              sortable="sortable"
              className="w-3 font-semibold"
            ></Column>
            <Column
              field="name"
              header="Thể Loại"
              sortable="sortable"
              className="w-3 font-semibold"
            ></Column>
            <Column
              field="name"
              header="Người bán"
              sortable="sortable"
              className="w-3 font-semibold"
            ></Column>
            <Column
              field="description"
              header="Mô tả"
              sortable="sortable"
              className="overflow-ellipsis"
            >
              <template #body="{ data }">
                <p class="element">{{ data.description }}</p>
              </template>
            </Column>
            <Column
              field="status"
              header="TRẠNG THÁI"
              sortable="sortable"
              className="p-text-right"
            >
              <template #body="{ data }">
                <div>
                  <Tag
                    class="px-2 bg-green-100"
                    v-if="!data.deleted"
                    severity="success"
                    ><span class="font-bold text-green-400 font-size-small"
                      >Đang hoạt động</span
                    ></Tag
                  >
                  <Tag class="px-2 surface-200" v-else severity="success"
                    ><span class="font-bold text-400 font-size-small"
                      >Dừng hoạt động</span
                    ></Tag
                  >
                </div>
              </template>
            </Column>
            <Column
              :exportable="false"
              header="Hoạt động"
              sortable="sortable"
              className="p-text-right"
            >
              <template #body="{ data }">
                <Button
                  class="border-0 p-0 h-2rem w-2rem justify-content-center surface-200"
                  @click="openModelCategory(data)"
                >
                  <div class="icon--small icon-compose"></div>
                </Button>
                <Button
                  class="border-0 p-0 ml-1 h-2rem w-2rem justify-content-center surface-200"
                  @click="onDeleteCategory(data)"
                >
                  <div class="icon--small icon-bin"></div>
                </Button>
              </template>
            </Column>
            <template #footer="">
              <div>
                <div class="flex align-items-center">
                  <div
                    class="icon--large icon-footer-paginator surface-400"
                  ></div>
                  <span class="ml-3 text-400 font-size-small"
                    >Showing
                    {{ Math.min((pPagenum - 1) * pPageSize + 1, totalRecords) }}
                    - {{ Math.min(pPagenum * pPageSize, totalRecords) }} of
                    {{ totalRecords }}</span
                  >
                </div>
              </div>
              <div v-if="totalRecords > 0">
                <Paginator
                  class="p-0"
                  :rows="pPageSize"
                  :totalRecords="totalRecords"
                  template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageInput"
                  @page="onPage($event)"
                >
                </Paginator>
              </div>
            </template>
            <template #empty>
              <div class="justify-content-center flex font-italic">
                Không có dữ liệu
              </div></template
            >
          </DataTable>
        </div>
        <Dialog
          :header="titleModel"
          :visible.sync="displayBasic"
          :containerStyle="{ width: '50vw' }"
          :maximizable="true"
          :modal="true"
        >
          <div class="field">
            <label>Tên sản phẩm</label>
            <InputText
              class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
              type="text"
              v-model="sName"
              placeholder="Vui lòng nhập tên sản phẩm"
            />
            <div class="col-3 field">
              <label>Thể loại</label>
              <Dropdown
                class="w-100"
                v-model="role"
                :options="oRoles"
                optionLabel="name"
                optionValue="value"
                placeholder="Chọn thể loại"
              />
            </div>
            <label>Tên người bán</label>
            <InputText
              class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
              type="text"
              v-model="sName"
              placeholder="Vui lòng nhập tên người bán"
            />
          </div>
          <div class="field">
            <label>Mô tả</label>
            <Textarea
              class="text-left w-full"
              v-model="sDescription"
              rows="15"
              cols="100"
              placeholder="Vui lòng nhập mô tả"
            />
          </div>
          <template #footer>
            <Button
              label="Hủy bỏ"
              icon="pi pi-times"
              @click="closeModel"
              class="p-button-text"
            />
            <Button label="Lưu" icon="pi pi-check" @click="onSaveCategory" />
          </template>
        </Dialog>
        <ConfirmDialog></ConfirmDialog>
      </div>
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
  search: string = ''
  pPagenum: number = 1
  pPageSize: number = 5
  totalRecords: number = 0

  @nsStoreCategory.Action
  actGetCategory!: (params: any) => Promise<any>
  //actGetCategory!: (params: any) => Promise<any>

  @nsStoreCategory.Action
  actAddCategory!: (params: {
    name: string
    description: string
  }) => Promise<any>

  @nsStoreCategory.Action
  actUpdateCategory!: (params: {
    id: string
    name: string
    description: string
  }) => Promise<any>

  //LTA nsStoreCategory.Action  => Xóa()
  @nsStoreCategory.Action
  actDeleteCategory!: (params: { id: string }) => Promise<any>

  get totalItemsCount() {
    return this.categories?.length || 0
  }

  get titleModel() {
    return this.categorySelected ? 'Cập nhật thể loại' : 'Thêm mới thể loại'
  }

  async mounted() {
    this.getCategory()
  }
  async getCategory(pageNum: number = this.pPagenum) {
    const params = {
      pageNum: pageNum,
      pageSize: this.pPageSize,
      search: this.search,
    }
    const response = await this.actGetCategory(params)
    if (response) {
      this.categories = response.records
      this.totalRecords = response.totalRecords
    }
  }

  async onSaveCategory() {
    let response = null
    const params = {
      name: this.sName || '',
      description: this.sDescription || '',
    }

    if (this.categorySelected) {
      response = await this.actUpdateCategory({
        id: this.categorySelected?.id,
        ...params,
      })
    } else {
      response = await this.actAddCategory(params)
    }
    if (response) {
      this.getCategory()
      this.$toast.add({
        severity: 'success',
        summary: 'Success Message',
        detail: 'Yêu cầu thành công',
        life: 3000,
      })
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

  async onDeleteCategory(row?: any) {
    const _this: any = this
    confirmDelete(_this, () => {
      this.deleteCategory(row.id)
      this.$toast.add({
        severity: 'info',
        summary: 'Xác nhận',
        detail: 'Record deleted',
        life: 3000,
      })
      //Lta Xoa()=> list lại cate
      //
    })
  }
  async deleteCategory(id: string) {
    const response = await this.actDeleteCategory({
      id: id,
    })
    this.getCategory()
  }
  closeModel() {
    this.displayBasic = false
    this.categorySelected = null
  }

  setParamsModel(row?: any) {
    this.sName = row?.name || ''
    this.sDescription = row?.description || ''
  }
  onPage(event: any) {
    this.getCategory(event.page + 1)
  }
}
export default CategoryList
</script>

<style lang="sass" scoped>
.box-page-container
  height: calc(100vh - 100px)

.element
  @include overflow-ellipsis(400px)
</style>
