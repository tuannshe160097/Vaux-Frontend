<template>
  <div class="auction-page-container flex flex-column container">
    <div class="flex justify-content-between header container">
      <div class="col-fixed">
        <h2 class="font-bold m-0 font-size-4xlarge line-height-1">
          Danh sách các phiên đấu giá
        </h2>
      </div>
      <div class="col-fixed">
        <div class="grid align-content-center">
          <div class="col-fixed">
          </div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div>
        <div class="grid">
          <div class="col-7 grid flex justify-content-between">
            <div class="col-4">
              <label>Ngày bắt đầu</label><br />
              <Calendar class="w-full" v-model="startDate" dateFormat="dd-mm-yy" placeholder="Thời gian bắt đầu" />
            </div>
            <div class="col-4">
              <label>Ngày kết thúc</label><br />
              <Calendar class="w-full" v-model="endDate" dateFormat="dd-mm-yy" placeholder="Thời gian kết thúc" />
            </div>
            <div class="col-4">
              <label>Trạng thái</label>
              <Dropdown class="w-100 line-height-1" v-model="statusSelected" :options="status" optionLabel="name"
                optionValue="id" placeholder="Tình trạng" />
            </div>
          </div>
          <div class="col justify-content-between flex">
            <div class="col-fixed justify-content-start flex align-items-end">
              <Button label="Tìm kiếm" icon="pi pi-search" @click="getAuction" class="w-full border-10" />
            </div>
            <div class="col justify-content-end flex align-items-end">
              <Button class="btn-primary border-10" label="Thêm Mới" icon="pi pi-plus" @click="onCreateAuction" />
            </div>
          </div>
        </div>
      </div>
      <div class="row flex-1 relative">
        <div class="col-12 md:col-12">
          <DataTable class="w-full airtag-datatable h-full flex flex-column" v-if="auctions" :value="auctions"
            responsiveLayout="scroll" dataKey="id" :resizableColumns="true" :rows="10" :scrollable="false" stripedRows>
            <Column field="id" header="STT">
              <template #body="slotProps">
                <span class="">{{ (pPagenum - 1) * pPageSize + slotProps.index + 1 }}</span>
              </template>
            </Column>
            <Column field="id" header="Mã phiên đấu giá" className="p-text-right">
            </Column>
            <Column field="itemsInAuction" header="Số lượng sản phẩm" className="p-text-right">
            </Column>
            <Column field="startDate" header="Bắt đầu" sortable="sortable" className="p-text-center">
              <template #body="{ data }">{{
                data.startDate | dateTimeFomat
              }}</template>
            </Column>
            <Column field="endDate" header="Kết thúc" sortable="sortable" className="p-text-center">
              <template #body="{ data }">{{
                data.endDate | dateTimeFomat
              }}</template>
            </Column>
            <Column field="status" header="TRẠNG THÁI" sortable="sortable" className="p-text-right">
              <template #body="{ data }">
                <div>
                  <Tag class="px-2 bg-yellow-100" v-if="data.status == 1" severity="success"><span
                      class="font-bold text-orange-700 font-size-small">Đang chờ</span></Tag>
                  <Tag class="px-2 bg-green-100" v-else-if="data.status == 2" severity="success"><span
                      class="font-bold text-green-400 font-size-small">Đang hoạt động</span></Tag>
                  <Tag class="px-2 surface-200" v-else-if="data.status == 3" severity="success"><span
                      class="font-bold text-400 font-size-small">Đã kết thúc</span></Tag>
                </div>
              </template>
            </Column>
            <Column :exportable="false" header="Hoạt động" sortable="sortable" className="p-text-right">
              <template #body="{ data }">
                <Button v-if="data.status == 1" label="Bắt đầu" class="p-button-sm p-button-outlined"
                  @click="onForceStart(data)" />
                <Button v-if="data.status == 2" label="Kết thúc" class="p-button-sm p-button-outlined p-button-danger"
                  @click="onForceEnd(data)" />
                <Button class="border-0 p-0 h-2rem w-2rem justify-content-center surface-200"
                  @click="onUpdateAuction(data)">
                  <div class="icon--small icon-compose"></div>
                </Button>
                <Button class="border-0 p-0 ml-1 h-2rem w-2rem justify-content-center surface-200"
                  @click="onDeleteAuction(data.id)">
                  <div class="icon--small icon-bin"></div>
                </Button>
              </template>
            </Column>
            <template #empty>
              <div class="justify-content-center flex font-italic">
                Không có dữ liệu
              </div>
            </template>
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
          </DataTable>
        </div>
        <ConfirmDialog></ConfirmDialog>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { confirmDelete } from '~/utils/commons/helper'
