<template>
    <section class="surface-0 flex align-items-center justify-content-center p-2">
        <div class="box-page-container flex flex-column container w-full">
            <Breadcrumb :home="home" :model="items" />
            <div class="card-body my-3">
                <div class="grid">
                    <div class="md:col-7 col-12">
                        <div class="grid nested-grid">
                            <h1 class="font-bold text-brown mb-0 col-12">{{ item.name }}</h1>
                            <div class="field col-12">
                                <Galleria :value="images" :activeIndex.sync="activeIndex" class="viewImage"
                                    :responsiveOptions="responsiveOptions" :numVisible="5" :showItemNavigators="true">
                                    <template #item="slotProps">
                                        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt"
                                            style=" width: auto;  height : auto;  max-height: 100%; max-width: 100%;"
                                            @click="displayFullScreen(slotProps.item.index)" />
                                    </template>
                                    <template #thumbnail="slotProps">
                                        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt"
                                            style="width: auto;  height : auto;  max-height: 100%; max-width: 100%; padding-left: 10px;" />
                                    </template>
                                </Galleria>

                                <Galleria :value="images" :activeIndex.sync="activeIndex"
                                    :responsiveOptions="responsiveOptions" :numVisible="7" containerStyle="max-width: 850px"
                                    :circular="true" :fullScreen="true" :showItemNavigators="true" :showThumbnails="false"
                                    :visible.sync="displayBasic2">
                                    <template #item="slotProps">
                                        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt"
                                            style=" width: auto;  height : auto;  max-height: 100vh; max-width: 90vw;" />
                                    </template>
                                    <template #thumbnail="slotProps">
                                        <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt"
                                            style="max-width: 200px; display: block; max-height: 100px;" />
                                    </template>
                                    <template #footer>
                                        <div class="custom-galleria-footer">
                                            ddaya la fooot er
                                        </div>
                                    </template>
                                </Galleria>
                            </div>
                            <div class="field col-12">
                                {{ item.description }}
                            </div>
                            <div class="field col-12">
                                <div class="grid nested-grid">
                                    <div v-for="property in Properties" :key="property.label" class=" col-6">
                                        <div class="grid nested-grid">
                                            <div class=" col-12 pb-0 text-brown">
                                                {{ property.label }}
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
                                <h4 class="mb-0">{{ countdownText }}</h4>
                            </div>
                            <div class="col-12 border-solid border-1 ">
                                <BidDialog :curItemId="itemId" :reservePrice="item.reservePrice"></BidDialog>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
  
<script lang="ts">
import { thisExpression } from '@babel/types'
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import BidDialog from '~/components/bidDialog/bidDialog.vue'
import { getDateFormat } from '~/utils/commons/helper'
const nsStoreItem = namespace('item/store-item')
const dayjs = require('dayjs')

@Component({
    layout: 'public',
    meta: { isPublic: true },
    components: {
        BidDialog
    }
})
class EditAuctionList extends Vue {
    itemId: any
    item: any = {
        id: '',
        name: '',
        thumbnailId: '',
        reservePrice: '',
        itemProperties: '',
        images: '',
        description: '',
        category: '',
    }
    startDate: any = null
    endDate: any = '2023-12-29T20:00:00'
    countdownText: string = ""; // Thêm dòng này
    displayAddItem: boolean = false
    display: boolean = false
    selectedItemsApproved: any = []
    priceBid: any = null
    previewImage: string | null | undefined = null;

    zoom: number = 1;
    rotation: number = 0;
    activeIndex: number = 0;
    displayBasic2: boolean = false
    images: any = []

