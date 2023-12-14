<template>
  <div class="shipment-list-page flex flex-column container">
    <div class="flex justify-content-between header container">
      <div class="col-fixed">
        <h2 class="font-bold m-0 font-size-4xlarge line-height-1">
          Đơn vận chuyển
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
          <div class="col grid">
            <div class="col-4">
              <label>ID</label><br/>
              <InputText class="w-full" type="text" placeholder="Tìm kiếm" v-model="search"></InputText>
            </div>
            <div class="col-3">
              <label>Trạng thái</label>
              <Dropdown class="w-full line-height-1" v-model="statusSelected" :options="status" optionLabel="name"
                optionValue="code" />
            </div>
          </div>
          <div class="col justify-content-end flex">
            <Button label="Tìm kiếm" style="height: 36px" @click="getShipmentList" class="w-full max-w-6rem" />
          </div>
        </div>
      </div>
      <div class="row flex-1 relative">
        <div class="col-12 md:col-12">
          <DataTable class="w-full airtag-datatable h-full flex flex-column p-datatable-customers"
            v-if="shipments" :value="shipments" responsiveLayout="scroll" dataKey="id"
            :resizableColumns="true" :rows="10" :scrollable="false" stripedRows :rowsPerPageOptions="[10, 25, 50]" :expandedRows.sync="expandedRows">
            <Column :expander="true" :headerStyle="{'width': '3rem'}" />
            <Column field="id" header="ID Đơn vận chuyển" sortable="sortable" className="w-3 font-semibold"></Column>
            <Column field="seller" header="Tên người bán" sortable="sortable" className="w-3">
              <template #body="{ data }">
                <p class="element">{{ data?.seller?.name }}</p>
              </template>
            </Column>
            <Column field="itemCost" header="Số tiền" sortable="sortable" className="w-3 p-text-right">
              <template #body="{ data }">{{
                data.itemCost | moneyNumberFomat
              }}</template>
            </Column>
            <Column field="shippingCost" header="Phí vận chuyển" sortable="sortable" className="w-3 p-text-right"></Column>
            <Column field="address" header="Địa chỉ người gửi" sortable="sortable" className="overflow-ellipsis"></Column>
            <Column :exportable="false" header="Hoạt động" sortable="sortable" className="p-text-right overflow-visible">
              <template #body="{ data }">
                <select name="shipmentStatus" id="shipmentStatus" v-model="data.status" @change="onChangeStatusShipment(data)">
                  <option v-for="item in shipmentStatus" :key="item.code" :value="item.code">{{ item.name }}</option>
                </select>
              </template>
            </Column>
            <template #empty>
              <div class="justify-content-center flex font-italic">
                Không có dữ liệu
              </div>
            </template>
            <template #expansion="slotProps">
              <div class="px-5" v-if="slotProps?.data?.items">
                <label class="font-semibold">Sản phẩm của {{ slotProps?.data?.seller?.name }}</label>
                <DataTable class="mt-2" :value="slotProps?.data?.items">
                  <Column field="id" header="Id" sortable></Column>
                  <Column field="name" header="Tên sản phẩm" sortable></Column>
                  <Column field="category" header="Hạng mục" sortable>
                    <template #body="{ data }">{{
                      data?.category?.name
                    }}</template>
                  </Column>
                  <Column field="seller" header="Người bán" sortable>
                    <template #body="{ data }">{{
                      data?.seller?.name
                    }}</template>
                  </Column>
              </DataTable>
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
const nsStoreShipment = namespace('shipment/store-shipment')

@Component({
  middleware: ['authenticate'],
  layout: 'admin',
})
class ShipmentPage extends Vue {
  shipments = []
  search: string = ''
  pPagenum: number = 1
  pPageSize: number = 10
  totalRecords: number = 0
  expandedRows: any = []
  SHIPMENT_STATUS_MAP = new Map<number, string>([
    [0, 'Đang chờ duyệt'],
    [1, 'Đang giao hàng'],
    [2, 'Đã giao hàng']
  ])
  shipmentStatus = [
    { code: 0, name: this.SHIPMENT_STATUS_MAP.get(0) },
    { code: 1, name: this.SHIPMENT_STATUS_MAP.get(1) },
    { code: 2, name: this.SHIPMENT_STATUS_MAP.get(2) }
  ]
  status = [
    { code: '', name: 'Tất cả' },
    ...this.shipmentStatus
  ]
  statusSelected = ''

  @nsStoreShipment.Action
  actGetShipment!: (params: any) => Promise<any>

  @nsStoreShipment.Action
  actChangeShipmentStatus!: (params: any) => Promise<any>

  async mounted() {
    this.getShipmentList()
  }

  async getShipmentList() {
    const response = await this.actGetShipment({
      pageSize: this.pPageSize,
      pageNum: this.pPagenum,
      search: this.search,
      status: this.statusSelected
    })
    if (response) {
      this.shipments = response.records
      this.totalRecords = response.totalRecords
    }
  }

  async onChangeStatusShipment(shipment: any) {
    const response = await this.actChangeShipmentStatus({
      id: shipment?.id,
      status: shipment?.status
    })
    if (response) {
      this.getShipmentList()
      this.$toast.add({
        severity: 'success',
        summary: 'Thông báo thành công',
        detail: 'Cập nhật trạng thái thành công',
        life: 3000,
      })
    }
  }

  onPage(event: any) {
    this.pPagenum = event.page + 1
    this.getShipmentList()
  }
}
export default ShipmentPage
</script>

<style lang="sass" scoped>
.shipment-list-page
  height: calc(100vh - 100px)

.element
  @include overflow-ellipsis(400px)
</style>
