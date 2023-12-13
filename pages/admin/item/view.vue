<template>
    <div class="box-page-container flex flex-column">
        <div class="header flex justify-content-between container">
            <div class="col-fixed">
                <h2 class="font-bold m-0 text-uppercase">Thông tin Sản phẩm</h2>
            </div>
            <div class="col-fixed">
                <div class="grid align-content-center">
                    <!-- <div class="col-fixed">
            <Button class="w-9rem h-3rem" type="button" label="Thêm Mới" @click="onAddNew()"></Button>
          </div> -->
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="col-fixed">
                <div class="grid formgrid">
                    <h4 class="text-brown font-bold col-12">1. Thông tin cơ bản</h4>
                    <div class="field col-12">
                        <label>Tên sản phẩm</label>
                        <InputText class="w-100" type="text" v-model="name" />
                    </div>
                    <div class="field md:col-4 col-12">
                        <label>Thể loại</label>
                        <Dropdown class="w-100" v-model="categoryId" :options="oCategories" optionLabel="name"
                            optionValue="id" placeholder="Chọn thể loại" :filter="true" filterPlaceholder="Tìm kiếm" />
                    </div>
                </div>
                <div class="grid formgrid">
                    <h4 class="col-12 font-bold text-brown">2. Hình ảnh</h4>
                    <div class="field col-4">
                        <div class="card-header font-medium text-xl">Ảnh bìa</div>
                        <div class="card-body p-5">
                            <div class="field">
                                <div
                                    class="w-100 text-center surface-overlay p-1 border-1 border-solid surface-border border-10 w-full">
                                    <ImagePreview :src="thumbnailUrl || require('~/assets/images/default.jpg')" alt="Image"
                                        imageClass="w-max-100" imageStyle="height:200px;object-fit: contain" />
                                    <input type="file" @change="onUploadThumbnail($event)" accept=".png, .jpg, .jpeg" />
                                </div>
                            </div>
                        </div>
                    </div>
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
                </div>
                <div class="grid formgrid">
                    <h4 class="col-12 font-bold text-brown">3. Mô tả sản phẩm</h4>
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
                    <h4 class="col-12 font-bold text-brown">5. Thuộc tính</h4>
                    <div class="field col-12 md:col-12">
                        <DataTable :value="properties" editMode="cell" @cell-edit-complete="onCellEditComplete"
                            class="editable-cells-table p-invalid border-bottom-1 border-300" responsiveLayout="scroll">
                            <Column field="index" header="STT">
                                <template #body="slotProps"><span>{{ slotProps.index + 1 }}</span></template>
                            </Column>
                            <Column field="label" header="Tên" :styles="{ width: '50%' }">
                                <template #editor="slotProps">
                                    <InputText :class="{ 'p-invalid': (!slotProps.data[slotProps.column.field]) }"
                                        class="w-full" v-model="slotProps.data[slotProps.column.field]" autofocus />
                                </template>
                            </Column>
                            <Column field="value" header="Giá trị" :styles="{ width: '50%' }">
                                <template #editor="slotProps">
                                    <InputText :class="{ 'p-invalid': (!slotProps.data[slotProps.column.field]) }"
                                        class="w-full" v-model="slotProps.data[slotProps.column.field]" autofocus />
                                </template>
                            </Column>
                            <Column header="">
                                <template #body="slotProps">
                                    <Button class="border-0 p-0 ml-1 h-2rem w-2rem justify-content-center "
                                        icon="pi pi-times" @click="onDeleteProperty(slotProps.index)">
                                    </Button>
                                </template>
                            </Column>
                        </DataTable>
                    </div>
                    <span class="col-12 field">
                        <Button icon="pi pi-plus" label="Thêm dòng" @click="onAddProperty()" />
                    </span>
                </div>
                <div class="grid formgrid">
                    <h4 class="col-12 font-bold text-brown">6. Phản hồi từ người kiểm duyệt</h4>
                    <span class="col-12">
                    </span>
                    <div class="field col-12">
                        <Textarea class="text-left w-full" :autoResize="true" v-model="reason" rows="5"
                            placeholder="Sử dụng phần này để thêm thông tin lý do." style="height: 3rem;" />
                    </div>
                </div>
                <div class="grid formgrid">
                    <div class="field col-12 flex justify-content-center">
                        <Button class="mx-2 btn-info border-10 p-3" label="Cập nhật" @click="onUpdate()" />
                    </div>
                </div>
            </div>
            <ConfirmDialog></ConfirmDialog>
        </div>
    </div>
