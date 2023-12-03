<template>
  <div class="order-page-container flex flex-column container">
    <div class="flex justify-content-between header container">
      <div class="col-fixed">
        <h2 class="font-bold m-0 font-size-4xlarge line-height-1">
          Đơn hàng
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
          <div class="col grid flex justify-content-between">
            <div class="col">
              <InputText class="w-21rem h-3rem" type="text" placeholder="Tìm kiếm" v-model="search"></InputText>
            </div>
          </div>
          <div class="col justify-content-end flex">
            <Button label="Tìm kiếm" style="height: 36px" @click="getOrderList" class="w-full max-w-6rem" />
          </div>
        </div>
      </div>
      <div class="row flex-1 relative">
        <div class="col-12 md:col-12">
          <DataTable class="w-full airtag-datatable h-full flex flex-column" v-if="orders" :value="orders"
            responsiveLayout="scroll" dataKey="id" :resizableColumns="true" :rows="10" :scrollable="false" stripedRows>
            <Column field="id" className="font-semibold" header="ID Đơn hàng" sortable="sortable"></Column>
            <Column field="name" header="Tên người nhận" sortable="sortable" className="overflow-ellipsis">
              <template #body="{ data }">
                <p class="element">{{ data?.user?.name }}</p>
              </template>
            </Column>
            <Column field="totalCost" className="font-semibold" header="Số tiền" sortable="sortable"></Column>
            <Column field="addredd" header="Địa chỉ" sortable="sortable" className="p-text-right">
              <template #body="{ data }">{{
                data | addressFomat
              }}</template>
            </Column>
            <Column field="created" header="Ngày tạo" sortable="sortable" className="p-text-right">
              <template #body="{ data }">{{
                data.created | dateTimeFomat
              }}</template>
            </Column>
            <Column :exportable="false" header="Hoạt động" sortable="sortable" className="p-text-right">
              <template #body="{ data }">
                <Button class="border-0 p-0 h-2rem w-2rem justify-content-center surface-200"
                  @click="onUpdateOrder(data)">
                  <div class="icon--small icon-compose"></div>
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
                  <div class="icon--large icon-footer-paginator surface-400"></div>
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
const nsStoreOrderMod = namespace('order/store-orderMod')

@Component({
  middleware: ['authenticate'],
  layout: 'admin',
})
class OrderList extends Vue {
  orders = []
  search: string = ''
  pPagenum: number = 1
  pPageSize: number = 10
  totalRecords: number = 0

  @nsStoreOrderMod.Action
  actGetOrderMod!: (params: any) => Promise<any>

  async mounted() {
    this.getOrderList()
    this.actGetOrderMod({
      completed: true
    })
  }

  async getOrderList() {
    const response = await this.actGetOrderMod({
      pageSize: this.pPageSize,
      pageNum: this.pPagenum,
      search: this.search
    })
    if (response) {
      this.orders = response.records
      this.totalRecords = response.totalRecords
    }
  }

  onUpdateOrder(row?: any) {
    this.$router.push(`/admin/order/${row.id}`)
  }

  onPage(event: any) {
    this.pPagenum = event.page + 1
    this.getOrderList()
  }
}
export default OrderList
</script>

<style lang="sass" scoped>
.order-page-container
  height: calc(100vh - 100px)

.element
  @include overflow-ellipsis(400px)
</style>
