<template>
  <div class="payment-page-container flex flex-column container">
    <div class="flex justify-content-between header container">
      <div class="col-fixed">
        <h2 class="font-bold m-0 font-size-4xlarge line-height-1">
          Các khoản thanh toán
        </h2>
      </div>
    </div>
    <div class="card-body">
      <div class="row justify-content-between">
        <div class="col-fixed">
          <div class="grid formgrid">
            <div class="col-3 field">
              <label>Trạng thái</label>
              <Dropdown class="w-100 line-height-1" v-model="statusSelected" :options="status" optionLabel="name"
                optionValue="id" />
            </div>
            <div class="col field justify-content-end flex pt-5">
              <Button class="mr-2" label="Tìm kiếm" style="height: 36px" @click="getPaymentList()" />
            </div>
          </div>
        </div>
      </div>
      <div class="row flex-1 relative">
        <div class="col-12 md:col-12">
          <DataTable class="w-full airtag-datatable h-full flex flex-column" :value="payments" rowGroupMode="rowspan" groupRowsBy="itemId"
            sortMode="single" :sortOrder="1" responsiveLayout="scroll" :rowClass='rowClass'>
            <Column field="itemId" header="ID">
                <template #body="slotProps">
                    <span class="image-text">{{slotProps.data.id}}</span>
                </template>
            </Column>
            <Column field="itemId" header="ID Đơn hàng">
                <template #body="slotProps">
                    <span class="image-text">{{slotProps.data.itemId}}</span>
                </template>
            </Column>
            <Column field="itemId" header="Doanh thu">
                <template #body="slotProps">
                    <span class="image-text">{{ slotProps.data.revenue  | moneyNumberFomat }}</span>
                </template>
            </Column>
            <Column field="country" header="Người nhận">
                <template #body="slotProps">
                  <span class="image-text">
                    {{ slotProps.data.type === 1 ? 'Chuyên gia' : 'Người bán' }}
                  </span>
                </template>
            </Column>
            <Column field="payout" header="Thanh toán">
                <template #body="slotProps">
                    <span class="image-text">{{ slotProps.data.payout  | moneyNumberFomat }}</span>
                </template>
            </Column>
            <Column field="payout" header="Trạng thái">
                <template #body="slotProps">
                    <span class="image-text">{{ slotProps.data.paymentStatus === 1 ? 'Chưa gửi' : 'Đã gửi' }}</span>
                </template>
            </Column>
            <Column field="paymentApprovedBy" header="Người phê duyệt">
                <template #body="slotProps">
                    <span class="image-text">{{ slotProps.data.paymentApprovedBy?.name }}</span>
                </template>
            </Column>
            <Column :exportable="false" header="Hoạt động" sortable="sortable" className="p-text-right overflow-visible">
              <template #body="{ data }">
                <Button
                  v-if="data.paymentStatus === 1"
                  label="Xác nhận" icon="pi pi-check"
                  class="p-button-sm"
                  @click="onPaymentUpdate(data)"
                  :class="data?.type === 1 ? 'p-button-outlined' : ''"
                />
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
          <ConfirmDialog></ConfirmDialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
const nsStorePayment = namespace('payment/store-payment')
import { confirm } from '~/utils/commons/helper'

@Component({
  middleware: ['authenticate'],
  layout: 'admin',
})
class PaymentList extends Vue {
  payments = []
  pPagenum: number = 1
  pPageSize: number = 10
  totalRecords: number = 0
  status = [
    { id: '', name: 'Tất cả' },
    { id: 1, name: 'Chưa gửi' },
    { id: 2, name: 'Đã gửi' },
  ]
  statusSelected = ''

  @nsStorePayment.Action
  actGetPayment!: (params: any) => Promise<any>

  @nsStorePayment.Action
  actUpdatePayment!: (params: any) => Promise<any>

  async mounted() {
    this.getPaymentList()
  }

  async getPaymentList() {
    const response = await this.actGetPayment({
      pageSize: this.pPageSize,
      pageNum: this.pPagenum,
      completed: this.statusSelected
    })
    if (response?.records) {
      this.totalRecords = response.totalRecords
      const paymentList: any = []
      response.records.forEach((p: any) => {
        const originObject = { id: p.id, itemId: p.itemId, revenue: p.revenue }
        paymentList.push({
          ... originObject,
          paymentApprovedBy: p.expertPaymentApprovedBy,
          paymentApprovedById: p.expertPaymentApprovedById,
          paymentStatus: p.expertPaymentStatus,
          payout: p.expertPayout,
          type: 1,
        })
        paymentList.push({
          ... originObject,
          paymentApprovedBy: p.sellerPaymentApprovedBy,
          paymentApprovedById: p.sellerPaymentApprovedById,
          paymentStatus: p.sellerPaymentStatus,
          payout: p.sellerPayout,
          type: 2,
        })
      });
      this.payments = paymentList
    }
  }

  onPage(event: any) {
    this.pPagenum = event.page + 1
    this.getPaymentList()
  }

  async onPaymentUpdate(payment: any) {
    const _this: any = this
    confirm(_this,
      'Xác nhận thanh toán',
      `Bạn có chắc bạn muốn xác nhận thanh toán cho mã sản phẩm ${payment.itemId} của ${payment.type === 1 ? 'chuyên gia' : 'người bán'} không?`,
      'pi pi-exclamation-triangle',
      'btn-success',
      'Xác nhận',
      'Hủy',
      async () => {
        const response = await this.actUpdatePayment({
          id: payment.id,
          type: payment.type
        })
        if (response) {
          this.getPaymentList()
          this.$toast.add({
            severity: 'success',
            summary: 'Thông báo thành công',
            detail: 'Xác nhận thanh toán thành công',
            life: 3000,
          })
        }
      })
  }

  rowClass(data: any) {
    return data?.type === 2 ? 'table-row-buyer': ''
  }
}
export default PaymentList
</script>

<style lang="sass" scoped>
::v-deep.payment-page-container
  height: calc(100vh - 100px)

  .table-row-buyer
    background: #bfbfbf !important

.element
  @include overflow-ellipsis(400px)
</style>
