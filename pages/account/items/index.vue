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
                                    <input type="checkbox" :checked="item.selected">
                                </div>
                                <div class="col-5 surface-200" style="height: 100%; background-color: azure;">
                                    <img :src="getImageUrl(item.item.id, item.item.thumbnailId)" alt="image"
                                        style="object-fit: contain; width: 100%; height: 100%;" />
                                </div>
                                <div class="col flex flex-column justify-content-between">
                                    <div class="infomation">
                                        <h3 class=" m-0 ">{{ item.item.name }}</h3>
                                        <span class=" mt-2 font-bold ">{{ item.item.catName }}</span>
                                        <div class="product-description">{{ item.item.description }}</div>
                                    </div>
                                    <div class="flex-end">
                                        <div class=" flex flex-row justify-content-between align-items-end">
                                            <div>
                                                <span class="font-bold">GIÁ MUA:</span>
                                                <h4 class=" m-0  text-brown">{{ formatNumber(item.item.price) }}
                                                </h4>
                                            </div>
                                            <span class="text-danger">
                                                Còn 3 ngày
                                            </span>
                                        </div>
                                        <!-- <Button class="mb-2" icon="pi pi-shopping-cart" label="Add to Cart"></Button> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field col-12 sticky bottom-0 surface-0 py-4" style="sha">
                        <div class="flex justify-content-between align-items-center">
                            <div class="select-all">
                                <input type="checkbox" id="takeAll" name="takeAll" @change="takeAll()" :checked="selectAll">
                                <label for="takeAll">Chọn tất cả ({{ totalRecords }})</label>
                            </div>
                            <div class="total-money ">
                                <span class="vertical-align-middle">Tổng thanh toán: </span>
                                <h2 class=" ml-2 inline text-brown"> {{ formatNumber(totalPrice) }} </h2>
                            </div>
                            <div class="action">
                                <!-- <button class="btn-primary p-3 px-5 border-10"> Tạo đơn hàng </button> -->
                                <Button label="Tạo đơn hàng" icon="pi pi-plus" @click="createOrder()" class="btn-primary" />
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
const nsStoreItem = namespace('item/store-item')

@Component({
    middleware: ['authenticate'],
    layout: 'public'
})
class ItemList extends Vue {
    totalPrice: number = 0
    totalRecords: number = 0
    home = { icon: 'pi pi-home', to: '/homepage' }
    breads = [
        { label: 'Giỏ hàng' }
    ]
    items: any[] = []
    selectAll: boolean = false
    @nsStoreItem.Action
    actGetItemsWon!: () => Promise<any>
    @nsStoreOrder.Action
    actPostOrder!: (params: any) => Promise<any>

    async mounted() {
        this.getItems()
    }
    async getItems() {
        const response = await this.actGetItemsWon()
        if (response) {
            console.log(response)
            if (response.records <= 0) { return }
            this.totalRecords = response.totalRecords
            for (let i = 0; i < response.records.length; i++) {
                const item = response.records[i];
                this.items.push(
                    {
                        item: {
                            id: item.id,
                            name: item.name,
                            catName: item.category.name,
                            price: item.highestBid.amount,
                            thumbnailId: item.thumbnailId,
                            dueDate: item.updated,
                        },
                        selected: false
                    });
            }
        }
    }
    async createOrder() {
        let items: any[] = []
        for (const item of this.items) {
            if (item.selected) {
                items.push(item.item.id)
            }
        }
        if (items.length <= 0) {
            this.$toast.add({
                severity: 'error', summary: 'Chưa chọn sản phẩm',
                detail: 'Chưa chọn sản phẩm để tạo đơn hàng. Vui lòng chọn sản phẩm bạn muốn tạo đơn hàng', life: 10000
            })
        } else {
            const response = await this.actPostOrder({ orderIdList: items })
            console.log(response)
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
            return undefined;
        }
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
        this.calculateTotalPrice()
    }
    onChangeCheckedItem(item: any) {
        // Đảo ngược giá trị của selected của item được truyền vào
        item.selected = !item.selected;
        // Kiểm tra xem tất cả các item có được chọn hay không
        this.selectAll = this.items.every(item => item.selected);
        this.calculateTotalPrice()
    }
    calculateTotalPrice() {
        let total = 0
        for (const item of this.items) {
            if (item.selected) {
                total += item.item.price
            }
        }
        this.totalPrice = total
    }
}
export default ItemList
</script>
  
<style lang="sass">
  
  </style>
  