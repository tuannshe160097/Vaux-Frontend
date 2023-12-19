<template>
  <div class="box-page-container flex flex-column container">
    <div class="flex justify-content-between header container">
      <div class="col-fixed">
        <h2 class="font-bold m-0 font-size-4xlarge line-height-1">
          Danh sách sản phẩm
        </h2>
      </div>
      <div class="col-fixed">
        <div class="grid align-content-center">
          <div class="col-fixed"></div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="row justify-content-between">
        <div class="col-fixed">
          <div class="grid formgrid">
            <div class="col-3 field">
              <label>Tên sản phẩm</label>
              <InputText class="w-full" type="text" placeholder="Tìm kiếm" v-model="search"></InputText>
            </div>
            <div class="col-3 field">
              <label>Hạng mục</label>
              <Dropdown class="w-100 line-height-1" v-model="categoryId" :options="categories" optionLabel="name"
                optionValue="id" />
            </div>
            <div class="col field justify-content-end flex pt-5">
              <Button class="mr-2" label="Tìm kiếm" style="height: 36px" @click="getItem()" />
            </div>
          </div>
        </div>
      </div>
      <div class="row flex-1 relative">
        <div class="col-12 md:col-12">
          <DataTable class="w-full airtag-datatable h-full flex flex-column" v-if="items" :value="items"
            responsiveLayout="scroll" dataKey="id" :resizableColumns="true" :rows="10" :scrollable="false" stripedRows>
            <Column field="id" header="STT" sortable="sortable">
              <template #body="slotProps">
                <span class="">{{ (pPagenum - 1) * pPageSize + slotProps.index + 1 }}</span>
              </template>
            </Column>
            <Column field="name" className="font-semibold max-w-30rem overflow-ellipsis text-overflow-ellipsis" header="Tên" sortable="sortable" bodyStyle="max-wi"></Column>
            <Column field="category.name" className="font-semibold" header="Hạng mục" sortable="sortable"></Column>
            <Column field="seller.name" className="" header="Người bán" sortable="sortable"></Column>
            <Column field="created" header="NGÀY TẠO" sortable="sortable" className="p-text-center">
              <template #body="{ data }">{{
                data.created | dateTimeFomat
              }}</template>
            </Column>
            <Column field="updated" header="NGÀY CẬP NHẬT" sortable="sortable" className="p-text-center">
              <template #body="{ data }">{{
                data.updated | dateTimeFomat
              }}</template>
            </Column>
            <Column field="status" header="TRẠNG THÁI" sortable="sortable" className="p-text-center">
              <template #body="{ data }">
                <div>
                  <Tag class="px-2 bg-yellow-100" v-if="data.status == 1" severity="success" value="Từ chối"><span
                      class="font-bold text-yellow-900 font-size-small">Chờ thẩm định</span></Tag>
                  <Tag class="px-2" v-else-if="data.status == 2" severity="danger" value="Từ chối"></Tag>
                  <Tag class="mr-2 text-cyan-50" v-else-if="data.status == 3" severity="warning" value="Chờ đấu giá"></Tag>
                  <Tag class="px-2 surface-200 bg-green-400" v-else-if="data.status == 4" severity="success"><span
                      class="font-bold font-size-small">Đang đấu giá</span></Tag>
                  <Tag class="px-2 surface-200" v-else-if="data.status == 5" severity="success"><span
                      class="font-bold text-400 font-size-small">Đã xóa</span></Tag>
                  <Tag class="mr-2" v-else-if="data.status == 6" severity="warning" value="Chờ đấu giá lại"></Tag>
                  <Tag class="px-2 bg-orange-300" v-else-if="data.status == 7" severity="success"><span
                      class="font-bold text-yellow-400 font-size-small">Chờ thanh toán</span></Tag>
                  <Tag class="px-2 surface-200 bg-green-100" v-else-if="data.status == 8" severity="success"><span
                      class="font-bold text-green-400 font-size-small">Đã thanh toán</span></Tag>
                  <Tag class="px-2 surface-200 bg-green-100" v-else severity="success"><span
                      class="font-bold text-cyan-50 font-size-small">Đã thanh toán cho người bán</span></Tag>
                </div>
              </template>
            </Column>
            <Column :exportable="false" header="Hoạt động" sortable="sortable" className="p-text-right">
              <template #body="{ data }">
                <Button class="border-0 p-0 h-2rem w-2rem justify-content-center surface-200"
                  @click="onDetailItem(data.id)">
                  <div class="icon--small icon-file"></div>
                </Button>
              </template>
            </Column>
            <template #footer="">
              <div>
                <div class="flex align-items-center">
                  <div class="icon--large icon-showing surface-400"></div>
                  <span class="ml-3 text-400 font-size-small">Showing
                    {{ Math.min((pPagenum - 1) * pPageSize + 1, totalRecords) }}
                    - {{ Math.min(pPagenum * pPageSize, totalRecords) }} of
                    {{ totalRecords }}</span>
                </div>
              </div>
              <div v-if="totalRecords > 0">
                <Paginator class="p-0" :rows="pPageSize" :totalRecords="totalRecords"
                  template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageInput"
                  @page="onPage($event)">
                </Paginator>
              </div>
            </template>
            <template #empty>
              <div class="justify-content-center flex font-italic">
                Không có dữ liệu
              </div>
            </template>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
const nsStoreCategory = namespace('category/store-category')
const nsStoreItem = namespace('item/store-mod-item')

@Component({
  middleware: ['authenticate'],
  layout: 'admin',
})
class ItemList extends Vue {
  items = []
  categories = []
  categoryId = ''
  sName: string = ''
  sDescription: string = ''
  pPagenum: number = 1
  pPageSize: number = 10
  totalRecords: number = 0
  search: string = ''

  @nsStoreItem.Action
  actGetItemList!: (param: any) => Promise<any>

  @nsStoreCategory.Action
  actGetAllCategory!: () => Promise<any>

  async mounted() {
    this.getItem()
    this.getCategory()
  }

  async getItem() {
    const params = {
      pageNum: this.pPagenum,
      pageSize: this.pPageSize,
      search: this.search,
      category: this.categoryId,
    }
    const response = await this.actGetItemList(params)
    if (response) {
      this.items = response.records
      this.totalRecords = response.totalRecords
    }
  }

  async getCategory() {
    const response = await this.actGetAllCategory()
    if (response) {
      this.categories = response.records
    }
  }

  onPage(event: any) {
    this.pPagenum = event.page + 1
    this.getItem()
  }

  onDetailItem(id: any) {
    this.$router.push("/admin/item/view?itemId=" + id)
  }
}
export default ItemList
</script>

<style lang="sass" scoped>
.box-page-container
  height: calc(100vh - 100px)
.element
  @include overflow-ellipsis(400px)
</style>