const nsStoreAuction = namespace('auction/store-auction')
const dayjs = require('dayjs')
import { confirm } from '~/utils/commons/helper'

@Component({
  middleware: ['authenticate'],
  layout: 'admin',
})
class AuctionList extends Vue {
  auctions = []
  startDate: any = null
  endDate: any = null
  pPagenum: number = 1
  pPageSize: number = 10
  totalRecords: number = 0
  status = [
    { id: '', name: 'Tất cả' },
    { id: 1, name: 'Đang chờ' },
    { id: 2, name: 'Đang hoạt động' },
    { id: 3, name: 'Đã kết thúc' },
  ]
  statusSelected = ''

  @nsStoreAuction.Action
  actGetAuction!: (param: any) => Promise<any>

  @nsStoreAuction.Action
  actDeleteAuction!: (params: { id: number }) => Promise<any>

  @nsStoreAuction.Action
  actForceStartAuction!: (params: { id: number }) => Promise<any>

  @nsStoreAuction.Action
  actForceEndAuction!: (params: { id: number }) => Promise<any>

  async mounted() {
    this.getAuction()
  }

  async getAuction() {
    const response = await this.actGetAuction({
      pageSize: this.pPageSize,
      pageNum: this.pPagenum,
      from: this.startDate ? dayjs(new Date(this.startDate)).format('YYYY-MM-DD') : '',
      to: this.endDate ? dayjs(new Date(this.endDate)).format('YYYY-MM-DD') : '',
      status: this.statusSelected
    })
    console.log(response)
    if (response) {
      this.auctions = response.records
      this.totalRecords = response.totalRecords
    }
  }

  onCreateAuction() {
    this.$router.push('/admin/auction/create')
  }

  onUpdateAuction(row?: any) {
    this.$router.push(`/admin/auction/${row.id}`)
  }

  async onDeleteAuction(id: number) {
    const _this: any = this
    confirmDelete(_this, async () => {
      const response = await this.actDeleteAuction({ id })
      if (response) {
        this.$toast.add({
          severity: 'success',
          summary: 'Thông báo thành công',
          detail: 'Xóa thành công',
          life: 3000,
        })
        await this.getAuction()
      }
    })
  }

  onForceStart(data: any) {
    const _this: any = this
    confirm(_this,
      'Xác nhận bắt đầu phiên đấu giá',
      `Bạn có chắc bạn muốn bắt đầu cho mã phiên đấu giá ${data.id} không?`,
      'pi pi-exclamation-triangle',
      'btn-success',
      'Xác nhận',
      'Hủy',
      async () => {
        const response = await this.actForceStartAuction({
          id: data.id
        })
        if (response) {
          this.getAuction()
          this.$toast.add({
            severity: 'success',
            summary: 'Thông báo thành công',
            detail: 'Bắt đầu phiên đấu giá thành công',
            life: 3000,
          })
        }
      })
  }

  onForceEnd(data: any) {
    const _this: any = this
    confirm(_this,
      'Xác nhận kết thúc phiên đấu giá',
      `Bạn có chắc bạn muốn kết thúc cho mã phiên đấu giá ${data.id} không?`,
      'pi pi-exclamation-triangle',
      'btn-success',
      'Xác nhận',
      'Hủy',
      async () => {
        const response = await this.actForceEndAuction({
          id: data.id
        })
        if (response) {
          this.getAuction()
          this.$toast.add({
            severity: 'success',
            summary: 'Thông báo thành công',
            detail: 'Kết thúc phiên đấu giá thành công',
            life: 3000,
          })
        }
      })
  }

  onPage(event: any) {
    this.pPagenum = event.page + 1
    this.getAuction()
  }
}
export default AuctionList
</script>

<style lang="sass" scoped>
.auction-page-container
  height: calc(100vh - 100px)

.element
  @include overflow-ellipsis(400px)
</style>
