<template>
    <section class="surface-0 flex align-items-center justify-content-center p-2">
        <div class="box-page-container flex flex-column container w-full">
            <Breadcrumb :home="home" :model="items" />
            <div class="card-body my-3">
                <div class="grid">
                    <div class="col-7">
                        <div class="grid nested-grid">
                            <h1 class="font-bold text-brown mb-0 col-12">Thanh gươm của thần rùa, vua Lý Thái Tổ</h1>
                            <div class="field col-12">
                                <Galleria :value="images" :activeIndex.sync="activeIndex"
                                    :responsiveOptions="responsiveOptions" :numVisible="5" :showItemNavigators="true">
                                    <template #item="slotProps">
                                        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt"
                                            style="width: 100%; display: block;"
                                            @click="displayFullScreen(slotProps.item.index)" />
                                    </template>
                                    <template #thumbnail="slotProps">
                                        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt"
                                            style="width: 100%; display: block; padding-left: 10px;" />
                                    </template>
                                </Galleria>

                                <Galleria :value="images" :activeIndex.sync="activeIndex"
                                    :responsiveOptions="responsiveOptions" :numVisible="7" containerStyle="max-width: 850px"
                                    :circular="true" :fullScreen="true" :showItemNavigators="true" :showThumbnails="false"
                                    :visible.sync="displayBasic2">
                                    <template #item="slotProps">
                                        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt"
                                            style="width: 100%; display: block;" />
                                    </template>
                                    <template #thumbnail="slotProps">
                                        <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt"
                                            style="display: block;" />
                                    </template>
                                    <template #footer>
                                        <div class="custom-galleria-footer">
                                            ddaya la fooot er
                                        </div>
                                    </template>
                                </Galleria>
                            </div>
                            <div class="field col-12">
                                This is description This is description This is description This is description This is
                                description This is description This is description This is description This is description
                                This
                                is description This is description This is description This is description This is
                                description
                                This is description This is description This is description This is description This is
                                description This is description This is description This is description This is description
                                This
                                is description This is description This is description This is description This is
                                description
                                This is description This is description This is description This is description This is
                                description This is description This is description This is description This is description
                                This
                                is description This is description This is description
                            </div>
                            <div class="field col-12">
                                <div class="grid nested-grid">
                                    <div v-for="property in Properties" :key="property.name" class=" col-6">
                                        <div class="grid nested-grid">
                                            <div class=" col-12 pb-0 text-brown">
                                                {{ property.name }}
                                            </div>
                                            <div class=" col-12 pt-0">
                                                {{ property.value }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="md:col-5 col-12 md:pl-3">
                        <div class="grid nested-grid">
                            <div class="align-self-center col-12 field">
                                <h4 class="mb-0">Thời gian còn lại: 12:34:33</h4>
                            </div>
                            <div class="col-12 border-solid border-1 ">
                                <div class="grid nested-grid">
                                    <div class="col-12 text-brown">
                                        Giá hiện tại
                                    </div>
                                    <div class="col-12">
                                        <h1>{{ formatNumber(1200000) }}</h1>
                                    </div>
                                    <div class="col-12 text-brown">
                                        Đã đạt mức giá tối thiểu
                                    </div>
                                    <div class="col-12 mt-3 text-brown border-bottom-1" style="border-color: #E0A26F;">
                                        <div class="grid">
                                            <div class="col-4">
                                                <button class="p-3 btn-second border-10 w-full">{{ formatNumber(1400000)
                                                }}</button>
                                            </div>
                                            <div class="col-4">
                                                <button class="p-3 btn-second border-10 w-full">{{ formatNumber(1500000)
                                                }}</button>
                                            </div>
                                            <div class="col-4">
                                                <button class="p-3 btn-second border-10 w-full">{{ formatNumber(1600000)
                                                }}</button>
                                            </div>
                                            <div class="col-12">
                                                <InputNumber class="w-full this-p-inputtext-p-4" v-model="priceBid"
                                                    placeholder="1,210,000 hoặc cao hơn">
                                                </InputNumber>
                                            </div>
                                            <div class="col-12">
                                                <button class="p-3 btn-primary border-10 w-full">Đấu giá</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="text-brown mb-1">Lịch sử đấu giá</div>

                                        <table class="w-full" style="  border-collapse: collapse;  border-spacing: 0;">
                                            <tr v-for="bid in bids" :key="bid.id">
                                                <td class="p-0 pe-2">Người tham gia {{ bid.id }}</td>
                                                <td class="px-2">{{ formatDistanceToNow(bid.time) }}</td>
                                                <td class="text-right ps-2">{{ formatNumber(bid.price) }}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
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
import CreateAuction from '~/components/dialog/CreateAuction.vue'
import { getDateFormat } from '~/utils/commons/helper'
const nsStoreAuction = namespace('auction/store-auction')
const dayjs = require('dayjs')

@Component({
    layout: 'public',
    meta: { isPublic: true }
})
class EditAuctionList extends Vue {
    startDate: any = null
    endDate: any = null
    displayAddItem: boolean = false
    display: boolean = false
    selectedItemsApproved: any = []
    priceBid: any = null
    previewImage: string | null | undefined = null;

    zoom: number = 1;
    rotation: number = 0;
    activeIndex: number = 0;
    displayBasic2: boolean = false
    images = [{ index: 0, itemImageSrc: 'https://localhost:6565/api/Item/1/Images/8', alt: 'Item/1/Images/8' },
    { index: 0, itemImageSrc: 'https://localhost:6565/api/Item/1/Images/9', alt: 'Item/1/Images/9' },
    { index: 1, itemImageSrc: 'https://localhost:6565/api/Item/1/Images/10', alt: 'Item/1/Images/10' },
    { index: 2, itemImageSrc: 'https://localhost:6565/api/Item/1/Images/11', alt: 'Item/1/Images/11' },
    { index: 3, itemImageSrc: 'https://localhost:6565/api/Item/1/Images/12', alt: 'Item/1/Images/12' },
    { index: 4, itemImageSrc: 'https://localhost:6565/api/Item/1/Images/13', alt: 'Item/1/Images/13' },
    { index: 5, itemImageSrc: 'https://localhost:6565/api/Item/1/Images/14', alt: 'Item/1/Images/14' },
    { index: 6, itemImageSrc: 'https://localhost:6565/api/Item/1/Images/15', alt: 'Item/1/Images/15' },
    { index: 7, itemImageSrc: 'https://localhost:6565/api/Item/1/Images/16', alt: 'Item/1/Images/16' },
    { index: 8, itemImageSrc: 'https://localhost:6565/api/Item/1/Images/17', alt: 'Item/1/Images/17' },
    { index: 9, itemImageSrc: 'https://localhost:6565/api/Item/1/Images/18', alt: 'Item/1/Images/18' },]

    responsiveOptions = [
        { breakpoint: '1024px', numVisible: 5 },
        { breakpoint: '960px', numVisible: 4 },
        { breakpoint: '768px', numVisible: 3 },
        { breakpoint: '560px', numVisible: 1 }
    ]

    home = { icon: 'pi pi-home', to: '/homepage' }
    items = [
        { label: 'Sản phẩm', to: '/seller' },
        { label: 'Category name', to: '/seller' },
        { label: 'Item name' }
    ]
    Properties = [
        { name: 'Năm', value: '1010' },
        { name: 'Cân nặng', value: '12kg' },
        { name: 'Màu sắc', value: 'Đen' },
        { name: 'Nguồn gốc', value: 'Thần rùa' },
        { name: 'Chất liệu', value: 'Thép đen nguyên khối' }
    ]
    bids = [
        { id: 1, name: 'Lương Thị Kiểm Định Viên Thị Kiểm Định Viên', time: '2023-11-23T17:56', price: 1200000 },
        { id: 2, name: 'Lương Tiến Anh', time: '2023-11-23T16:45', price: 1500000 },
        { id: 3, name: 'Lương Tiến Anh', time: '2023-11-23T16:34', price: 1200000 },
        { id: 4, name: 'Lương Tiến Anh', time: '2023-11-23T16:23', price: 120000 },
        { id: 5, name: 'Lương Tiến Anh', time: '2023-11-23T16:11', price: 12000 }
    ]
    disableButton: boolean = false
    @nsStoreAuction.Action
    actGetAuctionById!: (params: any) => Promise<any>

    @nsStoreAuction.Action
    actUpdateAuction!: (params: any) => Promise<any>

    async mounted() {
        const itemId = this.$route?.params?.id
        console.log('LTA: ', itemId)
    }
    displayFullScreen(index: any) {
        // this.activeIndex = index;
        this.displayBasic2 = true;
    }

    hidePreview(event: Event) {
        // this.previewImage = null;
        // this.display = false;
        if (event.target === event.currentTarget) {
            this.previewImage = null;
        }
    }
    zoomIn() {
        this.zoom += 0.1;
    }

    zoomOut() {
        if (this.zoom > 0.1) {
            this.zoom -= 0.1;
        }
    }

    rotate() {
        this.rotation += 90;
    }

    nextImage() {
        // Implement logic to move to the next image in the gallery
    }
    formatNumber(number: any) {
        const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return formattedNumber + " vnđ";
    }
    formatDistanceToNow(timeString: any) {
        const currentTime: any = new Date();
        const targetTime: any = new Date(timeString);

        const timeDifference = currentTime - targetTime;
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
        }
    }
}
export default EditAuctionList
</script>
  
<style lang="sass">
  .edit-auction-page
    height: calc(100vh - 100px)
  
  .this-p-inputtext-p-4
    .p-inputtext 
      padding:1.5rem
      
  /* Add custom styles for the modal */
  .custom-modal
    position: fixed
    top: 0
    left: 0
    width: 100vw
    height: 100vh
    background: rgba(0, 0, 0, 0.8)
    z-index: 9999
    display: flex
    align-items: center
    justify-content: center
    align-items: center

  .modal-content
    width: 100vw
    height: 100vh
    overflow: hidden
  /* Add styles for the toolbar */
  .toolbar
    position: absolute
    top: 0
    left: 0
    right: 0
    background: rgba(255, 255, 255, 0.8)
    padding: 10px
    display: flex
    justify-content: space-around
    z-index: 1
  .image-container
    display: flex
    align-items: center
    justify-content: center
  </style>
  