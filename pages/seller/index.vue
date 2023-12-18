<template>
    <section class="surface-0 flex align-items-center justify-content-center p-2">
        <div class="box-page-container flex flex-column container w-full">
            <Breadcrumb :home="home" :model="items" />
            <div v-if="!isSeller" class="card-body my-3">
                <div v-if="!appId" class="grid">
                    <div class="col-12 field flex justify-content-center">
                        <Button @click="$router.push('/account/requestSeller')" label="Trở thành Người bán ngay ->" />
                    </div>
                </div>
                <div v-if="appId" class="grid">
                    <div class="col-12 field flex justify-content-center">
                        Quản lý đang xem xét hồ sơ của bạn.
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
                            <span>Tất cả sản phẩm </span>
                        </template>
                        <div class="grid formgrid">
                            <div class="field col-12">
                                <h2 class="font-bold text-brown mb-0">Danh sách sản phẩm</h2>
                            </div>
                            <div class="field col-12">
                                <div class="grid">
                                    <div class="col-3">
                                        <label> Tên sản phẩm </label>
                                        <InputText v-model="name" type="text" class="w-full form-control"
                                            placeholder="Tên sản phẩm" />
                                    </div>
                                    <div class="col-3">
                                        <label> Thể loại </label>
                                        <Dropdown class="w-100 line-height-1" v-model="categoryId" :options="oCategories"
                                            optionLabel="name" optionValue="id" placeholder="Chọn thể loại" :filter="true"
                                            filterPlaceholder="Tìm kiếm" />
                                    </div>
                                    <div class="col-3">
                                        <label> Tình trạng </label>
                                        <Dropdown class="w-100 line-height-1" v-model="statusId" :options="oStatuss"
                                            optionLabel="name" optionValue="id" placeholder="Chọn thể loại" :filter="true"
                                            filterPlaceholder="Tìm kiếm" />
                                    </div>
                                    <div class="col-fixed">
                                        <Button class="w-full border-10 btn-primary" @click="Search()"
                                            style="margin-top: 20px;">Tìm
                                            kiếm</Button>
                                    </div>
                                </div>
                            </div>
                            <div class="field col-12">
                                <BlockUI :blocked="blockedTable">
                                    <DataTable class="w-full airtag-datatable h-full flex flex-column" v-if="boxData"
                                        :value="boxData" responsiveLayout="scroll" dataKey="id" :resizableColumns="true"
                                        :rows="20" :scrollable="false" stripedRows>
                                        <Column field="id" header="STT">
                                            <template #body="slotProps"><span>{{ slotProps.index + 1 }}</span></template>
                                        </Column>
                                        <Column field="imgUrl" header="Ảnh bìa" bodyClass="font-semibold">
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
                                                    <Tag class="px-2 " v-if="data.status == 1" severity="warning"
                                                        value="Đang xử lý">
                                                    </Tag>
                                                    <Tag class="px-2 " v-else-if="data.status == 2" severity="danger"
                                                        value="Bị từ chối">
                                                    </Tag>
                                                    <Tag class="px-2" v-else-if="data.status == 3" value="Đã Duyệt"
                                                        severity="warning">
                                                    </Tag>
                                                    <Tag class="px-2" v-else-if="data.status == 4" value="Đang được đấu giá"
                                                        severity="warning">
                                                    </Tag>
                                                    <Tag class="px-2" v-else-if="data.status == 6"
                                                        value="Đấu giá không thành công" severity="danger">
                                                    </Tag>
                                                    <Tag class="px-2" v-else-if="data.status == 7" value="Chờ thanh toán"
                                                        severity="warning">
                                                    </Tag>
                                                    <Tag class="px-2" v-else-if="data.status == 8" value="Chờ lấy hàng"
                                                        severity="info">
                                                    </Tag>
                                                    <Tag class="px-2" v-else-if="data.status == 9" value="Hoàn thành"
                                                        severity="success">
                                                    </Tag>
                                                    <Tag class="px-2" v-else :value="data.status" severity="warning">
                                                    </Tag>
                                                </div>
                                            </template>
                                        </Column>
                                        <Column :exportable="false" header="Hoạt động" className="p-text-right">
                                            <template #body="{ data }">
                                                <Button
                                                    class="border-0 p-0 h-2rem w-2rem justify-content-center surface-200"
                                                    @click="viewDetail(data.id)">
                                                    <div class="icon--small icon-file"></div>
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
                            <span>Chờ lấy hàng</span>
                        </template>
                        <div class="grid formgrid">
                            <div class="field col-12">
                                <h2 class="font-bold text-brown mb-0">Danh sách sản phẩm đấu giá thành công</h2>
                            </div>
                            <div class="field col-12">
                                <BlockUI :blocked="blockedTable">
                                    <DataTable class="w-full airtag-datatable h-full flex flex-column" v-if="soldBoxData"
                                        :value="soldBoxData" responsiveLayout="scroll" dataKey="id" :resizableColumns="true"
                                        :rows="20" :scrollable="false" stripedRows>
                                        <Column field="id" header="STT">
                                            <template #body="slotProps"><span>{{ slotProps.index + 1 }}</span></template>
                                        </Column>
                                        <Column field="imgUrl" header="Ảnh bìa" bodyClass="font-semibold">
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
                                                    <Tag class="px-2 " v-if="data.status == 1" severity="warning"
                                                        value="Đang xử lý">
                                                    </Tag>
                                                    <Tag class="px-2 " v-if="data.status == 2" severity="danger"
                                                        value="Bị từ chối">
                                                    </Tag>
                                                    <Tag class="px-2" v-else-if="data.status == 3" value="Đã Duyệt"
                                                        severity="warning">
                                                    </Tag>
                                                    <Tag class="px-2" v-else-if="data.status == 4" value="Đang được đấu giá"
                                                        severity="warning">
                                                    </Tag>
                                                    <Tag class="px-2" v-else-if="data.status == 6"
                                                        value="Đấu giá không thành công" severity="warning">
                                                    </Tag>
                                                    <Tag class="px-2" v-else-if="data.status == 7" value="Chờ thanh toán"
                                                        severity="warning">
                                                    </Tag>
                                                    <Tag class="px-2" v-else-if="data.status == 8" value="Chờ lấy hàng"
                                                        severity="info">
                                                    </Tag>
                                                    <Tag class="px-2" v-else-if="data.status == 9" value="Hoàn thành"
                                                        severity="success">
                                                    </Tag>
                                                    <Tag class="px-2" v-else :value="data.status" severity="warning">
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
                                            <div v-if="totalRecords > 0">
                                                <Paginator class="p-0" :rows="pPageSize" :totalRecords="totalRecords"
                                                    template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageInput"
                                                    @page="onPageSold($event)">
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
                            <span>Hoàn thành</span>
                        </template>
                        <div class="grid formgrid">
                            <div class="field col-12">
                                <h2 class="font-bold text-brown mb-0">Danh sách sản phẩm đã bán thành công</h2>
                            </div>
                            <div class="field col-12">
                                <BlockUI :blocked="blockedTable">
                                    <DataTable class="w-full airtag-datatable h-full flex flex-column" v-if="finishBoxData"
                                        :value="finishBoxData" responsiveLayout="scroll" dataKey="id"
                                        :resizableColumns="true" :rows="20" :scrollable="false" stripedRows>
                                        <Column field="id" header="STT">
                                            <template #body="slotProps"><span>{{ slotProps.index + 1 }}</span></template>
                                        </Column>
                                        <Column field="imgUrl" header="Ảnh bìa" bodyClass="font-semibold">
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
                                                    <Tag class="px-2 " v-if="data.status == 1" severity="warning"
                                                        value="Đang xử lý">
                                                    </Tag>
                                                    <Tag class="px-2 " v-if="data.status == 2" severity="danger"
                                                        value="Bị từ chối">
                                                    </Tag>
                                                    <Tag class="px-2" v-else-if="data.status == 3" value="Đã Duyệt"
                                                        severity="warning">
                                                    </Tag>
                                                    <Tag class="px-2" v-else-if="data.status == 4" value="Đang được đấu giá"
                                                        severity="warning">
                                                    </Tag>
                                                    <Tag class="px-2" v-else-if="data.status == 6"
                                                        value="Đấu giá không thành công" severity="warning">
                                                    </Tag>
                                                    <Tag class="px-2" v-else-if="data.status == 7" value="Chờ thanh toán"
                                                        severity="warning">
                                                    </Tag>
                                                    <Tag class="px-2" v-else-if="data.status == 8" value="Chờ lấy hàng"
                                                        severity="info">
                                                    </Tag>
                                                    <Tag class="px-2" v-else-if="data.status == 9" value="Hoàn thành"
                                                        severity="success">
                                                    </Tag>
                                                    <Tag class="px-2" v-else :value="data.status" severity="warning">
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
                                            <div v-if="totalRecords > 0">
                                                <Paginator class="p-0" :rows="pPageSize" :totalRecords="totalRecords"
                                                    template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageInput"
                                                    @page="onPageFinish($event)">
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
                </TabView>
            </div>
        </div>
    </section>
