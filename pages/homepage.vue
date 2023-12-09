<template>
    <section class="surface-0 flex-column align-items-center justify-content-center p-0"
        style="font-size: 16px; max-width: 100vw !important;">
        <div class="my-5 box-page-container flex flex-column justify-content-center align-items-center container w-full"
            style="">
            <div class="flex justify-content-center align-items-center px-2"
                style="min-height:500px; max-height: 80vh;max-width: 1200px">
                <div class="pr-8">
                    <span class="text-brown font-bold" style="font-size: 20px;">Chào mừng đến với VAUX, với châm
                        ngôn:</span>
                    <h1 class="mt-0 font-bold text-dark">Người xứng vật đáng</h1>
                    <p>
                        Chỉ với ₫10.000 bạn đã có thể đấu giá sản phẩm bạn yêu thích.
                        Vaux là nền tảng công nghệ đầu tiên cho phép các bạn đấu giá các sản phẩm đồ cổ giữa người với người
                    </p>
                </div>
                <Galleria :value="images" :numVisible="5" style=" height: 500px; width: 50%" :showThumbnails="false"
                    :showIndicators="true" :showIndicatorsOnItem="true" :autoPlay="true" :circular="true">
                    <template #item="slotProps">
                        <a :href="slotProps.item.url">
                            <div style=" height: 500px; width: 640px; background-position: center;
                                background-repeat: no-repeat; background-size: cover;"
                                :style="'background-image: url(' + slotProps.item.itemImageSrc + ')'">
                                <div class="flex align-items-center justify-content-center"
                                    style=" width: 100%;height: 100%; background-color: #ffffff66;">
                                    <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt"
                                        style="width: 100%; height: 100%; display: block;  object-fit: contain;" />
                                </div>
                            </div>
                        </a>
                    </template>
                </Galleria>
            </div>
        </div>
        <div class="box-page-container flex justify-content-center  container w-full m-0 p-0 bg-primary">
            <div class="pt-3 flex flex-column align-items-center justify-content-center px-2 w-full"
                style="max-width: 1200px">
                <h1 class="check font-bold" style="color:#fff">Các sản phẩm sắp kết thúc đấu giá</h1>
                <Carousel v-if="endSoonItems && endSoonItems.length > 0" :value="endSoonItems" :numVisible="4"
                    :numScroll="3" contentClass="w-full custom_navigator_button_1" class=" w-full custom-carousel"
                    indicatorsContentClass="hidden" :autoplayInterval="5000">
                    <template #item="slotProps">
                        <a :href="slotProps.data.url" style="text-decoration: none;">
                            <div class="this-is-item" style="color: #fff;">
                                <div class="product-item-content">
                                    <div class="mb-3 w-full px-2" style="height: 200px;">
                                        <img :src="slotProps.data.thumbnailUrl" :alt="slotProps.data.name"
                                            class="product-image"
                                            style="bottom: 0px; height: 100%; object-fit: cover; object-position: center center; width: 100%;" />
                                    </div>
                                    <div class=" px-2">
                                        <h4 class="mb-1 w-full"
                                            style=" display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">
                                            {{ slotProps.data.name }}</h4>
                                        <h6 class="mt-3 mb-1">GIÁ HIỆN TẠI</h6>
                                        <h5 class="mt-0 mb-3 font-bold">{{ formatNumber(slotProps.data.curBid) }}</h5>
                                        <h6 class="mt-0 mb-3">{{ slotProps.data.endDateStr }}</h6>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </template>
                </Carousel>
                <div v-else class="w-full"> Không có sản phẩm nào để hiển thị </div>
            </div>
        </div>
        <div class="box-page-container flex justify-content-center  container w-full m-0 p-0">
            <div class="py-6 flex flex-column align-items-center justify-content-center px-2 w-full"
                style="max-width: 1200px;">
                <h1 class="check font-bold text-dark">Các sản phẩm đang được đấu giá</h1>
                <div v-if="items && items.length > 0" class="grid">
                    <div v-for="item in items" :key="item.id" class="this-is-item col-3" style="">
                        <div class="product-item-content">
                            <div class="mb-3 w-full px-2" style="height: 200px;">
                                <img :src="item.thumbnailUrl" :alt="item.name" class="product-image"
                                    style="bottom: 0px; height: 100%; object-fit: cover; object-position: center center; width: 100%;" />
                            </div>
                            <div class=" px-2">
                                <h4 class="mb-1 w-full"
                                    style=" display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">
                                    {{ item.name }}</h4>
                                <h6 class="mt-3 mb-1">GIÁ HIỆN TẠI</h6>
                                <h5 class="mt-0 mb-3 font-bold">{{ (item.curBid) }}</h5>
                                <h6 class="mt-0 mb-3">{{ (item.endDateStr) }}</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="w-full"> Không có sản phẩm nào để hiển thị </div>
                <Button class="btn-primary" @click="viewAll()" label="Xem tất cả"></Button>
            </div>
        </div>
        <div class="hidden">
            <img v-for="item in images" :key="item.itemImageSrc" :src="item.itemImageSrc">
        </div>
    </section>
</template>
  
