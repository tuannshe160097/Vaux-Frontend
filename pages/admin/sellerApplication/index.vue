//View all user
<template>
  <div class="box-page-container flex flex-column container">
    <div class="flex justify-content-between header container">
      <div class="col-fixed">
        <h2 class="font-bold m-0 text-uppercase">Danh sách đơn xin quyền người bán</h2>
      </div>
      <div class="col-fixed">
        <div class="grid align-content-center">
          <div class="col-fixed">
          </div>
        </div>
      </div>
    </div>

    <div class="card-body">
      <div class="row justify-content-between">
        <div class="col-fixed">
          <div class="grid formgrid">
            <div class="col-3 field">
              <label>Tên, mail, sđt</label>
              <InputText class="w-100" type="text" placeholder="Tìm kiếm" v-model="search"></InputText>
            </div>
            <div class="col-3 field">
              <label>Tình trạng</label>
              <Dropdown class="w-100 line-height-1" v-model="status" :options="oStatus" optionLabel="name"
                optionValue="value" />
            </div>
            <div class="col field justify-content-end flex pt-5">
              <Button class="mr-2 border-10" label="Tìm kiếm" style="height: 36px" @click="Search()" />
            </div>
          </div>
        </div>
      </div>
      <div class="row flex-1 relative">
        <div class="col-12 md:col-12">
          <DataTable class="w-full airtag-datatable h-full flex flex-column" v-if="boxData" :value="boxData"
            responsiveLayout="scroll" :selection.sync="selectedBoxes" dataKey="id" :resizableColumns="true" :rows="20"
            :scrollable="false" stripedRows>
            <Column field="id" header="STT">
              <template #body="slotProps"><span>{{ (pPagenum - 1) * pPageSize + slotProps.index + 1 }}</span></template>
            </Column>
            <Column field="user.phone" header="SỐ ĐIỆN THOẠI" sortable="sortable" bodyClass="font-semibold" className="p-text-right"></Column>
            <Column field="user.name" header="TÊN" sortable="sortable" className="w-3 font-semibold"></Column>
            <Column field="created" header="NGÀY TẠO" sortable="sortable" className="p-text-center">
              <template #body="{ data }">{{
                data.created | dateTimeFomat
              }}</template>
            </Column>
            <Column field="status" header="TRẠNG THÁI" sortable="sortable" className="p-text-center">
              <template #body="{ data }">
                <div>
                  <Tag class="px-2" v-if="data.status == 3" severity="danger" value="Đã từ chối"></Tag>
                  <Tag class="px-2" v-else-if="data.status == 2" severity="success" value="Đã Đồng ý">
                  </Tag>
                  <Tag class="px-2 surface-200" v-else severity="danger"><span
                      class="font-bold text-400 font-size-small">Chờ xử lý</span></Tag>
                </div>
              </template>
            </Column>
            <Column :exportable="false" header="Hoạt động" className="p-text-right">
              <template #body="{ data }">
                <Button class="border-0 p-0 h-2rem w-2rem justify-content-center surface-200"
                  @click="viewDetail(data.id)">
                  <div class="icon--small icon-file"></div>
                </Button>
              </template>
            </Column>
            <template #footer="">
              <div>
                <div class="flex align-items-center" v-if="selectedBoxes.length &lt;= 0">
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
const nsStoreSeller = namespace('seller/store-seller')

@Component({
  middleware: ['authenticate'],
  layout: 'admin',
})
class UserList extends Vue {
  boxData = []
  selectedBoxes = []
  search: string = ''
  status: number = 0
  oStatus = [
    { name: 'Tất cả', value: 0 },
    { name: 'Chưa duyệt', value: 1 },
    { name: 'Đã đồng ý', value: 2 },
    { name: 'Đã từ chối', value: 3 }
  ]
  //-----Pagination---------------------------------
  pPagenum: number = 1
  pPageSize: number = 10
  totalRecords: number = 0

  @nsStoreSeller.Action
  actGetAllSeller!: (params: any) => Promise<any>

  async mounted() {
    this.Search()
  }
  async Search(pageNum: number = this.pPagenum) {
    const params = {
      pageNum: pageNum || 1,
      pageSize: this.pPageSize || 10,
      search: this.search,
      status: this.status == 0 ? '' : this.status,
    }
    const response = await this.actGetAllSeller(params)
    if (response) {
      console.log(response.records)
      this.boxData = response.records
      this.totalRecords = response.totalRecords
    }
  }
  viewDetail(id: any) {
    this.$router.push('/admin/sellerApplication/view?appliId=' + id)
  }
  onPage(event: any) {
    this.pPagenum = event.page + 1
    this.Search(event.page + 1)
  }
  deleteBoxById(id: any) { }
}

export default UserList
</script>
  
<style scoped>
.box-page-container {
  height: calc(100vh - 100px);
}
</style>
  