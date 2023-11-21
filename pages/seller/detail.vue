<template>
    <section class="surface-0 flex align-items-center justify-content-center min-h-screen  p-2">
        <div class="box-page-container flex flex-column container">
            <Breadcrumb :home="home" :model="items" />
            <div class="card-body my-3">
                <div class="grid formgrid">
                    <div class="field col-12">
                        <h2 class="font-bold text-brown">Tạo sản phẩm mới</h2>
                    </div>
                    <div class="field col-12">
                        Hãy cho chúng tôi biết mọi thứ về sản phẩm của bạn bằng cách điền
                        thông tin chi tiết bên dưới. Nếu bạn không chắc chắn về điều gì đó,
                        đừng lo lắng! Một chuyên gia sẽ xem xét bài đăng của bạn.
                    </div>
                </div>
                <div class="grid formgrid">
                    <h4 class="text-brown font-bold col-12">1. Thông tin cơ bản</h4>
                    <div class="field col-12">
                        <!-- <h4 class="font-bold">Tên sản phẩm</h4> -->

                        <label>Tên sản phẩm</label>
                        <InputText class="w-100" type="text" v-model="name" />
                        <!-- <input
                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
                type="text" v-model="name" placeholder="Nhập tên sản phẩm" /> -->
                    </div>
                    <div class="field md:col-4 col-12">
                        <label>Thể loại</label>
                        <Dropdown class="w-100" v-model="categoryId" :options="oCategories" optionLabel="name"
                            optionValue="id" placeholder="Chọn thể loại" :filter="true" filterPlaceholder="Tìm kiếm" />
                    </div>
                </div>
                <div class="grid formgrid">
                    <h4 class="col-12 font-bold text-brown">2. Hình ảnh</h4>
                    <span class="col-12">
                        Tải lên những bức ảnh thể hiện rất nhiều điều của bạn theo cách tốt
                        nhất. Hãy nhớ đưa vào những nội dung khác nhau và đặt bức ảnh đẹp nhất
                        của bạn lên hàng đầu.
                    </span>
                    <div class="field col-8  text-center">
                        <input type="file" @change="onUploadFile($event)" accept=".png, .jpg, .jpeg" multiple />
                        <div class="grid formgrid">
                            <div v-for="(image, index) in images" :key="index" class="image-item col-3">
                                <div id="image-container"
                                    class="flex flex-column w-full  border-1 border-solid surface-border field">
                                    <div class="image-container w-full bg-center bg-cover"
                                        :style="{ backgroundImage: 'url(' + image.objectURL + ')' }"
                                        style="padding-bottom: 100%;">
                                    </div>
                                    <div class="product-list-action p-2 w-100 text-center">
                                        <Button class="btn" @click="removeImage(index)" label="Xóa" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field col-4">
                        <div class="card-header font-medium text-xl">Ảnh bìa</div>
                        <div class="card-body p-5">
                            <div class="field">
                                <div
                                    class="w-100 text-center surface-overlay p-1 border-1 border-solid surface-border border-10 w-full">
                                    <ImagePreview :src="thumbnailUrl || require('~/assets/images/default.jpg')" alt="Image"
                                        imageClass="w-max-100" imageStyle="height:200px;object-fit: contain" />
                                    <div class="small font-italic text-muted mb-2">
                                        JPG or PNG no larger than 1 MB
                                    </div>
                                    <input type="file" @change="onUploadThumbnail($event)" accept=".png, .jpg, .jpeg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid formgrid">
                    <h4 class="col-12 font-bold text-brown">3. Mô tả sản phẩm</h4>
                    <span class="col-12">
                        Thêm mô tả chi tiết về sản phẩm của bạn. Cung cấp nhiều thông tin hơn
                        sẽ giúp khách hàng của bạn tin tưởng sản phẩm hơn
                    </span>
                    <div class="field col-12">
                        <Textarea class="text-left w-full" :autoResize="true" v-model="description" rows="5"
                            placeholder="Sử dụng phần này để thêm thông tin mô tả." style="height: 3rem;" />
                    </div>
                </div>
                <div class="grid formgrid">
                    <h4 class="col-12 font-bold text-brown">4. Giá sàn</h4>
                    <span class="col-12">
                    </span>
                    <div class="field col-12 md:col-4">
                        <InputNumber class="text-right w-full" suffix=" vnđ" v-model="reservePrice" />
                    </div>
                </div>
                <div class="grid formgrid">
                    <div class="col-12">

                    </div>
                </div>
                <div class="grid formgrid">
                    <div v-if="isDisplayButton()" class="field col-12 flex justify-content-center">
                        <Button class="mx-2 btn-primary border-10" :disabled="blockedAddButton ? 'disabled' : false"
                            label="Cập nhật" @click="onUpdate()" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
  
