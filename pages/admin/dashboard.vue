<template>
  <div class="payment-page-container flex flex-column container">
    <div class="flex justify-content-between header container">
      <div class="col-fixed">
        <h2 class="font-bold m-0 font-size-4xlarge line-height-1">
          Thống kê
        </h2>
      </div>
    </div>
    <div class="card-body py-1 mb-2">
      <div class="col-fixed flex justify-content-between align-items-center">
        <h6 class="m-0 font-bold line-height-1">Chọn thời gian</h6>
        <Calendar @date-select="handleFilter" class="w-2" v-model="dateSearch" dateFormat="dd-mm-yy" placeholder="Chọn khoảng thời gian" selectionMode="range"/>
      </div>
    </div>
    <div class="card-body my-0">
      <div class="grid" v-if="accountObj">
        <div class="col-2">
          <AccountItemValue :title="'Tổng số người dùng'" :value="accountObj?.TotalUsers" iconNm="account" sBg="#ee885e" sBgIcon="#ee6e33"/>
        </div>
        <div class="col-2">
          <AccountItemValue :title="'Người dùng mới'" :value="accountObj?.NewUsers" iconNm="add-friend" sBg="#00a65a" sBgIcon="#008548"/>
        </div>
        <div class="col-2">
          <AccountItemValue :title="'Người bán'" :value="accountObj?.Sellers" iconNm="seller"  sBg="#00c0ef" sBgIcon="#046d8d"/>
        </div>
        <div class="col-2">
          <AccountItemValue :title="'Chuyên gia'" :value="accountObj?.Experts" iconNm="review" sBg="#ffc069" sBgIcon="#ffa940"/>
        </div>
        <div class="col-2">
          <AccountItemValue :title="'Người dùng bị cấm'" :value="accountObj?.BannedUsers" iconNm="banned" sBg="#ff7875" sBgIcon="#ff4d4f"/>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import AccountItemValue from '~/components/dashboard/AccountItemValue.vue'
const nsStoreDashboard = namespace('dashboard/store-dashboard')
const dayjs = require('dayjs')

@Component({
  middleware: ['authenticate'],
  layout: 'admin',
  components: { AccountItemValue }
})
class DashboardPages extends Vue {
  dateSearch: any = null
  accountObj: any = null

  @nsStoreDashboard.Action
  actGetAccounts!: (params: any) => Promise<any>

  mounted() {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    this.dateSearch = [threeMonthsAgo, new Date()]
    this.initData()
  }

  handleFilter(e: any) {
    this.initData()
  }

  initData() {
    if (!this.dateSearch[0] || !this.dateSearch[1]) {
      this.$toast.add({
        severity: 'error',
        summary: 'Thông báo lỗi',
        detail: 'Vui lòng chọn khoảng thời gian',
        life: 3000,
      })
      return
    }

    const from = dayjs(new Date(this.dateSearch[0])).format('YYYY-MM-DD')
    const to = dayjs(new Date(this.dateSearch[1])).format('YYYY-MM-DD')

    this.getAccountList(from, to)
  }

  async getAccountList(from: any, to: any) {
    console.log(this.dateSearch);
    
    const response = await this.actGetAccounts({ from, to })
    if (response) {
      this.accountObj = response
    }
  }
}

export default DashboardPages
</script>
<style lang='sass' scoped>
</style>