</template>
  
<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { User } from '~/models/User'
const nsStoreItem = namespace('item/store-seller-item')
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
    soldBoxData: any[] = []
    finishBoxData: any[] = []
    name: any = ''
    categoryId: any = ''
    statusId: any = 0
    totalWaiting: number = 0

    //-----Pagination---------------------------------
    pPagenum: number = 1
    pPageSize: number = 10
    totalRecords: number = 0
    blockedTable: boolean = false

    //---------------------------------------
    home = { icon: 'pi pi-home', to: '/homepage' }
    items = [
        { label: 'Kênh bán' },
    ]
    isSeller: boolean = false
    appId: string | null = null
    //----------------------------------------
    oCategories: any[] = []
    oStatuss: any[] = [
        { id: 0, name: '---Tất cả---' },
        { id: 1, name: 'Chưa tiếp nhận & Đang xử lý' },
        { id: 2, name: 'Bị từ chối' },
        { id: 3, name: 'Đã Duyệt' },
        { id: 4, name: 'Đang được đấu giá' },
        { id: 6, name: 'Đấu giá không thành công' },
        { id: 7, name: 'Chờ thanh toán' },
        { id: 8, name: 'Chờ lấy hàng' },
        { id: 9, name: 'Hoàn thành' },
    ]

    @nsStoreUser.State('user')
    user!: User.Model | undefined
    @nsCategory.Action
    actGetAllCategory!: () => Promise<any>
    @nsStoreUser.Action
    actGetSellerApplication!: (params: any) => Promise<string>
    @nsStoreItem.Action
    actSearchItemApplication!: (params: any) => Promise<any>
    @nsStoreItem.Action
    actGetItemApplicationImage!: (params: any) => Promise<any>

    async mounted() {
        if (this.user?.role.id == 4) {
            const result: any = await this.actGetSellerApplication({ userId: this.user?.id })
            console.log(result)
            this.appId = result.id
            if (!this.appId) {
                this.$toast.add({
                    severity: 'error', summary: 'Cảnh báo',
                    detail: 'Bạn chưa nâng cấp lên tài khoản người bán. Vui lòng nâng cấp để thực hiện hành động', life: 10000
                })
                this.isSeller = false
            }
            return
        }
        this.isSeller = true
        this.getCategory()
        this.Search()
        this.SearchSold()
    }
    async Search(pageNum: any = this.pPagenum) {
        const params = {
            pageNum: pageNum,
            pageSize: this.pPageSize || 5,
            search: this.name,
            status: this.statusId == 0 ? '' : this.statusId,
            category: this.categoryId,
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
    async SearchSold(pageNum: any = this.pPagenum) {
        const params = {
            pageNum: pageNum,
            pageSize: this.pPageSize || 5,
            search: '',
            status: 8,
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
        this.soldBoxData = response.records
        this.blockedTable = false
    }
    async SearchFinish(pageNum: any = this.pPagenum) {
        const params = {
            pageNum: pageNum,
            pageSize: this.pPageSize || 10,
            search: '',
            status: 9,
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
        this.finishBoxData = response.records
        this.blockedTable = false
    }
    async getCategory() {
        const response = await this.actGetAllCategory()
        if (response) {
            this.oCategories.push({
                id: '',
                name: '-----Tất cả-----',
            })
            response.records.forEach((cat: any) => {
                this.oCategories.push({
                    id: cat.id,
                    name: cat.name,
                })
            });
        }
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
    onPageSold(event: any) {
        this.SearchSold(event.page + 1)
    }
    onPageFinish(event: any) {
        this.SearchFinish(event.page + 1)
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
  