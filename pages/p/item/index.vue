<template>
  <section class="surface-0 flex align-items-center justify-content-center p-2">
    <div class="item-page-container flex flex-column w-full">
      <Breadcrumb :home="home" :model="breads" />
      <div class="grid grid-nested">
        <div class="col-3" style="text-align: left">
          <div class="card-body mt-3 flex flex-column">
            <h3 class="text-brown font-bold">Tìm kiếm</h3>
            <InputText class="w-full mb-2" v-model="searchText" placeholder="Nhập từ khóa"></InputText>
            <label>Thể loại</label>
            <!-- <Dropdown class="w-full mb-2 line-height-1" v-model="selectedCategory" :options="sortOptions"
              optionLabel="name" placeholder="Thể loại" /> -->
            <Dropdown class="w-100 line-height-1" v-model="selectedCategory" :options="sortOptions"
              filterPlaceholder="Tìm kiếm" optionLabel="name" placeholder="Thể loại" @change="onSelectCat()" />
            <label>Sắp xếp theo</label>
            <!-- <Dropdown class="w-full mb-2 line-height-1" v-model="sortedBy" :options="oSortedBy" dataKey="value"
              optionValue="value" optionLabel="name" placeholder="" /> -->
            <Dropdown class="w-100 line-height-1" v-model="sortedBy" :options="oSortedBy" filterPlaceholder="Tìm kiếm"
              optionLabel="name" placeholder="----Tất cả----" />
            <Button class="border-10 btn-primary mt-2" label="Tìm kiếm" @click="getItem()" />
          </div>
        </div>
        <div class="col-9 mt-2">
          <DataView :value="products" layout="grid" :paginator="false" :rows="pPageSize" :sortOrder="sortOrder"
            :sortField="sortField">
            <template #grid="slotProps">
              <div class="col-12 md:col-4 lg:col-4 mt-2">
                <a :href="slotProps.data.url" style="text-decoration: none;">
                  <div class="this-is-item" style="color: #000;">
                    <div class="product-item-content">
                      <div class="mx-2 border-1 border-solid surface-border border-10 overflow-hidden">
                        <div class="mb-3 w-full" style="height: 200px;">
                          <img :src="slotProps.data.thumbnailUrl" :alt="slotProps.data.name" class="product-image"
                            style="bottom: 0px; height: 100%; object-fit: cover; object-position: center center; width: 100%;" />
                        </div>
                        <div class="ml-2">
                          <h4 class="mb-1 w-full"
                            style=" display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">
                            {{ slotProps.data.name }}</h4>
                          <h6 class="mt-3 mb-1">GIÁ HIỆN TẠI</h6>
                          <h5 class="mt-0 mb-3 font-bold">{{ formatNumber(slotProps.data.curBid) }}</h5>
                          <h6 class="mt-0 mb-3">{{ slotProps.data.endDateStr }}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </template>
            <template #footer="">
              <div class="custom-paginator flex justify-content-between ">
                <div class="flex align-items-center">
                  <span class="px-2 text-dark font-size-small">Showing
                    {{ Math.min((pPageNum - 1) * pPageSize + 1, totalRecords) }}
                    - {{ Math.min(pPageNum * pPageSize, totalRecords) }} of
                    {{ totalRecords }}</span>
                </div>
                <div v-if="totalRecords > 0">
                  <Paginator class="p-0" :rows="pPageSize" :totalRecords="totalRecords"
                    template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageInput"
                    @page="onPage($event)">
                  </Paginator>
                </div>
              </div>
            </template>
          </DataView>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
const nsStoreItem = namespace('item/store-public-item')
const nsStoreCategory = namespace('category/store-category')

@Component({
  layout: 'publicNoLogin',
  meta: { isPublic: true },
})
class ItemList extends Vue {

  products: any[] = []
  layout: any = 'grid'
  sortOrder: any = null
  sortField: any = null
  searchText: string | null = ''
  sortedBy: any = ''
  category: any = '0'
  selectedCategory: any = null
  sortOptions: any = [{ id: '', name: '--------------' }]
  pPageNum: number = 1
  pPageSize: number = 12
  totalRecords: number = 0