<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
const nsStoreItem = namespace('item/store-seller-item')
const nsCategory = namespace('category/store-category')

@Component({
    middleware: ['authenticate'],
    layout: 'public',
    // meta: {
    //   role: [3, 2]
    // }
})
class DetailItem extends Vue {
    itemId: any | null
    name: string = ''
    categoryId: number = 0
    description: string = ''
    reservePrice: string = ''
    status: any

    fileThumbnail: any = null
    thumbnailUrl: any = ''

    thumbnailId: number | null = null
    files: any[] = []
    images: any[] = []

    deleteThumbnailOnSv: boolean = false
    deleteImgOnSv: number[] = []
    blockedAddButton: boolean = false
    //---------------------------------------
    home = { icon: 'pi pi-home', to: '/homepage' }
    items = [
        { label: 'Kênh bán', to: '/Seller' },
        { label: 'Tạo sản phẩm' }
    ]
    //----------------------------------------
    oCategories: Array<any> | null = null

    @nsCategory.Action
    actGetAllCategory!: () => Promise<any>
    @nsStoreItem.Action
    actGetItemApplication!: (params: any) => Promise<any>
    @nsStoreItem.Action
    actGetItemApplicationImage!: (params: any) => Promise<any>
    @nsStoreItem.Action
    actUpdateItemApplication!: (params: any) => Promise<any>
    @nsStoreItem.Action
    actDeleteItemApplicationImage!: (params: any) => Promise<any>
    @nsStoreItem.Action
    actAddItemApplicationImage!: (params: any) => Promise<any>
    @nsStoreItem.Action
    actAddItemApplicationThumbnail!: (params: any) => Promise<any>

