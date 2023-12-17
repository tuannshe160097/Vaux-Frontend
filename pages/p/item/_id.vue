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
                        <div class="grid nested-grid">
                            <h2 class="col-12 mb-0">Bình luận</h2>
                            <div class="field col-12">
                                <form @submit.prevent="onComment">
                                    <Textarea class="w-full" v-model="comment" :autoResize="true"
                                        placeholder="Viết bình luận của bạn..." rows="1"></Textarea>
                                    <div v-if="comment != null && comment.trim() != ''" class="flex justify-content-end">
                                        <Button @click="comment = ''" class="btn-second border-10 mr-2">Hủy</Button>
                                        <Button type="submit" class="btn-primary border-10">Bình luận</Button>
                                    </div>
                                </form>
                            </div>
                            <div class="col-12">
                                <div v-for="comment in comments" :key="comment.id" class="col-12 mb-2">
                                    <div class="grid grid-nested">
                                        <div class="col-fixed surface-300 flex justify-content-center align-items-center"
                                            style="height: 50px; width:50px; border-radius:50%">
                                            <i class="pi pi-user" style="font-size: 1.5rem"></i>
                                        </div>
                                        <div class="col flex flex-column">
                                            <div class="flex flex-row">
                                                <div class="font-bold">{{ "Người tham gia " + comment.userId }}</div>
                                                <div class="ml-2">{{ formatDistanceToNow(comment.time) }}</div>
                                            </div>
                                            <div class="">{{ comment.content }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="md:col-5 col-12 md:pl-3">
                        <BidDialog :curItemId="itemId" :endDatetime="endDate" :reservePrice="item.reservePrice"></BidDialog>
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
    endDate: any
    displayAddItem: boolean = false
    display: boolean = false
    selectedItemsApproved: any = []
    priceBid: any = null
    previewImage: string | null | undefined = null;

    activeIndex: number = 0;
    displayBasic2: boolean = false
    images: any = []

    comments: any[] = [ ]
    comment: string | null = ''

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
    disableButton: boolean = false
    @nsStoreItem.Action
    actGetItem!: (params: any) => Promise<any>
    @nsStoreItem.Action
    actAddItemComment!: (params: any) => Promise<any>
    @nsStoreItem.Action
    actGetItemComments!: (params: any) => Promise<any>

    async created() {
        this.itemId = this.$route?.params?.id
    }
    async mounted() {
        await this.fetchData();
        this.items = [
            { label: 'Danh sách Sản phẩm', to: '/p/item' },
            { label: this.item.category.name, to: '/p/item?cId=' + this.item.category.id },
            { label: this.item.name }
        ]
        this.getComments()
    }
    async fetchData() {
        if (this.itemId == null) {
            this.$toast.add({
                severity: 'error',
                summary: 'Lỗi',
                detail: "Không tìm thấy id sản phẩm",
                life: 5000
            })
        }
        const params = {
            itemId: this.itemId
        }
        const response = await this.actGetItem(params)
        console.log('fetchData: ', response)
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
        this.endDate = response.ongoingSession.endDate
        for (const imgId of response.images) {
            const result2 = await this.getImageUrl(this.itemId, imgId)
            const imageInfo = { itemImageSrc: result2, alt: "result2.name", index: imgId.index };
            this.images.push(imageInfo);
        }
        this.Properties = response.itemProperties
    }
    getImageUrl(itemId: any, imgId: any) {
        try {
            if (itemId == null || imgId == null) {
                console.log('getImageUrl: itemId=' + itemId + " imgId=" + imgId)
                return ''
            }
            return process.env.BE_API_URL + '/api/Item/' + itemId + '/Images/' + imgId
        } catch (error) {
            this.$store.commit('commons/store-error/setError', "Error fetching or converting image")
            console.error("Error fetching or converting image:", error);
            return null;
        }
    }
    displayFullScreen(index: any) {
        this.displayBasic2 = true;
    }
    hidePreview(event: Event) {
        if (event.target === event.currentTarget) {
            this.previewImage = null;
        }
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
            return `${days} ngày trước`;
        } else if (hours > 0) {
            return `${hours} giờ trước`;
        } else if (minutes > 0) {
            return `${minutes} phút trước`;
        } else {
            return `${seconds > 10 ? seconds : 'vài'} giây trước`;
        }
    }
    //======================================================
    async onComment() {
        const response = await this.actAddItemComment({ itemId: this.itemId, content: this.comment })
        console.log('onComment: ', response)
    }
    async getComments() {
        this.comments = []
        const response = await this.actGetItemComments({ itemId: this.itemId, pageNum: 1, pageSize: -1 })
        console.log('getComments: ', response)
        this.comments = response.records.map((comment: any) => ({
            id: comment.index,
            userId: comment.userId,
            time: comment.created,
            content: comment.content,
        }));
    }
}
export default EditAuctionList
</script>
  
<style lang="sass">
  .p-galleria-thumbnail-item-content
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
      padding-right:2px
      
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
  