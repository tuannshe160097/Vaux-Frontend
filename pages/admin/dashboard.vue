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
        <Calendar v-model="dateSearch" view="year" dateFormat="yy"  @date-select="handleFilter"/>
      </div>
    </div>
    <div class="card-body my-0">
      <div class="grid" v-if="accountObj">
        <div class="col">
          <AccountItemValue :title="'Tổng số người dùng'" :value="accountObj?.TotalUsers" iconNm="account" sBg="#ee885e" sBgIcon="#ee6e33"/>
        </div>
        <div class="col">
          <AccountItemValue :title="'Người dùng mới'" :value="accountObj?.NewUsers" iconNm="add-friend" sBg="#00a65a" sBgIcon="#008548"/>
        </div>
        <div class="col">
          <AccountItemValue :title="'Người bán'" :value="accountObj?.Sellers" iconNm="seller"  sBg="#00c0ef" sBgIcon="#046d8d"/>
        </div>
        <div class="col">
          <AccountItemValue :title="'Chuyên gia'" :value="accountObj?.Experts" iconNm="review" sBg="#ffc069" sBgIcon="#ffa940"/>
        </div>
        <div class="col">
          <AccountItemValue :title="'Người dùng bị cấm'" :value="accountObj?.BannedUsers" iconNm="banned" sBg="#ff7875" sBgIcon="#ff4d4f"/>
        </div>
      </div>
      <div class="grid">
        <div class="col-6">
          <Chart v-if="chartSoldItemData" type="bar" :data="chartSoldItemData" :options="chartSoldItemOptions"/>
        </div>
        <div class="col-6">
          <Chart v-if="chartUnsoldItemData" type="bar" :data="chartUnsoldItemData" :options="chartUnsoldItemOptions"/>
        </div>
        <div class="col-6">
          <Chart v-if="chartUnpaidItemsData" type="bar" :data="chartUnpaidItemsData" :options="chartUnpaidItemsOptions"/>
        </div>
        <div class="col-6">
          <Chart v-if="chartExpertContributionData" type="bar" :data="chartExpertContributionData" :options="chartExpertContributionOptions"/>
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
  // from: any = null
  // to: any = null
  accountObj: any = null
  months = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ]
  initChartOptions= {
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
        anchor: 'center',
        offset: 5,
        padding: 4,
        borderRadius: 4,
        borderWidth: 2,
        color: 'white',
        font: {
          weight: 'bold',
          size: 10
        },
        elements: {
          line: {
            fill: false
          }
        }
      }
    }
  }
  chartSoldItemData: any = null
  chartSoldItemOptions: any = this.initChartOptions
  chartUnsoldItemData: any = null
  chartUnsoldItemOptions: any = this.initChartOptions
  chartUnpaidItemsData: any = null
  chartUnpaidItemsOptions: any = this.initChartOptions
  chartExpertContributionData: any = null
  chartExpertContributionOptions: any = this.initChartOptions


  @nsStoreDashboard.Action
  actGetAccounts!: (params: any) => Promise<any>

  @nsStoreDashboard.Action
  actGetSoldItems!: (params: any) => Promise<any>

  @nsStoreDashboard.Action
  actGetUnsoldItems!: (params: any) => Promise<any>

  @nsStoreDashboard.Action
  actGetUnpaidItems!: (params: any) => Promise<any>

  @nsStoreDashboard.Action
  actGetExpertContribution!: (params: any) => Promise<any>

  @nsStoreDashboard.Action
  actGetAuctionReport!: (params: any) => Promise<any>

  mounted() {
    this.dateSearch = new Date()
    this.initData()
  }

  get from() {
    const date = dayjs(new Date(this.dateSearch)).format('YYYY-MM-DD')
    const year = new Date(date).getFullYear();
    return `${year}-01-01`
  }

  get to() {
    const date = dayjs(new Date(this.dateSearch)).format('YYYY-MM-DD')
    const year = new Date(date).getFullYear();
    return `${year}-12-30`
  }

  handleFilter(e: any) {
    this.dateSearch = dayjs(new Date(e)).format('YYYY-MM-DD')
    this.initData()
  }

  initData() {
    if (!this.from || !this.to) {
      this.$toast.add({
        severity: 'error',
        summary: 'Thông báo lỗi',
        detail: 'Vui lòng chọn khoảng thời gian',
        life: 3000,
      })
      return
    }

    const from = dayjs(new Date(this.from)).format('YYYY-MM-DD')
    const to = dayjs(new Date(this.to)).format('YYYY-MM-DD')

    this.initAccountList(from, to)
    this.initSoldItem(from, to)
    this.initUnsoldItem(from, to)
    this.initUnpaidItems(from, to)
    this.initExpertContribution(from, to)
  }

  async initAccountList(from: any, to: any) {
    const response = await this.actGetAccounts({ from, to })
    if (response) {
      this.accountObj = response
    }
  }

  async initSoldItem(from: any, to: any) {
    const response = await this.actGetSoldItems({ from, to })
    if (response) {
      let dataChartForAllMonths = Array.from({ length: 12 }, (_, index) => {
        let existingMonth = response?.Result.find((item: any) => item.month === index + 1);
        let count = existingMonth ? existingMonth.count : 0;
        return count;
      });

      this.chartSoldItemData = {
        labels: this.months,
        datasets: [
          {
            label: 'First Dataset',
            data: dataChartForAllMonths || [],
            fill: false,
            tension: 0.4,
            backgroundColor: 'rgb(75, 192, 192, 0.2)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1
          },
        ]
      }

      this.chartSoldItemOptions = { 
        ...this.initChartOptions,
        plugins: {
          ...this.initChartOptions.plugins,
          title: {
            display: true,
            text: 'Những sản phẩm đã đấu giá thành công',
            padding: {
              top: 10,
              bottom: 16
            },
            font: {
              size: 16,
            }
          }
        }
      }
      
    }
  }

  async initUnsoldItem(from: any, to: any) {
    const response = await this.actGetUnsoldItems({ from, to })
    if (response) {
      let dataChartForAllMonths = Array.from({ length: 12 }, (_, index) => {
        let existingMonth = response?.Result.find((item: any) => item.month === index + 1);
        let count = existingMonth ? existingMonth.count : 0;
        return count;
      });

      this.chartUnsoldItemData = {
        labels: this.months,
        datasets: [
          {
            label: 'First Dataset',
            data: dataChartForAllMonths || [],
            fill: false,
            tension: 0.4,
            backgroundColor: 'rgb(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1
          },
        ]
      }

      this.chartUnsoldItemOptions = { 
        ...this.initChartOptions,
        plugins: {
          ...this.initChartOptions.plugins,
          title: {
            display: true,
            text: 'Những sản phẩm đấu giá không thành công',
            padding: {
              top: 10,
              bottom: 16
            },
            font: {
              size: 16,
            }
          }
        }
      }
    }
  }

  async initUnpaidItems(from: any, to: any) {
    const response = await this.actGetUnpaidItems({ from, to })
    if (response) {
      let dataChartForAllMonths = Array.from({ length: 12 }, (_, index) => {
        let existingMonth = response?.Result.find((item: any) => item.month === index + 1);
        let count = existingMonth ? existingMonth.count : 0;
        return count;
      });

      this.chartUnpaidItemsData = {
        labels: this.months,
        datasets: [
          {
            label: 'First Dataset',
            data: dataChartForAllMonths || [],
            fill: false,
            tension: 0.4,
            backgroundColor: 'rgb(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1
          },
        ]
      }

      this.chartUnpaidItemsOptions = { 
        ...this.initChartOptions,
        plugins: {
          ...this.initChartOptions.plugins,
          title: {
            display: true,
            text: 'Những sản phẩm quá hạn thanh toán',
            padding: {
              top: 16,
              bottom: 16
            },
            font: {
              size: 16,
            }
          }
        }
      }
    }
  }

  async initExpertContribution(from: any, to: any) {
    const response = await this.actGetExpertContribution({ from, to })
    if (response?.Result) {
      let expertNameList: string[] = []
      let expertCountList: number[] = []
      let experts = response?.Result.sort((a: any, b: any) => b.count - a.count)
      experts = experts?.length > 10 ? experts.slice(0, 10) : experts
      if (experts) {
        experts.forEach((ex: any) => {
          expertNameList.push(ex.name)
          expertCountList.push(ex.count)
        });
      }
      
      this.chartExpertContributionData = {
        labels: expertNameList,
        datasets: [
          {
            label: 'First Dataset',
            data: expertCountList || [],
            fill: false,
            tension: 0.4,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)',
              'rgba(255, 0, 0, 0.2)',
              'rgba(0, 255, 0, 0.2)',
              'rgba(0, 0, 255, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)',
              'rgba(255, 0, 0)',
              'rgba(0, 255, 0)',
              'rgba(0, 0, 255)'
            ],
            borderWidth: 1
          },
        ]
      }

      this.chartExpertContributionOptions = { 
        ...this.initChartOptions,
        indexAxis: 'y',
        plugins: {
          ...this.initChartOptions.plugins,
          title: {
            display: true,
            text: 'Top 10 các chuyên gia có đóng góp nhiều nhất',
            padding: {
              top: 16,
              bottom: 16
            },
            font: {
              size: 16,
            }
          }
        }
      }
    }
  }

  formatNumber(number: number) {
    if (!number) return 0
    return (number).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }
}

export default DashboardPages
</script>
<style lang='sass' scoped>
</style>
