//View all user
<template>
  <div class="box-page-container flex flex-column container">
    <div class="flex justify-content-between header container">
      <div class="col-fixed">
        <h2 class="font-bold m-0 text-uppercase">Danh sách người dùng</h2>
      </div>
      <div class="col-fixed">
        <div class="grid align-content-center">
          <div class="col-fixed">
            <!-- <Button
              class="w-9rem h-3rem"
              type="button"
              label="Thêm Mới"
              @click="onAddNew()"
            ></Button> -->
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
              <label>Quyền</label>
              <Dropdown class="w-100" v-model="role" :options="oRoles" optionLabel="name" optionValue="value" />
            </div>
            <div class="col field justify-content-end flex pt-5">
              <Button class="mr-2" label="Tìm kiếm" style="height: 36px" @click="Search()" />
              <Button class="" label="Thêm Mới" style="height: 36px" @click="onAddNew()" />
            </div>
          </div>
        </div>
      </div>
      <div class="row flex-1 relative">
        <div class="col-12 md:col-12">
          <DataTable class="w-full airtag-datatable h-full flex flex-column" v-if="boxData" :value="boxData"
            responsiveLayout="scroll" :selection.sync="selectedBoxes" dataKey="id" :resizableColumns="true" :rows="20"
            :scrollable="false" stripedRows>
            <Column field="id" header="STT">
              <template #body="slotProps"><span>{{ slotProps.index + 1 }}</span></template>
            </Column>
            <Column field="phone" header="SỐ ĐIỆN THOẠI" sortable="sortable" bodyClass="font-semibold"></Column>
            <Column field="name" header="TÊN" sortable="sortable" className="w-3 font-semibold"></Column>
            <Column field="role" header="QUYỀN" sortable="sortable" className="p-text-right">
              <template #body="{ data }">
                <div>
                  <Tag class="px-2 bg-green-100" v-if="data.role.id == 5" severity="danger"><span
                      class="font-bold text-green-400 font-size-small">Admin</span></Tag>
                  <Tag class="px-2 bg-green-100" v-else-if="data.role.id == 1" severity="danger"><span
                      class="font-bold text-green-400 font-size-small">Mod</span></Tag>
                  <Tag class="px-2 bg-green-100" v-else-if="data.role.id == 2" severity="danger"><span
                      class="font-bold text-green-400 font-size-small">Chuyên gia</span></Tag>
                  <Tag class="px-2 bg-green-100" v-else-if="data.role.id == 3" severity="danger"><span
                      class="font-bold text-green-400 font-size-small">Người bán</span></Tag>
                  <Tag class="px-2 surface-200" v-else severity="danger"><span
                      class="font-bold text-green-400 font-size-small">Người mua</span></Tag>
                </div>
              </template>
            </Column>
            <!-- <Column field="created" header="NGÀY TẠO" sortable="sortable" className="p-text-right">
              <template #body="{ data }">{{
                data.created | dateTimeFomat
              }}</template>
            </Column> -->
            <Column field="updated" header="NGÀY CẬP NHẬT" sortable="sortable" className="p-text-center">
              <template #body="{ data }">{{
                data.updated | dateTimeFomat
              }}</template>
            </Column>
            <Column field="status" header="TRẠNG THÁI" sortable="sortable" className="p-text-right">
              <template #body="{ data }">
                <div>
                  <Tag class="px-2 bg-green-100" v-if="data.deleted != null" severity="danger"><span
                      class="font-bold text-400 font-size-small">Bị chặn</span></Tag>
                  <Tag class="px-2 surface-200" v-else severity="danger"><span
                      class="font-bold text-green-400 font-size-small">Hoạt động</span></Tag>
                </div>
              </template>
            </Column>
            <Column :exportable="false" header="Hoạt động" className="p-text-right">
              <template #body="{ data }">
                <Button class="border-0 p-0 h-2rem w-2rem justify-content-center surface-200"
                  @click="viewDetail(data.id)">
                  <div class="icon--small icon-compose"></div>
                </Button>
                <Button class="border-0 p-0 ml-1 h-2rem w-2rem justify-content-center surface-200"
                  @click="deleteBoxById(data.id)">
                  <div class="icon--small icon-bin"></div>
                </Button>
              </template>
            </Column>
            <template #footer="">
              <div>
                <div class="flex align-items-center" v-if="selectedBoxes.length &lt;= 0">
                  <div class="icon--large icon-footer-paginator surface-400"></div>
                  <span class="ml-3 text-400 font-size-small">Showing 01 - 100 of 1280</span>
                </div>
                <Button class="p-button-danger opacity-70" @click="deleteBoxById(null)"
                  v-if="selectedBoxes.length &gt; 0">
                  <div class="icon--small icon-delete bg-white"></div>
                  <span class="ml-3">Delete {{ selectedBoxes.length }} items selected</span>
                </Button>
              </div>
              <Paginator class="p-0" :rows="20" :totalRecords="totalItemsCount"></Paginator>
            </template>
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
  pageNum: number = 1
  pageSize: number = 10
  boxData = []
  totalItemsCount: number = 150
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

  @nsStoreUser.Action
  actSearchUser!: (params: any) => Promise<any>

  async mounted() {
    const params = {
      pageNum: this.pageNum || 1,
      pageSize: this.pageSize || 10,
      search: this.search,
      role: this.role != 0 ? this.role : '',
    }
    const response = await this.actSearchUser(params)
    if (response) {
      console.log(response.records)
      this.boxData = response.records
      this.totalItemsCount = response.totalRecords
    }
  }
  async Search() {
    const params = {
      pageNum: this.pageNum || 1,
      pageSize: this.pageSize || 10,
      search: this.search,
      role: this.role != 0 ? this.role : '',
    }
    const response = await this.actSearchUser(params)
    if (response) {
      this.boxData = response.records
      this.totalItemsCount = response.totalRecords
    }
  }

  formatDate(dateString: string) {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Tháng trong JavaScript bắt đầu từ 0
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }
  viewDetail(id: any) {
    this.$router.push('/admin/user/view?userId=' + id)
  }
  onAddNew() {
    this.$router.push('/admin/user/detail')
  }
  deleteBoxById(id: any) { }
}

export default UserList
</script>
  
<style scoped>
.box-page-container {
  height: calc(100vh - 100px);
}
</style>
  