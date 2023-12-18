<template>
    <section class="surface-0 flex align-items-center justify-content-center p-2">
        <div class="box-page-container flex flex-column container w-full">
            <Breadcrumb :home="home" :model="breads" />
            <div class="card-body my-3">
                <TabView class="tabview-custom">
                    <TabPanel>
                        <template #header>
                            <span class="material-symbols-outlined vertical-align-bottom m-0">
                                shopping_cart
                            </span>
                            <span>Danh sách sản phẩm</span>
                        </template>
                        <div class="grid">
                            <div class="field col-12">
                                <h2 class="font-bold text-brown mb-0">Danh sách sản phẩm chờ thanh toán</h2>
                            </div>
                            <div v-if="items.length > 0" class="field col-12">
                                <div class="col-12 " v-for="item in items" :key="item.id" :item="item"
                                    style="height: 230px;">
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
                                                        {{ formatDistance(item.item.dueDate) }}
                                                    </span>
                                                </div>
                                                <!-- <Button class="mb-2" icon="pi pi-shopping-cart" label="Add to Cart"></Button> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="items.length > 0" class="field col-12 sticky bottom-0 surface-0 py-4" style="sha">
                                <div class="flex justify-content-between align-items-center">
                                    <div class="select-all">
                                        <input type="checkbox" id="takeAll" name="takeAll" @change="takeAll()"
                                            :checked="selectAll">
                                        <label for="takeAll">Chọn tất cả ({{ totalRecords }})</label>
                                    </div>
                                    <div class="total-money ">
                                        <span class="vertical-align-middle">Tổng thanh toán: </span>
                                        <h2 class=" ml-2 inline text-brown"> {{ formatNumber(totalPrice) }} </h2>
                                    </div>
                                    <div class="action">
                                        <!-- <button class="btn-primary p-3 px-5 border-10"> Tạo đơn hàng </button> -->
                                        <Button label="Tạo đơn hàng" icon="pi pi-plus" @click="createOrder()"
                                            class="btn-primary"></Button>
                                    </div>
                                </div>
                            </div>
                            <div v-if="items.length <= 0">
                                <div class="col-12">Bạn chưa có sản phẩm nào đấu giá thành công</div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <template #header>
                            <span class="material-symbols-outlined vertical-align-bottom m-0">
                                orders
                            </span>
                            <span>Đơn hàng chưa hoàn thiện</span>
                        </template>
                        <div class="grid">
                            <div class="field col-12">
                                <h2 class="font-bold text-brown mb-0">Danh sách đơn hàng chưa hoàn thiện</h2>
                            </div>
                            <div class="field col-12">
                                <div class="grid nested-grid mb-3" v-for="order in orders" :key="order.id" :item="order">
                                    <div class="envelope"></div>
                                    <div class="col-12 flex justify-content-between"
                                        style="border-bottom: 1px dashed rgba(0,0,0,.09)">
                                        <span class="text-brown">
                                            <span class="material-icons vertical-align-bottom mr-2">person</span>
                                            {{ order.receiverName + ' - ' + order.receiverPhone + ' - ' + order.address }}
                                        </span>
                                        <span>
                                            <a class="px-2" href="#" @click="cancelOrder(order.id)"
                                                style="border-right: 1px solid black;">Hủy</a>
                                            <a class="px-2"
                                                :href="'http://localhost:4000/account/items/checkout/' + order.id">Tiếp
                                                tục</a>
                                        </span>
                                    </div>
                                    <div class="grid nested-grid item p-2 border-10 w-full" v-for="item in order.items"
                                        :key="item.id" :item="item">
                                        <div
                                            class="col-6 flex align-items-center white-space-nowrap overflow-hidden text-overflow-ellipsis">
                                            <img :src="getImageUrl(item.id, item.thumbnailId)" alt="image"
                                                style="object-fit: contain; width: 50px; height: 50px;" />
                                            <span
                                                class="ml-2 white-space-nowrap overflow-hidden text-overflow-ellipsis font-medium">
                                                <span class="">{{ item.name }}</span>
                                            </span>
                                        </div>
                                        <div class="col-3 flex align-items-center font-light">
                                            <span class="">{{ item.catName }}</span>
                                        </div>
                                        <div class="col-3 flex align-items-center justify-content-end">
                                            <span class="">{{ formatNumber(item.price) }}</span>
                                        </div>
                                    </div>
                                    <div v-if="order.itemsleft > 0" class="col-12 flex justify-content-center w-full"
                                        style="border-top: 1px dashed rgba(0,0,0,.09)">
                                        Và {{ order.itemsleft }} sản phẩm nữa
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </TabView>
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
    orders: any[] = []
    selectAll: boolean = false
    @nsStoreItem.Action
    actGetItemsWon!: () => Promise<any>
    @nsStoreOrder.Action
    actPostOrder!: (params: any) => Promise<any>
    @nsStoreOrder.Action
    actDeleteOrder!: (params: any) => Promise<any>
    @nsStoreOrder.Action
    actGetAllOrder!: (params: any) => Promise<any>

    async created() {
        console.log('LTA????')
        const paymentStatus = Array.isArray(this.$route.query.vnp_ResponseCode)
            ? this.$route.query.vnp_ResponseCode[0]
            : this.$route.query.vnp_ResponseCode
        console.log('LTA', paymentStatus)
    }
    async mounted() {
        this.getItems()
        this.getOrders()
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
                            dueDate: item.paymentDueDate,
                        },
                        selected: false
                    });
            }
        }
    }
    async getOrders() {
        const response = await this.actGetAllOrder({})
        if (response) {
            console.log('LTA', response)
            if (response.records.length <= 0) {
                return
            }
            for (let i = 0; i < response.records.length; i++) {
                if (response.records[i].shipment.length <= 0) {
                    continue
                }
                let order: any = {
                    id: response.records[i].id,
                    receiverName: response.records[i].receiverName,
                    receiverPhone: response.records[i].receiverPhone,
                    address: response.records[i].address == null ? '' : response.records[i].address,
                    totalCost: response.records[i].totalCost,
                    items: [],
                    totalItem: 0,
                    itemsleft: 0
                }
                for (let j = 0; j < response.records[i].shipment.length; j++) {
                    if (response.records[i].shipment[j].items.length <= 0) {
                        continue
                    }
                    order.totalItem += response.records[i].shipment[j].items.length
                    for (let k = 0; k < response.records[i].shipment[j].items.length; k++) {
                        if (order.items.length >= 3) break
                        order.items.push({
                            id: response.records[i].shipment[j].items[k].id,
                            name: response.records[i].shipment[j].items[k].name,
                            catName: response.records[i].shipment[j].items[k].category.name,
                            price: response.records[i].shipment[j].items[k].highestBid.amount,
                            thumbnailId: response.records[i].shipment[j].items[k].thumbnailId,
                        })
                    }
                }
                if (order.totalItem - 3 > 0) {
                    order.itemsleft = order.totalItem - 3
                }
                this.orders.push(order)
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
            if (response) {
                console.log(response)
                this.$router.push("/account/items/checkout/" + response.id)
            }
        }
    }
    async cancelOrder(orderId: any) {
        const response = await this.actDeleteOrder({ orderId: orderId })
        console.log(response)
        if (response) {
            this.$toast.add({
                severity: 'success', summary: 'Đã hủy đơn hàng',
                detail: 'Đã hủy đơn hàng', life: 10000
            })
            this.getOrders()
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
        const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return "₫" + formattedNumber;
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
}
export default ItemList
</script>
  
<style lang="sass">
.envelope    
    height: 3px
    width: 100%
    background-position-x: -30px
    background-size: 116px 3px
    background-image: repeating-linear-gradient(45deg,#6fa6d6,#6fa6d6 33px,transparent 0,transparent 41px,#f18d9b 0,#f18d9b 74px,transparent 0,transparent 82px)

  </style>
  