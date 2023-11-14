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
      <div class="row justify-content-between">
        <div class="col-fixed">
          <div class="grid formgrid">
            <div class="col field justify-content-end flex pt-5">
              <Button
                class=""
                label="Thêm Mới"
                style="height: 36px"
                @click="onCreateAuction"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row flex-1 relative">
        <div class="col-12 md:col-12">
          <DataTable
            class="w-full airtag-datatable h-full flex flex-column"
            v-if="auctions"
            :value="auctions"
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
              field="startDate"
              header="Bắt đầu"
              sortable="sortable"
              className="p-text-right"
            >
              <template #body="{ data }">{{
                data.startDate | dateTimeFomat
              }}</template>
            </Column>
            <Column
              field="endDate"
              header="Kết thúc"
              sortable="sortable"
              className="p-text-right"
            >
              <template #body="{ data }">{{
                data.endDate | dateTimeFomat
              }}</template>
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
                  @click="onUpdateAuction(data)"
                >
                  <div class="icon--small icon-compose"></div>
                </Button>
                <Button
                  class="border-0 p-0 ml-1 h-2rem w-2rem justify-content-center surface-200"
                  @click="onDeleteAuction(data.id)"
                >
                  <div class="icon--small icon-bin"></div>
                </Button>
              </template>
            </Column>
            <template #empty>
              <div class="justify-content-center flex font-italic">
                Không có dữ liệu
              </div></template
            >
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

@Component({
  middleware: ['authenticate'],
  layout: 'admin',
})
class AuctionList extends Vue {
  auctions = []

  @nsStoreAuction.Action
  actGetAuction!: () => Promise<any>

  @nsStoreAuction.Action
  actDeleteAuction!: (params: { id: number }) => Promise<any>

  async mounted() {
    this.getAuction()
  }
  async getAuction() {
    const response = await this.actGetAuction()
    if (response) {
      this.auctions = response.records
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
}
export default AuctionList
</script>

<style lang="sass" scoped>
.auction-page-container
  height: calc(100vh - 100px)

.element
  @include overflow-ellipsis(400px)
</style>