</template>
    
<script lang="ts" >
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { User } from '~/models/User'
import { confirm } from '~/utils/commons/helper'
const nsAdmItem = namespace('item/store-mod-item')
const nsCategory = namespace('category/store-category')
const nsUser = namespace('user-auth/store-user')

@Component({
    middleware: ['authenticate'],
    layout: 'admin'
})
class DetailItem extends Vue {
    // -- [ Statement Properties ] ------------------------------------------------

    // @nsUser.State('user')
    // user!: User.Model | null

    // -- [ Properties ] ----------------------------------------------------------
    itemId: string | null = ''
    name: string = ''
    categoryId: number = 0
    files: File[] = []
    images: any[] = []
    description: string = ''
    reservePrice: string = ''
    reason: string = ''
    thumbnailUrl: any = ''
    expertId: number | undefined | null = null
    status: number | null = null

    fileThumbnail: any = null

    thumbnailId: number | null = null

    properties: any[] = []

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
    @nsAdmItem.Action
    actGetItem!: (params: any) => Promise<any>
    @nsAdmItem.Action
    actGetItemApplicationImage!: (params: any) => Promise<any>
    @nsAdmItem.Action
    actUpdateItemApplication!: (params: any) => Promise<any>
    @nsAdmItem.Action
    actDeleteItemApplicationImage!: (params: any) => Promise<any>
    @nsAdmItem.Action
    actAddItemApplicationImage!: (params: any) => Promise<any>
    @nsAdmItem.Action
    actAddItemApplicationThumbnail!: (params: any) => Promise<any>

    created() {
        this.itemId = Array.isArray(this.$route.query.itemId)
            ? this.$route.query.itemId[0]
            : this.$route.query.itemId
    }
    async mounted() {
        const response = await this.actGetAllCategory()
        this.oCategories = response.records
        this.fetchData()
    }
    async fetchData() {
        if (this.itemId) {
            const params = {
                itemId: this.itemId || '',
            }
            const result = await this.actGetItem(params)
            this.name = result.name
            this.categoryId = result.categoryId
            this.description = result.description
            this.reservePrice = result.reservePrice
            this.properties = result.itemProperties
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
            return process.env.BE_API_URL + '/api/item/' + itemId + '/images/' + imgId
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
                if (file.size / 1024 / 1024 > 20) {
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
            }
        }
    }
    onUploadThumbnail(event: Event) {
        const inputElement = event.target as HTMLInputElement
        const files = inputElement.files
        if (files && files.length > 0) {
            if (files[0].size / 1024 / 1024 > 20) {
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
    }
    async onUpdate() {
        this.blockedAddButton = true
        this.$toast.add({ severity: 'warn', summary: 'Thông báo', detail: 'Đang cập nhật. Vui lòng đợi trong giây lát', life: 3000 })

        let newFileList: File[] = []
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
            itemProperties: this.properties,
        }
        await this.actUpdateItemApplication(params)
        if (this.deleteImgOnSv.length > 0) {
            console.log('deleteImgOnSv ', this.deleteImgOnSv)
            await this.actDeleteItemApplicationImage({ itemId: this.itemId, images: this.deleteImgOnSv })
        }
        if (this.deleteThumbnailOnSv) {
            console.log('deleteThumbnailOnSv ', this.deleteThumbnailOnSv)
            await this.AddImage(this.itemId, this.fileThumbnail)
        }
        if (newFileList.length > 0) {
            console.log('newFileList ', newFileList)
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
    onCellEditComplete(event: any) {
        let { data, newValue, field } = event;
        switch (field) {
            default:
                if (newValue != null && newValue.trim().length > 0)
                    data[field] = newValue;
                else {
                    event.preventDefault()
                }
                break;
        }
    }
    onAddProperty() {
        this.properties.push({ label: null, value: null })
    }
    onDeleteProperty(index: any) {
        this.properties.splice(index, 1)
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
.rounded-circle
    border-radius: 50% !important
</style>
            