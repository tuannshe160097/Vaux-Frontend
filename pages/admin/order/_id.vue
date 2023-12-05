<template>
  <div class="order-detail-page flex flex-column container">
    <div class="flex justify-content-between header container">
      <div class="col-fixed">
        <h2 class="font-bold m-0 font-size-4xlarge line-height-1">
          Cập nhật đơn hàng
        </h2>
      </div>
    </div>
    <div class="card-body">
      <div class="card-function">
        <div class="grid formgrid">
          <div class="col p-fluid grid formgrid flex justify-content-between">
            <div class="field col-12 md:col-6">
              <label class="font-semibold">ID Đơn hàng:</label>
              <p>{{ orderInfo?.id }}</p>
            </div>
            <div class="field col-12 md:col-6">
              <label class="font-semibold">Tên người nhận:</label>
              <p>{{ orderInfo?.user?.name }}</p>
            </div>
            <div class="field col-12 md:col-6">
              <label class="font-semibold">Số tiền:</label>
              <p>{{ orderInfo?.totalCost | moneyNumberFomat }}</p>
            </div>
            <div class="field col-12 md:col-6">
              <label class="font-semibold">Địa chỉ nhận hàng:</label>
              <p>{{ orderInfo?.address }}</p>
            </div>
            <div class="field col-12 md:col-6">
              <label class="font-semibold">Ngày tạo:</label>
              <p>{{ orderInfo?.created | dateTimeFomat }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row flex-1 relative">
        <div class="col-12 md:col-12">
          <DataTable class="w-full airtag-datatable h-full flex flex-column p-datatable-customers"
            v-if="shipments" :value="shipments" responsiveLayout="scroll" dataKey="id"
            :resizableColumns="true" :rows="10" :scrollable="false" stripedRows :rowsPerPageOptions="[10, 25, 50]"
            :paginator="true" :expandedRows.sync="expandedRows">
            <Column :expander="true" :headerStyle="{'width': '3rem'}" />
            <Column field="id" header="ID Đơn vận chuyển" sortable="sortable" className="w-3 font-semibold"></Column>
            <Column field="seller" header="Tên người bán" sortable="sortable" className="w-3">
              <template #body="{ data }">
                <p class="element">{{ data?.seller?.name }}</p>
              </template>
            </Column>
            <Column field="itemCost" header="Số tiền" sortable="sortable" className="w-3">
              <template #body="{ data }">{{
                data.itemCost | moneyNumberFomat
              }}</template>
            </Column>
            <Column field="shippingCost" header="Phí vận chuyển" sortable="sortable" className="w-3"></Column>
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
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
const nsStoreOrderMod = namespace('order/store-orderMod')
const nsStoreShipment = namespace('shipment/store-shipment')

@Component({
  middleware: ['authenticate'],
  layout: 'admin',
})
class OrderDetail extends Vue {
  shipments: any = []
  orderInfo: any = null
  SHIPMENT_STATUS_MAP = new Map<number, string>([
    [1, 'Đang chờ duyệt'],
    [2, 'Đang vận chuyển'],
    [3, 'Đã vận chuyển']
  ])
  shipmentStatus = [
    { code: 1, name: this.SHIPMENT_STATUS_MAP.get(1) },
    { code: 2, name: this.SHIPMENT_STATUS_MAP.get(2) },
    { code: 3, name: this.SHIPMENT_STATUS_MAP.get(3) }
  ]
  expandedRows: any = []
  
  @nsStoreOrderMod.Action
  actGetOrderById!: (params: any) => Promise<any>

  @nsStoreShipment.Action
  actChangeShipmentStatus!: (params: any) => Promise<any>

  async mounted() {
    const orderId = this.$route?.params?.id
    if (!orderId) {
      this.$router.push('/admin/order')
    } else {
      const response = await this.actGetOrderById({ id: orderId })
      if (response) {
        this.orderInfo = response
        this.shipments = response?.shipment
      }
    }
  }

  async onChangeStatusShipment(shipment: any) {
    const response = await this.actChangeShipmentStatus({
      id: shipment?.id,
      status: shipment?.status
    })
    if (response) {
      this.$toast.add({
        severity: 'success',
        summary: 'Thông báo thành công',
        detail: 'Cập nhật trạng thái thành công',
        life: 3000,
      })
    }
  }

}
export default OrderDetail
</script>

<style lang="sass" scoped>
.order-detail-page
  height: calc(100vh - 100px)

.element
  @include overflow-ellipsis(400px)
</style>
