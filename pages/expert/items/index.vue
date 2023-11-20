//View all user
<template>
  <div class="box-page-container flex flex-column container">
    <div class="flex justify-content-between header container">
      <div class="col-fixed">
        <h2 class="font-bold m-0 text-uppercase">Danh sách người bán</h2>
      </div>
      <div class="col-fixed">
        <div class="grid align-content-center">
          <div class="col-fixed">
          </div>
        </div>
      </div>
    </div>

    <div class="card-body">
      <div class="row justify-content-between">
        <div class="col-fixed">
          <div class="grid formgrid">
            <div class="col-3 field">
              <label>Tên, mail, sđt</label>
              <InputText class="w-100" type="text" placeholder="Tìm kiếm" v-model="search"></InputText>
            </div>
            <div class="col-3 field">
              <label>Tình trạng</label>
              <Dropdown class="w-100" v-model="status" :options="oStatus" optionLabel="name" optionValue="value" />
            </div>
            <div class="col field justify-content-end flex pt-5">
              <Button class="mr-2 border-10" label="Tìm kiếm" style="height: 36px" @click="Search()" />
            </div>
          </div>
        </div>
      </div>
      <div class="row flex-1 relative">
        <div class="col-12 md:col-12">
          <BlockUI :blocked="blockedTable">
            <DataTable class="w-full airtag-datatable h-full flex flex-column" v-if="boxData" :value="boxData"
              responsiveLayout="scroll" :selection.sync="selectedBoxes" dataKey="id" :resizableColumns="true" :rows="20"
              :scrollable="false" stripedRows>
              <Column field="id" header="STT">
                <template #body="slotProps"><span>{{ slotProps.index + 1 }}</span></template>
              </Column>
              <Column field="imgUrl" header="Ảnh bìa" sortable="sortable" bodyClass="font-semibold">
                <template #body="{ data }">
                  <img :src="data.imgUrl" class="product-image" style="height:100px" />
                </template>
              </Column>
              <Column field="name" header="Tên sản phẩm" sortable="sortable" bodyClass="font-semibold"></Column>
              <Column field="category.name" header="thể loại" sortable="sortable" className="w-3 font-semibold"></Column>
              <Column field="created" header="NGÀY TẠO" sortable="sortable" className="p-text-right">
                <template #body="{ data }">{{
                  data.created | dateTimeFomat
                }}</template>
              </Column>
              <Column field="status" header="TRẠNG THÁI" sortable="sortable" className="p-text-right">
                <template #body="{ data }">
                  <div v-if="data.expertId == null">
                    <Tag class="px-2 bg-danger-100" v-if="data.status == 3" severity="danger"><span
                        class="font-bold text-400 font-size-small">Từ chối</span></Tag>
                    <Tag class="px-2 surface-200" v-else-if="data.status == 1" severity="danger"><span
                        class="font-bold text-700 font-size-small">Chờ duyệt</span></Tag>
                    <Tag class="px-2 surface-200  bg-green-100" v-else severity="danger"><span
                        class="font-bold text-green-400 font-size-small">Đồng ý</span></Tag>
                  </div>
                  <div v-else>
                    <Tag class="px-2 surface-200  bg-green-100" v-if="data.expertId == user?.id" severity="info"><span
                        class="font-bold text-green-400 font-size-small">Đang nhận xử lý</span></Tag>
                    <Tag class="px-2 surface-200  bg-yellow-100" v-else severity="info"><span
                        class="font-bold text-yellow-400 font-size-small">Đang xử lý</span></Tag>
                  </div>
                </template>
              </Column>
              <Column :exportable="false" header="Hoạt động" className="p-text-right">
                <template #body="{ data }">
                  <Button class="border-0 p-0 h-2rem w-2rem justify-content-center surface-200"
                    @click="viewDetail(data.id)">
                    <div class="icon--small icon-eye"></div>
                  </Button>
                </template>
              </Column>
              <template #footer="">
                <div>
                  <div class="flex align-items-center" v-if="selectedBoxes.length &lt;= 0">
                    <div class="icon--large icon-footer-paginator surface-400"></div>
                    <span class="ml-3 text-400 font-size-small">Showing
                      {{ Math.min((pPagenum - 1) * pPageSize + 1, totalRecords) }}
                      - {{ Math.min(pPagenum * pPageSize, totalRecords) }} of
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
    </div>
  </div>
</template>
  
<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { User } from '~/models/User'
const nsExpItem = namespace('expert/store-itemApplication')
const nsStoreUser = namespace('user-auth/store-user')

@Component({
  middleware: ['authenticate'],
  layout: 'admin',
})
class ItemList extends Vue {

  @nsStoreUser.State('user')
  user!: User.Model | undefined
  curUserId: number | undefined
  boxData: any[] = []
  selectedBoxes = []
  search: string = ''
  status: number = 0
  oStatus = [
    { name: 'Tất cả', value: null },
    { name: 'Đã duyệt', value: 0 },
    { name: 'Chưa duyệt', value: 1 },
    { name: 'Đã từ chối', value: 2 }
  ]
  //-----Pagination---------------------------------
  pPagenum: number = 1
  pPageSize: number = 10
  totalRecords: number = 0
  blockedTable: boolean = false
  @nsExpItem.Action
  actSearchItemApplication!: (params: any) => Promise<any>
  @nsExpItem.Action
  actGetItemApplicationImage!: (params: any) => Promise<any>

  async mounted() {
    const params = {
      pageNum: this.pPagenum || 1,
      pageSize: this.pPageSize || 10,
      search: this.search,
      status: this.status,
    }
    this.blockedTable = true
    let response = await this.actSearchItemApplication(params)
    if (response) {
      console.log(response)
      for (let i = 0; i < response.records.length; i++) {
        if (response.records[i].images[0] == undefined || response.records[i].images[0] == null) {
          response.records[i].imgUrl = ''
          continue
        }
        response.records[i].imgUrl = await this.getImageUrl(response.records[i].id, response.records[i].thumbnailId)
      }
      console.log(this.boxData)
      this.totalRecords = response.totalRecords
    }
    this.boxData = response.records
    this.blockedTable = false
  }
  async Search(pageNum: number = this.pPagenum) {
    const params = {
      pageNum: pageNum || 1,
      pageSize: this.pPageSize || 10,
      search: this.search,
      status: this.status,
    }
    const response = await this.actSearchItemApplication(params)
    console.log(response)
    if (response) {
      this.boxData = response.records
      this.totalRecords = response.totalRecords
    }
  }
  async getImageUrl(itemId: any, imgId: any) {
    try {
      if (itemId == null || imgId == null) return ''
      const params = {
        itemId: itemId,
        imgId: imgId,
      }
      return process.env.BE_API_URL + '/api/item/' + itemId + '/images/' + imgId
      // const response = await this.actGetItemApplicationImage(params)
      // return new Promise((resolve) => {
      //   const reader = new FileReader();
      //   reader.readAsDataURL(response);
      //   reader.onloadend = () => {
      //     const base64Image = reader.result;
      //     resolve(base64Image);
      //   };
      // });
    } catch (error) {
      this.$store.commit('commons/store-error/setError', "Error fetching or converting image")
      console.error("Error fetching or converting image:", error);
      return null;
    }
  }
  viewDetail(id: any) {
    this.$router.push('/expert/items/view?itemId=' + id)
  }
  onPage(event: any) {
    this.Search(event.page + 1)
  }
  deleteBoxById(id: any) { }
}

export default ItemList
</script>
  
<style scoped>
.box-page-container {
  height: calc(100vh - 100px);
}
</style>
  