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
              <InputText
                class="w-100"
                type="text"
                placeholder="Tìm kiếm"
                v-model="search"
              ></InputText>
            </div>
            <div class="col-3 field">
              <label>Tình trạng</label>
              <Dropdown
                class="w-100"
                v-model="role"
                :options="oRoles"
                optionLabel="name"
                optionValue="value"
              />
            </div>
            <div class="col field justify-content-end flex pt-5">
              <Button
                class="mr-2 border-10"
                label="Tìm kiếm"
                style="height: 36px"
                @click="Search()"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row flex-1 relative">
        <div class="col-12 md:col-12">
          <DataTable
            class="w-full airtag-datatable h-full flex flex-column"
            v-if="boxData"
            :value="boxData"
            responsiveLayout="scroll"
            :selection.sync="selectedBoxes"
            dataKey="id"
            :resizableColumns="true"
            :rows="20"
            :scrollable="false"
            stripedRows
          >
            <Column field="id" header="STT">
              <template #body="slotProps"
                ><span>{{ slotProps.index + 1 }}</span></template
              >
            </Column>
            <Column
              field="phone"
              header="SỐ ĐIỆN THOẠI"
              sortable="sortable"
              bodyClass="font-semibold"
            ></Column>
            <Column
              field="name"
              header="TÊN"
              sortable="sortable"
              className="w-3 font-semibold"
            ></Column>
            <Column
              field="created"
              header="NGÀY TẠO"
              sortable="sortable"
              className="p-text-right"
            >
              <template #body="{ data }">{{
                data.created | dateTimeFomat
              }}</template>
            </Column>
            <Column
              field="status"
              header="TRẠNG THÁI"
              sortable="sortable"
              className="p-text-right"
            >
              <template #body="{ data }">
                <div>
                  <Tag
                    class="px-2 bg-green-100"
                    v-if="data.deleted != null"
                    severity="danger"
                    ><span class="font-bold text-400 font-size-small"
                      >Từ chối</span
                    ></Tag
                  >
                  <Tag
                    class="px-2 surface-200"
                    v-else-if="data.deleted == 1"
                    severity="danger"
                    ><span class="font-bold text-green-400 font-size-small"
                      >Chờ duyệt</span
                    ></Tag
                  >
                  <Tag class="px-2 surface-200" v-else severity="danger"
                    ><span class="font-bold text-green-400 font-size-small"
                      >Đồng ý</span
                    ></Tag
                  >
                </div>
              </template>
            </Column>
            <Column
              :exportable="false"
              header="Hoạt động"
              className="p-text-right"
            >
              <template #body="{ data }">
                <Button
                  class="border-0 p-0 h-2rem w-2rem justify-content-center surface-200"
                  @click="viewDetail(data.id)"
                >
                  <div class="icon--small icon-eye"></div>
                </Button>
                <Button
                  class="border-0 p-0 ml-1 h-2rem w-2rem justify-content-center surface-200"
                  @click="deleteBoxById(data.id)"
                >
                  <div class="icon--small icon-bin"></div>
                </Button>
              </template>
            </Column>
            <template #footer="">
              <div>
                <div
                  class="flex align-items-center"
                  v-if="selectedBoxes.length &lt;= 0"
                >
                  <div
                    class="icon--large icon-footer-paginator surface-400"
                  ></div>
                  <span class="ml-3 text-400 font-size-small"
                    >Showing
                    {{ Math.min((pPagenum - 1) * pPageSize + 1, totalRecords) }}
                    - {{ Math.min(pPagenum * pPageSize, totalRecords) }} of
                    {{ totalRecords }}</span
                  >
                </div>
              </div>
              <div v-if="totalRecords > 0">
                <Paginator
                  class="p-0"
                  :rows="pPageSize"
                  :totalRecords="totalRecords"
                  template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageInput"
                  @page="onPage($event)"
                >
                </Paginator>
              </div>
            </template>
            <template #empty>
              <div class="justify-content-center flex font-italic">
                Không có dữ liệu
              </div></template
            >
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
const nsStoreUser = namespace('user/store-user')

@Component({
  middleware: ['authenticate'],
  layout: 'admin',
})
class UserList extends Vue {
  boxData = []
  selectedBoxes = []
  search: string = ''
  role: number = 0
  oRoles = [
    { name: 'Tất cả', value: 0 },
    { name: 'Quản trị viên', value: 1 },
    { name: 'Kiểm định viên', value: 2 },
    { name: 'Người bán', value: 3 },
    { name: 'Người mua', value: 4 },
    { name: 'Admin', value: 5 },
  ]

  pPagenum: number = 1
  pPageSize: number = 10
  totalRecords: number = 0

  @nsStoreUser.Action
  actSearchUser!: (params: any) => Promise<any>

  async mounted() {
    const params = {
      pageNum: this.pPagenum || 1,
      pageSize: this.pPageSize || 10,
      search: this.search,
    }
    const response = await this.actSearchUser(params)
    if (response) {
      this.boxData = response.records
      this.totalRecords = response.totalRecords
    }
  }
  async Search(pageNum: number = this.pPagenum) {
    const params = {
      pageNum: pageNum || 1,
      pageSize: this.pPageSize || 10,
      search: this.search,
      role: this.role != 0 ? this.role : '',
    }
    const response = await this.actSearchUser(params)
    if (response) {
      this.boxData = response.records
      this.totalRecords = response.totalRecords
    }
  }
  viewDetail(id: any) {
    this.$router.push('/admin/sellerApplication/view?userId=' + id)
  }
  onPage(event: any) {
    this.Search(event.page + 1)
  }
  deleteBoxById(id: any) {}
}

export default UserList
</script>
  
<style scoped>
.box-page-container {
  height: calc(100vh - 100px);
}
</style>
  