    async mounted() {
        const response = await this.actGetAllCategory()
        this.oCategories = response.records
        this.fetchData()
    }
    async fetchData() {
        this.itemId = Array.isArray(this.$route.query.itemId)
            ? this.$route.query.itemId[0]
            : this.$route.query.itemId
        if (this.itemId) {
            const params = {
                itemId: this.itemId || '',
            }
            const result = await this.actGetItemApplication(params)
            console.log(result)
            this.name = result.name
            this.categoryId = result.categoryId
            this.description = result.description
            this.reservePrice = result.reservePrice
            // this.expertId = result.expertId
            this.status = result.status
            // this.displayAction() 
            this.thumbnailId = result.thumbnailId
            this.thumbnailUrl = await this.getImageUrl(result.id, result.thumbnailId, true)
            for (const imgId of result.images) {
                const result2 = await this.getImageUrl(this.itemId, imgId)
                const imageInfo = { objectURL: result2, name: "result2.name", imgId: imgId };
                this.images.push(imageInfo);
            }
            //console.log(this.images.length + " ??? " + this.files.length)
        }
        else {
            this.$store.commit('commons/store-error/setError', "Không tìm thấy thông tin Item Id")
        }
    }
    async getImageUrl(itemId: any, imgId: any, isThumbnail: boolean = false) {
        try {
            if (itemId == null || imgId == null) return
            const params = {
                itemId: itemId,
                imgId: imgId,
            }
            //const response = await this.actGetItemApplicationImage(params)
            //custom
            if (!isThumbnail) {
                //this.files.push(process.env.BE_API_URL + '/api/item/' + itemId + '/images/' + imgId)
            }
            //

            return process.env.BE_API_URL + '/api/item/' + itemId + '/images/' + imgId
            // return new Promise((resolve) => {
            //     const reader = new FileReader();
            //     reader.readAsDataURL(response);
            //     reader.onloadend = () => {
            //         const base64Image = reader.result;
            //         resolve(base64Image);
            //     };
            // });
        } catch (error) {
            this.$store.commit('commons/store-error/setError', "Có lỗi khi đọc dữ liệu ảnh: " + imgId)
            console.error("Có lỗi khi đọc dữ liệu ảnh: " + imgId, error);
            return null;
        }
    }
    onUploadFile(event: any) {
        const files: FileList = event.target.files;
        const fileList = Array.from(files);
        if (files != null) {
            for (const file of fileList) {
                console.log(file)
                if (file.size / 1024 / 1024 > 3) {
                    this.$store.commit(
                        'commons/store-error/setError',
                        'File tải lên quá lớn'
                    )
                    return
                }
                if (!['image/jpeg', 'image/jpg', 'image/png'].includes(files[0].type)) {
                    this.$store.commit(
                        'commons/store-error/setError',
                        'File tải lên không đúng định dạng (jpeg, jpg, png)'
                    )
                    return
                }
                const objectURL = URL.createObjectURL(file);
                const imageInfo = { objectURL, name: file.name, size: file.size, imgId: null, fileContent: file };
                this.images.push(imageInfo);
                //this.files.push(file);
            }
        }
        //console.log(this.images.length + " ??? " + this.files.length)
    }
    onUploadThumbnail(event: Event) {
        const inputElement = event.target as HTMLInputElement
        const files = inputElement.files
        if (files && files.length > 0) {
            if (files[0].size / 1024 / 1024 > 1) {
                this.$store.commit(
                    'commons/store-error/setError',
                    'File tải lên quá lớn'
                )
                return
            }
            if (!['image/jpeg', 'image/jpg', 'image/png'].includes(files[0].type)) {
                this.$store.commit(
                    'commons/store-error/setError',
                    'File tải lên không đúng định dạng (jpeg, jpg, png)'
                )
                return
            }
            this.fileThumbnail = files[0]
            this.thumbnailUrl = URL.createObjectURL(this.fileThumbnail)
        }
        this.deleteThumbnailOnSv = true
        if (this.thumbnailId != null) {
            this.deleteImgOnSv.push(this.thumbnailId)
        }
    }
    removeImage(index: number) {
        if (!(index >= this.images.length) && this.images[index].imgId != null) {
            this.deleteImgOnSv.push(this.images[index].imgId)
        }
        console.log(this.deleteImgOnSv)
        this.$delete(this.images, index);
        //this.$delete(this.files, index);
        //console.log(this.images.length + " ??? " + this.files.length)
    }
    async onUpdate() {
        this.blockedAddButton = true
        this.$toast.add({ severity: 'warn', summary: 'Thông báo', detail: 'Đang cập nhật. Vui lòng đợi trong giây lát', life: 3000 })

        let newFileList: File[] = []
        // if (this.images.length != this.files.length) {
        //     this.$toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi điều kiện', life: 10000 })
        //     return
        // }
        for (let i = 0; i < this.images.length; i++) {
            if (this.images[i].imgId == null) {
                this.images[i].imgId = 0
                newFileList.push(this.images[i].fileContent)
            }
        }
        const params = {
            itemId: this.itemId,
            name: this.name,
            categoryId: this.categoryId,
            reservePrice: this.reservePrice,
            description: this.description,
        }
        await this.actUpdateItemApplication(params)
        if (this.deleteImgOnSv.length > 0) {
            console.log(this.deleteImgOnSv)
            await this.actDeleteItemApplicationImage({ itemId: this.itemId, images: this.deleteImgOnSv })
        }
        if (this.deleteThumbnailOnSv) {
            await this.AddImage(this.itemId, this.fileThumbnail)
        }
        if (newFileList.length > 0) {
            await this.AddMultiImage(this.itemId, newFileList)
        }
        this.$toast.add({ severity: 'success', summary: 'Thành công', detail: 'Đã cập nhật sản phẩm', life: 10000 })
        this.blockedAddButton = false
    }
    async AddMultiImage(itemId: any, fileList: any) {
        const formData = new FormData();
        for (const file of fileList) {
            formData.append('images', file, file.name)
        }
        const param = {
            formData: formData,
            itemId: itemId,
        }
        return this.actAddItemApplicationImage(param)
    }
    async AddImage(itemId: any, file: any) {
        const formData = new FormData();
        formData.append('image', file, file.name)
        const param = {
            formData: formData,
            itemId: itemId,
        }
        return this.actAddItemApplicationThumbnail(param)
    }
    isDisplayButton() {
        return !(this.status > 1)
    }
}
export default DetailItem
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
  