<template>
    <section class="surface-0 flex align-items-center justify-content-center p-2">
        <div class="box-page-container flex flex-column container w-full">
            <Breadcrumb :home="home" :model="items" />
            <div v-if="!isSeller" class="card-body my-3">
                <div class="grid">
                    <div class="col-6 field">
                        <Button @click="createNewItem()" label="Trở thành Người bán ngay ->" />
                    </div>
                </div>
            </div>
            <div v-if="isSeller" class="card-body my-3">
                <div class="grid">
                    <div class="col-12 field">
                        <Button @click="createNewItem()" label="+ Tạo mới" />
                    </div>
                </div>
                <TabView class="tabview-custom">
                    <TabPanel>
                        <template #header>
                            <i class="pi pi-calendar"></i>
                            <span>Chờ duyệt ({{ totalWaiting }})</span>
                        </template>
                        <div class="grid formgrid">
                            <div class="field col-12">
                                <h2 class="font-bold text-brown mb-0">Danh sách sản phẩm chờ duyệt</h2>
                            </div>
                            <div class="field col-12">
                                <BlockUI :blocked="blockedTable">
                                    <DataTable class="w-full airtag-datatable h-full flex flex-column" v-if="boxData"
                                        :value="boxData" responsiveLayout="scroll" dataKey="id" :resizableColumns="true"
                                        :rows="20" :scrollable="false" stripedRows>
                                        <Column field="id" header="STT">
                                            <template #body="slotProps"><span>{{ slotProps.index + 1 }}</span></template>
                                        </Column>
                                        <Column field="imgUrl" header="Ảnh bìa" sortable="sortable"
                                            bodyClass="font-semibold">
                                            <template #body="{ data }">
                                                <img :src="data.imgUrl" class="product-image" style="height:100px" />
                                            </template>
                                        </Column>
                                        <Column field="name" header="Tên sản phẩm" sortable="sortable"
                                            bodyClass="font-semibold"></Column>
                                        <Column field="category.name" header="thể loại" sortable="sortable"
                                            className="font-semibold"></Column>
                                        <Column field="created" header="NGÀY TẠO" sortable="sortable"
                                            className="p-text-right">
                                            <template #body="{ data }">{{
                                                data.created | dateTimeFomat
                                            }}</template>
                                        </Column>
                                        <Column field="status" header="TRẠNG THÁI" sortable="sortable"
                                            className="p-text-right">
                                            <template #body="{ data }">
                                                <div v-if="data.expertId == null">
                                                    <Tag class="px-2 surface-200 bg-100" severity="info"><span
                                                            class="font-bold text-800 font-size-small">Chưa tiếp nhận</span>
                                                    </Tag>
                                                </div>
                                                <div v-else>
                                                    <Tag class="px-2 " v-if="data.status == 2" severity="danger"
                                                        value="Bị từ chối">
                                                    </Tag>
                                                    <Tag class="px-2" v-else-if="data.status == 3" value="Đã Duyệt"
                                                        severity="Success">
                                                    </Tag>
                                                    <Tag class="px-2" v-else value="Đang xử lý" severity="warning">
                                                    </Tag>
                                                </div>
                                            </template>
                                        </Column>
                                        <Column :exportable="false" header="Hoạt động" className="p-text-right">
                                            <template #body="{ data }">
                                                <Button
                                                    class="border-0 p-0 h-2rem w-2rem justify-content-center surface-200"
                                                    @click="viewDetail(data.id)">
                                                    <div class="icon--small icon-eye"></div>
                                                </Button>
                                            </template>
                                        </Column>
                                        <template #footer="">
                                            <div>
                                                <div class="flex align-items-center">
                                                    <span class="ml-3 text-400 font-size-small">Hiển thị
                                                        {{ Math.min((pPagenum - 1) * pPageSize + 1, totalRecords) }}
                                                        - {{ Math.min(pPagenum * pPageSize, totalRecords) }} trên
                                                        {{ totalRecords }}</span>
                                                </div>
                                            </div>
                                            <div v-if="totalRecords > 0">
                                                <Paginator class="p-0" :rows="pPageSize" :totalRecords="totalRecords"
                                                    template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageInput"
                                                    @page="onPage($event)">
                                                </Paginator>
                                            </div>
                                        </template>
                                        <template #empty>
                                            <div class="justify-content-center flex font-italic">
                                                Không có dữ liệu
                                            </div>
                                        </template>
                                    </DataTable>
                                </BlockUI>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <template #header>
                            <i class="pi pi-user"></i>
                            <span>Đã từ chối</span>
                        </template>
                    </TabPanel>
                    <TabPanel>
                        <template #header>
                            <i class="pi pi-user"></i>
                            <span>Đã duyệt</span>
                        </template>

                    </TabPanel>
                </TabView>
            </div>
        </div>
    </section>
