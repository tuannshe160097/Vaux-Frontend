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
                        <InputText class="w-100" type="text" v-model="name" disabled />
                    </div>
                    <div class="field md:col-4 col-12">
                        <label>Thể loại</label>
                        <Dropdown class="w-100" v-model="categoryId" :options="oCategories" optionLabel="name"
                            optionValue="id" placeholder="Chọn thể loại" :filter="true" filterPlaceholder="Tìm kiếm"
                            disabled />
                    </div>
                </div>
                <div class="grid formgrid">
                    <h4 class="col-12 font-bold text-brown">2. Hình ảnh</h4>
                    <div class="field col-8  text-center">
                        <FileUpload name="demo[]" :customUpload="true" @uploader="" :multiple="true"
                            accept="image/*" :maxFileSize="5242880" :fileLimit="20" showUploadButton="false"
                            showCancelButton="false" :auto="true"
                            invalidFileSizeMessage="File ảnh được chấp nhận không quá 5mb"
                            invalidFileTypeMessage="Chỉ chấp nhận ảnh có đuôi là jpg hoặc png">
                            <template #empty>
                                <p>Danh sách ảnh đã tải lên</p>
                            </template>
                        </FileUpload>

                    </div>
                    <div class="field col-4">
                        <div class="card-header font-medium text-xl">Lưu ý</div>
                        <div class="card-body p-5">
                            <div class="field">
                                <label>*Tối thiểu 5 ảnh</label>
                                <label>*Người bán thành công tải lên ít nhất 8 ảnh </label>
                                <label>*Sử dụng ánh sáng hợp lý</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid formgrid">
                    <h4 class="col-12 font-bold text-brown">3. Mô tả sản phẩm</h4>
                    <div class="field col-12">
                        <Textarea class="text-left w-full" :autoResize="true" v-model="description" rows="5"
                            placeholder="Sử dụng phần này để thêm thông tin mô tả." style="height: 3rem;" disabled />
                    </div>
                </div>
                <div class="grid formgrid">
                    <h4 class="col-12 font-bold text-brown">4. Giá sàn</h4>
                    <span class="col-12">
                    </span>
                    <div class="field col-12 md:col-4">
                        <InputNumber class="text-right w-full" suffix=" vnđ" v-model="reversePrice" disabled />
                    </div>
                </div>
                <div class="grid formgrid">
                    <div class="field col-12 flex justify-content-center">
                        <Button class="mx-2 btn-success" label="Assign" @click="onAssign()" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script lang="ts" >
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { GENDER_OPTION } from '~/utils'
const nsExpItem = namespace('expert/store-itemApplication')
const nsCategory = namespace('category/store-category')

@Component({
    middleware: ['authenticate'],
    layout: 'admin',
})
class ViewUser extends Vue {
    itemId: string | null = ''
    name: string = ''
    categoryId: number = 0
    files: FileList | null = null
    description: string = ''
    reversePrice: string = ''

    dateCreated: string = ''
    dateUpdated: string = ''
    dateDeleted: string = ''

    //option data
    oCategories: Array<any> | null = null

    @nsCategory.Action
    actGetAllCategory!: () => Promise<any>
    @nsExpItem.Action
    actGetItemApplication!: (params: any) => Promise<any>
    @nsExpItem.Action
    UPDATE_ITEMAPPLICATION!: (imageId: any) => Promise<any>
    @nsExpItem.Action
    GET_ITEMAPPLICATION_IMAGE!: (params: any) => Promise<any>
    @nsExpItem.Action
    ACCEPT_ITEMAPPLICATION!: (params: any) => Promise<any>
    @nsExpItem.Action
    REJECT_ITEMAPPLICATION!: (params: any) => Promise<any>



    images: any = null
    activeIndex: number = 0
    displayCustom: boolean = false





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
            this.reversePrice = result.reversePrice
            // this.name = result.name
        }
        else {
            this.$store.commit('commons/store-error/setError', "Không tìm thấy thông tin application Id")
        }
    }
    formatDate(dateString: string) {
        const date = new Date(dateString)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0') // Tháng trong JavaScript bắt đầu từ 0
        const year = date.getFullYear()
        return `${day}-${month}-${year}`
    }

    imageClick(index:number) {
        this.activeIndex = index;
        this.displayCustom = true;
    }
    async onAssign() {
    }
    async onAccept() {
    }
    async onDeny() {
    }
}
export default ViewUser
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
            