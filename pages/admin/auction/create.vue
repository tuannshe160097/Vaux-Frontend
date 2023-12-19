<template>
  <div class="create-auction-page flex flex-column container">
    <div class="flex justify-content-between header container">
      <div class="col-fixed">
        <h2 class="font-bold m-0 font-size-4xlarge line-height-1">
          Tạo phiên đấu giá
        </h2>
      </div>
    </div>
    <div class="card-body">
      <div class="card-function">
        <div class="grid col-12">
          <div class="col-4 ">
            <label>Thời gian bắt đầu</label>
            <Calendar class="w-full" v-model="startDate" dateFormat="dd-mm-yy" :minDate="minDateValue" placeholder="Thời gian bắt đầu" />
          </div>
          <div class="col-4 ">
            <label>Thời gian kết thúc</label>
            <Calendar class="w-full" v-model="endDate" dateFormat="dd-mm-yy" :minDate="startDate" placeholder="Thời gian kết thúc" />
          </div>
        </div>
      </div>
      <div class="row flex-1 relative">
        <div class="col-12 md:col-12 m-0">
          <div class="justify-content-start flex">
            <Button class="border-10" icon="pi pi-plus" label="Thêm sản phẩm" style="height: 36px" @click="openModelAddItem" />
          </div>
        </div>
        <div class="col-12 md:col-12">
          <DataTable class="w-full airtag-datatable h-full flex flex-column p-datatable-customers"
            v-if="selectedItemsApproved" :value="selectedItemsApproved" responsiveLayout="scroll" dataKey="id"
            :resizableColumns="true" :rows="10" :scrollable="false" stripedRows :rowsPerPageOptions="[10, 25, 50]"
            :paginator="true">
            <Column field="id" header="STT" sortable="sortable">
              <template #body="slotProps">
                <span class="">{{ slotProps.index + 1 }}</span>
              </template>
            </Column>
            <Column field="name" header="TÊN SẢN PHẨM" sortable="sortable" className="w-3 font-semibold"></Column>
            <Column field="category" header="Thể Loại" sortable="sortable" className="w-3"></Column>
            <Column field="seller" header="Người bán" sortable="sortable" className="w-3"></Column>
            <Column field="description" header="Mô tả" sortable="sortable" className="overflow-ellipsis">
              <template #body="{ data }">
                <p class="element">{{ data.description }}</p>
              </template>
            </Column>
            <Column :exportable="false" header="Hoạt động" sortable="sortable" className="p-text-right">
              <template #body="{ data }">
                <Button class="border-0 p-0 ml-1 h-2rem w-2rem justify-content-center surface-200"
                  @click="onDeleteItem(data)">
                  <div class="icon--small icon-bin"></div>
                </Button>
              </template>
            </Column>
            <template #empty>
              <div class="justify-content-center flex font-italic">
                Không có dữ liệu
              </div>
            </template>
          </DataTable>
        </div>
        <CreateAuction :isDisplayDialog="displayAddItem" :selectedItemsProp="selectedItemsApproved"
          @close-modal="displayAddItem = false" @add-items="addItemApproved" />
      </div>
      <div class="flex justify-content-center">
        <Button label="Tạo phiên" class="border-10 btn-final" style="height: 36px" @click="onCreateAuction" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import CreateAuction from '~/components/dialog/CreateAuction.vue'
const nsStoreAuction = namespace('auction/store-auction')
const dayjs = require('dayjs')

@Component({
  middleware: ['authenticate'],
  layout: 'admin',
  components: {
    CreateAuction
  }
})
class CreateAuctionList extends Vue {
  minDateValue: Date = new Date()
  startDate: any = null
  endDate: any = null
  displayAddItem: boolean = false
  selectedItemsApproved: any = []

  @nsStoreAuction.Action
  actCreateAuction!: (params: any) => Promise<any>

  async mounted() {
    this.selectedItemsApproved = []
  }

  openModelAddItem() {
    this.displayAddItem = true
  }

  addItemApproved(items: any) {
    this.selectedItemsApproved = [...items]
    this.displayAddItem = false
  }

  async onDeleteItem(row: any) {
    if (!this.selectedItemsApproved || !this.selectedItemsApproved.length) {
      return
    }
    this.selectedItemsApproved = [...this.selectedItemsApproved.filter((item: any) => item.id !== row.id)]
  }

  validateThrowMessage() {
    if (!this.startDate || !this.endDate) {
      return 'Vui lòng nhập đầy đủ thông tin thời gian'
    } else {
      const start = dayjs(this.startDate);
      const end = dayjs(this.endDate);
      if (start.isAfter(end)) {
        return 'Thời gian kết thúc phải sau thời gian bắt đầu'
      }
    }

    if (!this.selectedItemsApproved || !this.selectedItemsApproved.length) {
      return 'Vui lòng thêm sản phẩm'
    }
  }

  async onCreateAuction() {
    const msg = this.validateThrowMessage()
    if (msg) {
      this.$toast.add({
        severity: 'error',
        summary: 'Thông báo lỗi',
        detail: msg,
        life: 3000,
      })
      return
    }

    const response = await this.actCreateAuction({
      startDate: this.startDate ? dayjs(new Date(this.startDate)).format('YYYY-MM-DD') : '',
      endDate: this.endDate ? dayjs(new Date(this.endDate)).format('YYYY-MM-DD') : '',
      itemIds: this.selectedItemsApproved.map((item: any) => item.id)
    })

    if (response) {
      this.$toast.add({
        severity: 'success',
        summary: 'Thông báo thành công',
        detail: 'Yêu cầu đăng ký thành công',
        life: 3000,
      })
      this.$router.push('/admin/auction')
    }
  }

}
export default CreateAuctionList
</script>

<style lang="sass" scoped>
.create-auction-page
  height: calc(100vh - 100px)

.element
  @include overflow-ellipsis(400px)
</style>