</template>
  
<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { User } from '~/models/User'
const nsStoreItem = namespace('seller/store-itemApplication')
const nsCategory = namespace('category/store-category')
const nsStoreUser = namespace('user-auth/store-user')

@Component({
    middleware: ['authenticate'],
    layout: 'public',
    // meta: {
    //   role: [3, 2]
    // }
})
class CreateItem extends Vue {
    boxData: any[] = []

    totalWaiting: number = 0

    //-----Pagination---------------------------------
    pPagenum: number = 1
    pPageSize: number = 5
    totalRecords: number = 0
    blockedTable: boolean = false

    //---------------------------------------
    home = { icon: 'pi pi-home', to: '/homepage' }
    items = [
        { label: 'Kênh bán' },
    ]
    isSeller: boolean = false
    //----------------------------------------
    oCategories: Array<any> | null = null

    @nsStoreUser.State('user')
    user!: User.Model | undefined
    @nsCategory.Action
    actGetAllCategory!: () => Promise<any>
    @nsStoreItem.Action
    actSearchItemApplication!: (params: any) => Promise<any>
    @nsStoreItem.Action
    actGetItemApplicationImage!: (params: any) => Promise<any>

    async mounted() {
        if (this.user?.role.id == 4) {
            this.$toast.add({
                severity: 'error', summary: 'Cảnh báo',
                detail: 'Bạn chưa nâng cấp lên tài khoản người bán. Vui lòng nâng cấp để thực hiện hành động', life: 10000
            })
            this.isSeller = false
            return
        }
        else {
            this.isSeller = true
            const response1 = await this.actGetAllCategory()
            this.oCategories = response1.records
            this.Search()
        }
    }
    async Search(pageNum: number = this.pPagenum) {
        const params = {
            pageNum: this.pPagenum || 1,
            pageSize: this.pPageSize || 5,
            search: '',
            status: '',
            category: '',
        }
        this.blockedTable = true
        let response = await this.actSearchItemApplication(params)
        if (response && response.records.length > 0) {
            for (let i = 0; i < response.records.length; i++) {
                if (response.records[i].thumbnailId == undefined || response.records[i].thumbnailId == null) {
                    response.records[i].imgUrl = ''
                    continue
                }
                response.records[i].imgUrl = await this.getImageUrl(response.records[i].id, response.records[i].thumbnailId)
            }
            console.log(this.boxData)
            this.totalRecords = response.totalRecords
            this.totalWaiting = response.totalRecords
        }
        console.log('hẻh')
        this.boxData = response.records
        this.blockedTable = false
    }
    async getImageUrl(itemId: any, imgId: any) {
        try {
            console.log(imgId, 'lll', itemId)
            const params = {
                itemId: itemId,
                imgId: imgId,
            }
            return process.env.BE_API_URL + '/api/item/' + itemId + '/images/' + imgId
            // const response = await this.actGetItemApplicationImage(params)
            // return new Promise((resolve) => {
            //     const reader = new FileReader();
            //     reader.readAsDataURL(response);
            //     reader.onloadend = () => {
            //         const base64Image = reader.result;
            //         resolve(base64Image);
            //     };
            // });
        } catch (error) {
            this.$store.commit('commons/store-error/setError', "Error fetching or converting image")
            console.error("Error fetching or converting image:", error);
            return null;
        }
    }
    viewDetail(id: any) {
        this.$router.push('/seller/detail?itemId=' + id)
    }
    onPage(event: any) {
        this.Search(event.page + 1)
    }
    createNewItem() {
        this.$router.push('/seller/uploadItem')
    }
}
export default CreateItem
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
  