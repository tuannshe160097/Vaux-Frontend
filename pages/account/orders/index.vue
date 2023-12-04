<template>
    <section class="surface-0 flex align-items-center justify-content-center p-2">
        <div class="box-page-container flex flex-column container w-full">
            <Breadcrumb :home="home" :model="breads" />
            <div class="card-body my-3">
                <h2 class="font-bold text-brown">Danh sách đơn hàng</h2>
                <TabView class="tabview-custom">
                    <TabPanel>
                        <template #header>
                            <i class="pi pi-calendar mr-2"></i>
                            <span>Tất cả</span>
                        </template>
                        <div class="grid formgrid">
                            <div class="field col-12">
                            </div>
                            <div class="field col-12">
                                <div class="col-12 " v-for="item in items" :key="item.id" :item="item"
                                    style="height: 230px;">
                                    <div class="grid item p-2 border-10" style="height: 100%;">
                                        <div class="col-fixed align-items-center flex">
                                            <input type="checkbox" id="vehicle3" name="vehicle3" :checked="item.selected">
                                        </div>
                                        <div class="col-5 surface-200" style="height: 100%; background-color: azure;">
                                            <img src="https://localhost:6565/api/Item/2/Images/29" alt="Image"
                                                style="object-fit: contain; width: 100%; height: 100%;" />
                                        </div>
                                        <div class="col flex flex-column justify-content-between">
                                            <div class="infomation">
                                                <h3 class=" m-0 ">{{ item.item.name }}</h3>
                                                <span class=" mt-2 font-bold ">{{ item.item.catName }}</span>
                                                <div class="product-description">{{ item.item.description }}</div>
                                            </div>
                                            <div class="flex-end">
                                                <span class="font-bold">GIÁ MUA:</span>
                                                <h4 class=" m-0  text-brown">{{ formatNumber(item.item.price) }}
                                                </h4>
                                                <!-- <Button class="mb-2" icon="pi pi-shopping-cart" label="Add to Cart"></Button> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <template #header>
                            <i class="pi pi-user"></i>
                            <span>Chờ thanh toán</span>
                        </template>
                    </TabPanel>
                    <TabPanel>
                        <template #header>
                            <i class="pi pi-user"></i>
                            <span>Chờ giao hàng</span>
                        </template>
                    </TabPanel>
                    <TabPanel>
                        <template #header>
                            <i class="pi pi-user"></i>
                            <span>Đã hoàn thành</span>
                        </template>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    </section>
</template>
  
<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { User } from '~/models/User'
const nsStoreItem = namespace('item/store-seller-item')
const nsCategory = namespace('category/store-category')
const nsStoreUser = namespace('user-auth/store-user')

@Component({
    middleware: ['authenticate'],
    layout: 'public',
    // meta: {
    //   role: [3, 2]
    // }
})
class CreateItem extends Vue {
    boxData: any[] = []

    totalWaiting: number = 0

    //-----Pagination---------------------------------
    pPagenum: number = 1
    pPageSize: number = 5
    totalRecords: number = 0
    blockedTable: boolean = false

    //---------------------------------------
    home = { icon: 'pi pi-home', to: '/homepage' }
    breads = [
        { label: 'Kênh bán' },
    ]
    isSeller: boolean = false
    appId: string | null = null
    //----------------------------------------
    oCategories: Array<any> | null = null

    @nsStoreUser.State('user')
    user!: User.Model | undefined
    @nsCategory.Action
    actGetAllCategory!: () => Promise<any>
    @nsStoreUser.Action
    actGetSellerApplication!: (params: any) => Promise<string>
    @nsStoreItem.Action
    actSearchItemApplication!: (params: any) => Promise<any>
    @nsStoreItem.Action
    actGetItemApplicationImage!: (params: any) => Promise<any>

    async mounted() {
        this.isSeller = true
        const response1 = await this.actGetAllCategory()
        this.oCategories = response1.records
        this.Search()
    }
    async Search(pageNum: number = this.pPagenum) {
        const params = {
            pageNum: pageNum,
            pageSize: this.pPageSize || 5,
            search: '',
            status: '',
            category: '',
        }
        this.blockedTable = true
        let response = await this.actSearchItemApplication(params)
        if (response && response.records.length > 0) {
            for (let i = 0; i < response.records.length; i++) {
                if (response.records[i].thumbnailId == undefined || response.records[i].thumbnailId == null) {
                    response.records[i].imgUrl = ''
                    continue
                }
                response.records[i].imgUrl = await this.getImageUrl(response.records[i].id, response.records[i].thumbnailId)
            }
            console.log(this.boxData)
            this.totalRecords = response.totalRecords
            this.totalWaiting = response.totalRecords
        }
        console.log('hẻh')
        this.boxData = response.records
        this.blockedTable = false
    }
    async getImageUrl(itemId: any, imgId: any) {
        try {
            console.log(imgId, 'lll', itemId)
            const params = {
                itemId: itemId,
                imgId: imgId,
            }
            return process.env.BE_API_URL + '/api/item/' + itemId + '/images/' + imgId
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
    onPage(event: any) {
        this.Search(event.page + 1)
    }
}
export default CreateItem
</script>
  
<style lang="sass" scoped>
  .card-control
    display: block
    background: $white
    font-weight: 1
    font-size: 0.875rem
    line-height: 1
    color: #69707a
    background-clip: padding-box
    border: 1px solid #c5ccd6
    appearance: none
    border-radius: 0.35rem
  
  .card-header
    padding: 1.2rem 1.35rem
    margin-bottom: 0
    background-color: rgba(33, 40, 50, 0.03)
    border-bottom: 1px solid rgba(33, 40, 50, 0.125)
  
  .element
    @include overflow-ellipsis(400px)
  .p-orderlist .p-orderlist-controls 
    display: none
  </style>
  