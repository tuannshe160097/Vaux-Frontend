<template>
    <section class="surface-0 flex-column align-items-center justify-content-center p-0" style="font-size: 16px; max-width: 100vw !important;">
        <div class="box-page-container flex flex-column justify-content-center align-items-center container w-full" style="">
            <div class="flex justify-content-center align-items-center px-2" style="min-height:500px; max-height: 80vh;max-width: 1200px">
                <div class="pr-8">
                    <span class="text-brown font-bold" style="font-size: 20px;">Chào mừng đến với VAUX, với châm ngôn:</span>
                    <h1 class="mt-0 font-bold text-dark">Người xứng vật đáng</h1>
                    <p>
                        Chỉ với 10.000đ bạn đã có thể đấu giá sản phẩm bạn yêu thích.
                        Vaux là nền tảng công nghệ đầu tiên cho phép các bạn đấu giá các sản phẩm đồ cổ giữa người với người
                    </p>
                </div>
                <Galleria :value="images" :numVisible="5" style=" height: 500px; width: 50%" :showThumbnails="false"
                    :showIndicators="true" :showIndicatorsOnItem="true" :autoPlay="true" :circular="true">
                    <template #item="slotProps">
                        <div style=" height: 500px; width: 640px; background-position: center;
                                background-repeat: no-repeat; background-size: cover;"
                            :style="'background-image: url(' + slotProps.item.itemImageSrc + ')'">
                            <div class="flex align-items-center justify-content-center"
                                style=" width: 100%;height: 100%; background-color: #ffffff66;">
                                <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt"
                                    style="max-width: 100%; max-height: 100%; display: block;" />
                            </div>
                        </div>
                    </template>
                </Galleria>
            </div>
        </div>
        <div class="box-page-container flex justify-content-center  container w-full m-0 p-0 bg-primary" >
            <div class="flex justify-content-center px-2 w-full" style="max-width: 1200px">
                <h1>Các sản phẩm đang được đấu giá</h1>
            </div>
        </div>
    </section>
</template>
  
<script lang='ts'>
import { Component, namespace, Vue } from 'nuxt-property-decorator'

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
}
export default homepage
</script>
  
<style lang='sass' scoped>
</style>