<template>
  <Dialog header="Danh sách sản phẩm" :visible.sync="showModal" :containerStyle="{ width: '50vw' }"
    :contentStyle="{ minHeight: '50vh' }" :maximizable="true" :modal="true">
    <div class="p-fluid">
      <div class="grid">
        <div class="col-3">
          <label>Tên sản phẩm</label>
          <InputText class="w-full" type="text" placeholder="Tìm kiếm" v-model="search"></InputText>
        </div>
        <div class="col-3">
          <label>Hạng mục</label>
          <Dropdown class="w-100 line-height-1" placeholder="Hạng mục" v-model="categoryId" :options="categories" optionLabel="name"
            optionValue="id" />
        </div>
        <div class="col justify-content-end flex align-items-center">
          <Button class="mr-2 w-8rem" label="Tìm kiếm" style="height: 36px" @click="getItemApproved()" />
        </div>
      </div>
      <DataTable class="w-full airtag-datatable h-full flex flex-column" v-if="items" :value="items"
        responsiveLayout="scroll" dataKey="id" :resizableColumns="true" :rows="10" :scrollable="false" stripedRows
        :selection.sync="selectedItems" selectionMode="multiple" :rowsPerPageOptions="[10, 25, 50]" :paginator="true">
        <Column selectionMode="multiple" :styles="{ width: '3rem' }" :exportable="false" />
        <Column field="name" header="TÊN SẢN PHẨM" sortable="sortable" className="w-3 font-semibold"></Column>
        <Column field="category" header="Thể Loại" sortable="sortable" className="w-3"></Column>
        <Column field="seller" header="Người bán" sortable="sortable" className="w-3"></Column>
        <Column field="description" header="Mô tả" sortable="sortable" className="overflow-ellipsis">
          <template #body="{ data }">
            <p class="element">{{ data.description }}</p>
          </template>
        </Column>
        <template #empty>
          <div class="justify-content-center flex font-italic">
            Không có dữ liệu
          </div>
        </template>
      </DataTable>
    </div>
    <template #footer>
      <Button label="Hủy bỏ" icon="pi pi-times" @click="cancleForm" class="p-button-text" />
      <Button label="Thêm" icon="pi pi-plus" @click="handleSubmit" />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, namespace, Watch } from 'nuxt-property-decorator'
const nsStoreItem = namespace('item/store-item')
const nsStoreCategory = namespace('category/store-category')

@Component
class CreateAuction extends Vue {
  @Prop() isDisplayDialog!: boolean
  @Prop() selectedItemsProp: any
  items = []
  selectedItems: any = []
  showModal = false
  search: string = ''
  categoryId = ''
  categories: any = []

  @nsStoreItem.Action
  actGetItemApproved!: (params: any) => Promise<any>

  @nsStoreCategory.Action
  actGetAllCategory!: () => Promise<any>

  @Watch('isDisplayDialog')
  setShowModal() {
    this.selectedItems = [...this.selectedItemsProp]
    this.showModal = this.isDisplayDialog
    if (this.isDisplayDialog) {
      this.getItemApproved()
      this.getCategory()
    }
  }

  async getItemApproved() {
    const response = await this.actGetItemApproved({
      search: this.search,
      category: this.categoryId
    })
    if (response) {
      this.items = response?.records?.map((item: any) => {
        return {
          id: item?.id,
          name: item?.name,
          category: item?.category?.name,
          seller: item?.seller?.name,
          description: item?.description
        }
      })
    }
  }

  async getCategory() {
    const response = await this.actGetAllCategory()
    if (response) {
      this.categories = [
        { id: '', name: '----Tất cả----' },
        ...response.records
      ]
    }
  }

  cancleForm() {
    this.selectedItems = []
    this.$emit('close-modal')
  }

  handleSubmit() {
    this.$emit('add-items', this.selectedItems)
  }

}
export default CreateAuction
</script>

<style lang="sass" scoped>
.create-auction-dialog
  background: blue
  ::v-deep.p-dialog-content
    background-color: #E8EAEF
    width: 45vw
    padding-bottom: 5px
    overflow: hidden !important
</style>