  oSortedBy: any[] = [
    { value: '', name: 'Mặc định' },
    { value: 'start', name: 'Mới nhất' },
    { value: 'bid', name: 'Hot nhất' },
    { value: 'end', name: 'Sắp kết thúc' }
  ]

  home = { icon: 'pi pi-home', to: '/homepage' }
  breads: any[] = [
    { label: 'Danh sách Sản phẩm', to: '#' },
  ]

  @nsStoreItem.Action
  actGetItem!: (param: any) => Promise<any>

  @nsStoreCategory.Action
  actGetCategory!: (params: any) => Promise<any>

  created() {
    this.category = Array.isArray(this.$route.query.cId)
      ? this.$route.query.cId[0]
      : this.$route.query.cId
    this.searchText = Array.isArray(this.$route.query.search)
      ? this.$route.query.search[0]
      : this.$route.query.search
  }
  async mounted() {
    console.log(this.category)
    this.getCategory()
    this.getItem()
    this.formatItemsTimeLeft()
  }
  onSelectCat() {
    this.category = this.selectedCategory.id
  }
  async getItem(pageNum: number = this.pPageNum) {
    const param = {
      pageNum: pageNum,
      pageSize: this.pPageSize,
      search: this.searchText || '',
      category: this.category || '',
      orderBy: this.sortedBy.value || '',
    }
    const response = await this.actGetItem(param)
    if (response) {
      this.products = []
      console.log(response)
      response.records.forEach((item: any) => {
        const curbid = (!item.highestBid || item.highestBid.amount == null || item.highestBid.amount == undefined) ? 0 : item.highestBid.amount
        this.products.push({
          id: item.id,
          thumbnailUrl: this.getImageUrl(item.id, item.thumbnailId),
          name: item.name,
          endDate: item.ongoingSession.endDate,//item.ongoingSession.endDate,
          endDateStr: '',
          url: '/p/item/' + item.id,
          curBid: curbid
        })
      });
      this.totalRecords = response.totalRecords
    }
  }
  getImageUrl(itemId: any, imgId: any) {
    try {
      if (itemId == null || imgId == null) {
        return ''
      }
      const params = {
        itemId: itemId,
        imgId: imgId,
      }
      return process.env.BE_API_URL + '/api/Item/' + itemId + '/Images/' + imgId
    } catch (error) {
      this.$store.commit('commons/store-error/setError', "Error fetching or converting image")
      console.error("Error fetching or converting image:", error);
      return null;
    }
  }
  formatNumber(number: any) {
    const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return "₫" + formattedNumber;
  }
  async getCategory() {
    const response = await this.actGetCategory({
      pageNum: 1,
      pageSize: -1,
      search: '',
    })
    console.log(response)
    if (response) {
      this.sortOptions = [
        { id: '', name: '----Tất cả----' },
        ...response.records.map((cat: any) => ({
          id: cat.id,
          name: cat.name,
        })),
      ]
    }
    console.log(this.sortOptions)
    this.selectedCategory = this.sortOptions.find((cat: any) => cat.id == this.category) || null;
    console.log(this.selectedCategory)
  }
  formatItemsTimeLeft() {
    const updateInterval = 1000;
    const updateTimer = () => {
      for (let i = 0; i < this.products.length; i++) {
        const targetTime: any = new Date(this.products[i].endDate);
        this.products[i].endDateStr = this.formatDistance(targetTime);
      }
    }
    // Initial update
    updateTimer();
    // Set up interval for periodic updates
    const intervalId = setInterval(() => {
      updateTimer();
    }, updateInterval);
  }
  formatDistance(timeString: any) {
    const currentTime: any = new Date();
    const targetTime: any = new Date(timeString);

    const timeDifference = targetTime - currentTime;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `Còn ${days} ngày`;
    } else if (hours > 0) {
      return `Còn ${hours} giờ`;
    } else if (minutes > 0) {
      return `Còn ${minutes} phút ${seconds} giây`;
    } else {
      return `Còn ${seconds} giây`;
    }
  }
  onPage(event: any) {
    this.getItem(event.page + 1)
  }
  viewItem(id: any) {
    this.$router.push("/p/item/" + id)
  }
}
export default ItemList
</script>

<style lang="sass">
.p-dataview-footer
  background: $transparent !important
  border: none !important
  padding: 0 !important
</style>