<script lang='ts'>
import { Component, namespace, Vue } from 'nuxt-property-decorator'
const nsStoreItem = namespace('item/store-item')

@Component({
    layout: 'public',
    meta: { isPublic: true }
})
class homepage extends Vue {
    images: any[] = [
        { itemImageSrc: 'https://cdn.pixabay.com/photo/2017/10/19/12/49/background-2867531_640.png', alt: '' },
        { itemImageSrc: 'https://i.pinimg.com/originals/0c/1b/a3/0c1ba3fd1c91b7997f30cbd02b523985.jpg', alt: '' },
        { itemImageSrc: 'https://images.freeimages.com/images/premium/previews/4918/49188258-dance-style-background.jpg', alt: '' },
        { itemImageSrc: 'https://freedesignfile.com/upload/2012/08/00229887_medium221.jpg', alt: '' },
        { itemImageSrc: 'https://www.freecodecamp.org/news/content/images/2020/12/fcc-bg-image-2.png', alt: '' },
        { itemImageSrc: 'https://www.photocase.com/photos/1345554-beautiful-sunlight-on-a-natural-background-style-photocase-stock-photo-large.jpeg', alt: '' },
    ]
    items: any[] = []
    endSoonItems: any[] = []
    @nsStoreItem.Action
    actGetItemList!: (params: any) => Promise<any>
    async mounted() {
        await this.getHotItems();
        await this.getEndingSoonItems();
        await this.getItems();
        this.formatItemsTimeLeft()
    }
    async getHotItems() {
        const params = {
            pageSize: 6,
            pageNum: 1,
            search: '',
            category: '',
            orderBy: 'bid',
        }
        const response = await this.actGetItemList(params)
        console.log(response)
        if (!response || !response.records) {
            this.$toast.add({
                severity: 'error',
                summary: 'Lỗi',
                detail: "Không lấy được danh sách sản phẩm 1",
                life: 5000
            })
        }
        if (response.records.length > 0) {
            this.images = []
            response.records.forEach((item: any) => {
                this.images.push({
                    itemImageSrc: this.getImageUrl(item.id, item.thumbnailId),
                    alt: item.name,
                    url: '/p/item/' + item.id
                })
            });
        }
    }
    async getEndingSoonItems() {
        const params = {
            pageSize: 10,
            pageNum: 1,
            search: '',
            category: '',
            orderBy: 'end',
        }
        const response = await this.actGetItemList(params)
        console.log(response)
        if (!response || !response.records) {
            this.$toast.add({
                severity: 'error',
                summary: 'Lỗi',
                detail: "Không lấy được danh sách sản phẩm 2",
                life: 5000
            })
        }
        if (response.records.length > 0) {
            this.endSoonItems = []
            response.records.forEach((item: any) => {
                const curbid = (!item.highestBid || item.highestBid.amount == null || item.highestBid.amount == undefined) ? 0 : item.highestBid.amount
                this.endSoonItems.push({
                    id: item.id,
                    thumbnailUrl: this.getImageUrl(item.id, item.thumbnailId),
                    name: item.name,
                    endDate: '2023-12-20T20:00:00',//item.ongoingSession.endDate,
                    endDateStr: '',
                    url: '/p/item/' + item.id,
                    curBid: curbid
                })
            });
        }
    }
    async getItems() {
        const params = {
            pageSize: 8,
            pageNum: 1,
            search: '',
            category: '',
            orderBy: '',
        }
        const response = await this.actGetItemList(params)
        console.log(response)
        if (!response || !response.records) {
            this.$toast.add({
                severity: 'error',
                summary: 'Lỗi',
                detail: "Không lấy được danh sách sản phẩm 3",
                life: 5000
            })
        }
        if (response.records.length > 0) {
            this.items = []
            response.records.forEach((item: any) => {
                const curbid = (!item.highestBid || item.highestBid.amount == null || item.highestBid.amount == undefined) ? 0 : item.highestBid.amount
                this.items.push({
                    id: item.id,
                    thumbnailUrl: this.getImageUrl(item.id, item.thumbnailId),
                    name: item.name,
                    endDate: '2023-12-20T20:00:00',//item.ongoingSession.endDate,
                    endDateStr: '',
                    url: '/p/item/' + item.id,
                    curBid: curbid
                })
            });
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
    formatItemsTimeLeft() {
        const updateInterval = 1000;
        const updateTimer = () => {
            for (let i = 0; i < this.items.length; i++) {
                const targetTime: any = new Date(this.items[i].endDate);
                this.items[i].endDateStr = this.formatDistance(targetTime);
            }
            for (let i = 0; i < this.endSoonItems.length; i++) {
                const targetTime: any = new Date(this.endSoonItems[i].endDate);
                this.endSoonItems[i].endDateStr = this.formatDistance(targetTime);
            }
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
    viewAll() {
        this.$router.push('/item')
    }
}
export default homepage
</script>
  
<style lang='sass'>
.check
    color: $dark
.custom_navigator_button_1 
    .p-carousel-prev,.p-carousel-next
        background: $white !important
        color: $primary !important
    .p-carousel-prev
        margin-left: 0 !important
    .p-carousel-next
        margin-right: 0 !important
</style>