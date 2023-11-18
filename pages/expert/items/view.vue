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
                    <div class="field col-4">
                        <div class="card-header font-medium text-xl">Ảnh bìa</div>
                        <div class="field">
                            <div class="text-center border-1 border-solid surface-border w-full"
                                >
                                <ImagePreview :src="thumbnailUrl || require('~/assets/images/default.jpg')" alt="Image"
                                    imageClass="w-max-100" imageStyle="object-fit: contain" />
                            </div>
                        </div>
                    </div>
                    <div class="field col-8  text-center">
                        <div class="grid formgrid">
                            <div v-for="(image, index) in images" :key="index" class="image-item col-3 mb-3">
                                <div id="image-container" class="flex flex-column w-full">
                                    <div class="image-container w-full bg-center bg-cover"
                                        :style="{ backgroundImage: 'url(' + image.objectURL + ')' }"
                                        style="padding-bottom: 100%;">
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
                            placeholder="Sử dụng phần này để thêm thông tin mô tả." style="height: 3rem;" disabled />
                    </div>
                </div>
                <div class="grid formgrid">
                    <h4 class="col-12 font-bold text-brown">4. Giá sàn</h4>
                    <span class="col-12">
                    </span>
                    <div class="field col-12 md:col-4">
                        <InputNumber class="text-right w-full" suffix=" vnđ" v-model="reservePrice" disabled />
                    </div>
                </div>
                <div class="grid formgrid">
                    <h4 class="col-12 font-bold text-brown">6. Phản hồi từ người kiểm duyệt</h4>
                    <span class="col-12">
                    </span>
                    <div class="field col-12">
                        <Textarea class="text-left w-full" :autoResize="true" v-model="reason" rows="5"
                            placeholder="Sử dụng phần này để thêm thông tin lý do." style="height: 3rem;"  />
                    </div>
                </div>
                <div class="grid formgrid">
                    <div class="field col-12 flex justify-content-center">
                        <div v-if="showAssign">
                            <Button class="mx-2 btn-success border-10 p-3" label="Assign" @click="onAssign()" />
                        </div>
                        <div v-if="showUnassign">
                            <Button class="mx-2 btn-warning border-10 p-3" label="Unassign" @click="onUnassign()" />
                        </div>
                        <div v-if="showDeny">
                            <Button class="mx-2 btn-danger border-10 p-3" label="Deny" @click="onDeny()" />
                        </div>
                        <div v-if="showAccept">
                            <Button class="mx-2 btn-success border-10 p-3" label="Accept" @click="onAccept()" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script lang="ts" >
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { GENDER_OPTION } from '~/utils'
import { User } from '~/models/User'
const nsExpItem = namespace('expert/store-itemApplication')
const nsCategory = namespace('category/store-category')
const nsUser = namespace('user-auth/store-user')

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
    reservePrice: string = ''
    reason: string = ''
    thumbnailUrl: any = ''
    images: any[] = []
    expertId: number | null = null
    status: number | null = null

    dateCreated: string = ''
    dateUpdated: string = ''
    dateDeleted: string = ''

    showAssign: boolean = false
    showUnassign: boolean = false
    showDeny: boolean = false
    showAccept: boolean = false

    //option data
    oCategories: Array<any> | null = null

    @nsUser.State('user')
    user!: User.Model | undefined

    @nsCategory.Action
    actGetAllCategory!: () => Promise<any>
    @nsExpItem.Action
    actGetItemApplication!: (params: any) => Promise<any>
    @nsExpItem.Action
    actGetItemApplicationImage!: (params: any) => Promise<any>
    @nsExpItem.Action
    actAssignItemApplication!: (params: any) => Promise<any>
    @nsExpItem.Action
    actUnassignItemApplication!: (params: any) => Promise<any>
    @nsExpItem.Action
    actAcceptItemApplication!: (params: any) => Promise<any>
    @nsExpItem.Action
    actRejectItemApplication!: (params: any) => Promise<any>

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
            this.expertId = result.expertId
            this.status = result.status
            this.displayAction()
            this.thumbnailUrl = await this.getImageUrl(result.id, result.thumbnailId)
            for (const imgId of result.images) {
                const result2 = await this.getImageUrl(this.itemId, imgId)
                const imageInfo = { objectURL: result2, name: "result2.name" };
                this.images.push(imageInfo);
            }
        }
        else {
            this.$store.commit('commons/store-error/setError', "Không tìm thấy thông tin Item Id")
        }
    }
    async getImageUrl(itemId: any, imgId: any) {
        try {
            const params = {
                itemId: itemId,
                imgId: imgId,
            }
            const response = await this.actGetItemApplicationImage(params)
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(response);
                reader.onloadend = () => {
                    const base64Image = reader.result;
                    resolve(base64Image);
                };
            });
        } catch (error) {
            this.$store.commit('commons/store-error/setError', "Error fetching or converting image")
            console.error("Error fetching or converting image:", error);
            return null;
        }
    }
    formatDate(dateString: string) {
        const date = new Date(dateString)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0') // Tháng trong JavaScript bắt đầu từ 0
        const year = date.getFullYear()
        return `${day}-${month}-${year}`
    }

    async onAssign() {
        const params = {
            itemId: this.itemId || '',
        }
        const result2 = await this.actAssignItemApplication(params)
        if (result2) {
            this.$toast.add({ severity: 'info', summary: 'Success', detail: 'Đã tiếp nhận xử lý sản phẩm', life: 10000 })
            this.displayAction()
        }
    }
    async onUnassign() {
        const params = {
            itemId: this.itemId || '',
        }
        const result2 = await this.actUnassignItemApplication(params)
        if (result2) {
            this.$toast.add({ severity: 'info', summary: 'Success', detail: 'Đã hủy nhận xử lý sản phẩm', life: 10000 })
            this.displayAction()
        }
    }
    async onAccept() {
        const params = {
            itemId: this.itemId,
            reason: this.reason || '',
        }
        const result = await this.actAcceptItemApplication(params)
        if (result) {
            this.$toast.add({ severity: 'info', summary: 'Success', detail: 'Đã đồng ý sản phẩm', life: 10000 })
            this.displayAction()
        }
    }
    async onDeny() {
        const params = {
            itemId: this.itemId,
            reason: this.reason || '',
        }
        const result = await this.actRejectItemApplication(params)
        if (result) {
            this.$toast.add({ severity: 'info', summary: 'Success', detail: 'Đã từ chối sản phẩm', life: 10000 })
            this.displayAction()
        }
    }
    displayAction() {
        this.showAssign = false
        this.showUnassign = false
        this.showAccept = false
        this.showDeny = false
        if (this.status != 1) {
            console.log('here: ')
        }
        else if (this.expertId == null) {
            this.showAssign = true
        }
        else if (this.expertId == this.user?.id) {
            this.showUnassign = true
            this.showAccept = true
            this.showDeny = true
        }
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
            