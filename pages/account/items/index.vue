<template>
    <section class="surface-0 flex align-items-center justify-content-center p-2">
        <div class="box-page-container flex flex-column container w-full">
            <Breadcrumb :home="home" :model="breads" />
            <div class="card-body my-3">

                <div class="grid">
                    <div class="field col-12">
                        <h2 class="font-bold text-brown mb-0">Danh sách sản phẩm chờ thanh toán</h2>
                    </div>
                    <div class="field col-12">
                        <div class="col-12 " v-for="item in items" :key="item.id" :item="item" style="height: 230px;">
                            <div class="grid item p-2 border-10" @click="onChangeCheckedItem(item)"
                                :class="item.selected ? 'surface-400' : ''" style="height: 100%;">
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
                    <div class="field col-12 sticky bottom-0 surface-0 py-4" style="sha">
                        <div class="flex justify-content-between align-items-center">
                            <div class="select-all">
                                <input type="checkbox" id="vehicle3" name="vehicle3" @change="takeAll()"
                                    :checked="selectAll">
                                <span>Chọn tất cả(5)</span>
                            </div>
                            <div class="total-money ">
                                <span class="vertical-align-middle">Tổng thanh toán: </span>
                                <h2 class=" ml-2 inline text-brown"> {{ formatNumber(2000000000) }} </h2>
                            </div>
                            <div class="action">
                                <button class="btn-primary p-3 px-5 border-10"> Tạo đơn hàng </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
  
<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
const nsStoreOrder = namespace('order/store-order')
const nsStoreItem = namespace('item/store-public-item')
const nsStoreCategory = namespace('category/store-category')

@Component({
    middleware: ['authenticate'],
    layout: 'public'
})
class ItemList extends Vue {

    products: any = null
    layout: any = 'grid'
    sortOrder: any = null
    sortField: any = null
    searchText: string = ''
    sortCategoryKey: any = null
    sortOptions: any = [{ id: '', name: '--------------' }]
    pPageNum: number = 1
    pPageSize: number = 12
    totalRecords: number = 0
    //---------------------------------------
    home = { icon: 'pi pi-home', to: '/homepage' }
    breads = [
        { label: 'Giỏ hàng' }
    ]
    items: any[] = [
        {
            item: {
                id: 1, name: 'Đồ cổ thời khỳ trung đông, đồ ăn đã thất truyền và thiu qua nhiều thế hệ',
                catName: 'Đồ ăn', price: 12000000, imgId: 1, date: '2023-12-01T20:00:00'
            },
            selected: false
        },
        {
            item: {
                id: 1, name: 'Đồ cổ thời khỳ trung đông, đồ ăn đã thất truyền và thiu qua nhiều thế hệ',
                catName: 'Đồ ăn', price: 12000000, imgId: 1, date: '2023-12-01T20:00:00'
            },
            selected: false
        },
        {
            item: {
                id: 1, name: 'Đồ cổ thời khỳ trung đông, đồ ăn đã thất truyền và thiu qua nhiều thế hệ',
                catName: 'Đồ ăn', price: 12000000, imgId: 1, date: '2023-12-01T20:00:00'
            },
            selected: false
        },
        {
            item: {
                id: 1, name: 'Đồ cổ thời khỳ trung đông, đồ ăn đã thất truyền và thiu qua nhiều thế hệ',
                catName: 'Đồ ăn', price: 12000000, imgId: 1, date: '2023-12-01T20:00:00'
            },
            selected: false
        },
        {
            item: {
                id: 1, name: 'Đồ cổ thời khỳ trung đông, đồ ăn đã thất truyền và thiu qua nhiều thế hệ',
                catName: 'Đồ ăn', price: 12000000, imgId: 1, date: '2023-12-01T20:00:00'
            },
            selected: false
        },
    ]
    selectAll: boolean = false
    @nsStoreItem.Action
    actGetItem!: (param: any) => Promise<any>

    @nsStoreCategory.Action
    actGetCategory!: (params: any) => Promise<any>

    async mounted() {
        this.getItem()
        this.getCategory()
    }

    async getItem() {
        const param = {
            pageNum: this.pPageNum,
            pageSize: this.pPageSize,
            search: this.searchText || '',
            category: this.sortCategoryKey || '',
        }
        const response = await this.actGetItem(param)
        if (response) {
            this.products = response?.records
            this.totalRecords = response.totalRecords
        }
    }

    async getCategory() {
        const response = await this.actGetCategory({
            pageNum: 1,
            pageSize: 1000,
            search: '',
        })
        if (response) {
            this.sortOptions = [
                { id: '', name: '--------------' },
                ...response.records
            ]
        }
    }

    onPage(event: any) {
        this.pPageNum = event.page + 1
        this.getItem()
    }
    viewItem(id: any) {
        this.$router.push("/p/item/" + id)
    }
    formatNumber(number: any) {
        const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return formattedNumber + " vnđ";
    }
    takeAll() {
        // Đảo ngược giá trị của selectAll
        this.selectAll = !this.selectAll;
        // Duyệt qua mảng items và gán giá trị selected tương ứng
        for (const item of this.items) {
            item.selected = this.selectAll;
        }
    }
    onChangeCheckedItem(item: any) {
        // Đảo ngược giá trị của selected của item được truyền vào
        item.selected = !item.selected;
        // Kiểm tra xem tất cả các item có được chọn hay không
        this.selectAll = this.items.every(item => item.selected);
    }

}
export default ItemList
</script>
  
<style lang="sass">
  
  </style>
  