    responsiveOptions = [
        { breakpoint: '1024px', numVisible: 5 },
        { breakpoint: '960px', numVisible: 4 },
        { breakpoint: '768px', numVisible: 3 },
        { breakpoint: '560px', numVisible: 1 }
    ]
    home = { icon: 'pi pi-home', to: '/homepage' }
    items: any[] = []
    Properties = [
        { label: 'Năm', value: '1010' },
        { label: 'Cân nặng', value: '12kg' },
        { label: 'Màu sắc', value: 'Đen' },
        { label: 'Nguồn gốc', value: 'Thần rùa' },
        { label: 'Chất liệu', value: 'Thép đen nguyên khối' }
    ]
    bids = [
        // { id: 1, name: 'Lương Thị Kiểm Định Viên Thị Kiểm Định Viên', time: '2023-11-23T17:56', price: 1200000 },
        // { id: 2, name: 'Lương Tiến Anh', time: '2023-11-23T16:45', price: 1500000 },
        // { id: 3, name: 'Lương Tiến Anh', time: '2023-11-23T16:34', price: 1200000 },
        // { id: 4, name: 'Lương Tiến Anh', time: '2023-11-23T16:23', price: 120000 },
        // { id: 5, name: 'Lương Tiến Anh', time: '2023-11-23T16:11', price: 12000 }
    ]
    disableButton: boolean = false
    @nsStoreItem.Action
    actGetItem!: (params: any) => Promise<any>
    @nsStoreItem.Action
    actGetItemBids!: (params: any) => Promise<any>
    @nsStoreItem.Action
    actAddItemBids!: (params: any) => Promise<any>

    created() {
        this.itemId = this.$route?.params?.id
    }
    async mounted() {
        await this.fetchData();
        console.log(this.itemId)
        this.items = [
            { label: 'Danh sách Sản phẩm', to: '/item' },
            { label: this.item.category.name, to: '/seller' },
            { label: this.item.name }
        ]
    }
    async fetchData() {
        const params = {
            itemId: this.itemId
        }
        const response = await this.actGetItem(params)
        console.log('LTA: ', response)
        this.item = {
            id: response.id,
            name: response.name,
            thumbnailId: response.thumbnailId,
            reservePrice: response.reservePrice,
            itemProperties: response.itemProperties,
            images: response.images,
            description: response.description,
            category: response.category,
        }
        for (const imgId of response.images) {
            const result2 = await this.getImageUrl(this.itemId, imgId)
            const imageInfo = { itemImageSrc: result2, alt: "result2.name", index: imgId.index };
            this.images.push(imageInfo);
        }
        this.Properties = response.itemProperties
        this.formatTimeLeft(response.auctionSessions[0].endDate);
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
        const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return "₫" + formattedNumber;
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
    formatTimeLeft(timeEnd: any) {
        const updateInterval = 1000;
        const targetTime: any = new Date(timeEnd);
        const updateTimer = () => {
            this.countdownText = "Thời gian còn lại: " + this.calculateRemainingTime(targetTime);
        }
        // Initial update
        updateTimer();
        // Set up interval for periodic updates
        const intervalId = setInterval(() => {
            updateTimer();
        }, updateInterval);
    }
    calculateRemainingTime(targetTime: any): string {
        const currentTime: any = new Date();
        const diffInMs = targetTime - currentTime;
        const diffInSeconds = Math.floor(diffInMs / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        const remainingHours = diffInHours % 24;
        const remainingMinutes = diffInMinutes % 60;
        const remainingSeconds = diffInSeconds % 60;

        let timeLeft = "";
        if (diffInDays > 0) {
            timeLeft += `${diffInDays} ngày `;
        }
        if (remainingHours > 0) {
            timeLeft += `${remainingHours} giờ `;
        }
        if (remainingMinutes > 0) {
            timeLeft += `${remainingMinutes} phút `;
        }
        timeLeft += `${remainingSeconds} giây`;

        return timeLeft;
    }
}
export default EditAuctionList
</script>
  
<style lang="sass">
  .p-galleria-thumbnail-item-content
    height:auto
    max-height:100%
    overflow: hidden
  .p-galleria-thumbnail-items
    height:100px
  .viewImage
    .p-galleria-item
      width: 100%
      height: 30rem
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
  