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
              <Dropdown class="w-100  line-height-1" v-model="role" :options="oRoles" optionLabel="name"
                optionValue="value" />
            </div>
            <div class="col-fixed field">
              <label>Tình trạng</label>
              <div class="col-3 field-checkbox my-2 w-full">
                <!-- <label>Tình trạng</label>
                <Dropdown class="w-100" v-model="banned" :options="oBanneds" optionLabel="name" optionValue="value" /> -->
                <Checkbox id="binary" v-model="banned" :binary="true" />
                <label for="binary">{{ banned ? 'Bị cấm' : 'Hoạt động' }}</label>
              </div>
            </div>
            <div class="col field justify-content-between flex pt-5">
              <Button class=" border-10" style="height: 36px" @click="Search()">
                <i class="pi pi-search mr-2"></i>Tìm kiếm
              </Button>
              <Button class="btn-primary border-10" style="height: 36px" @click="onAddNew()">
                <i class="pi pi-plus mr-2"></i>Thêm Mới
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div class="row flex-1 relative">
        <div class="col-12 md:col-12">
          <DataTable class="w-full airtag-datatable h-full flex flex-column" v-if="boxData" :value="boxData"
            responsiveLayout="scroll" dataKey="id" :resizableColumns="true" :rows="20" :scrollable="false" stripedRows>
            <Column field="id" header="STT">
              <template #body="slotProps"><span>{{ (pPagenum - 1) * pPageSize + slotProps.index + 1 }}</span></template>
            </Column>
            <Column field="phone" header="SỐ ĐIỆN THOẠI" sortable="sortable" bodyClass="font-semibold"
              className="p-text-right"></Column>
            <Column field="name" header="TÊN" sortable="sortable" className="w-3 font-semibold"></Column>
            <Column field="role" header="QUYỀN" sortable="sortable" className="">
              <template #body="{ data }">
                <div>
                  <!-- <Tag class="px-2 bg-green-100" v-if="data.role.id == 5" severity="danger"><span
                      class="font-bold text-green-400 font-size-small">Quản trị viên</span></Tag>
                  <Tag class="px-2 bg-green-100" v-else-if="data.role.id == 1" severity="danger"><span
                      class="font-bold text-green-400 font-size-small">Quản lý</span></Tag>
                  <Tag class="px-2 bg-green-100" v-else-if="data.role.id == 2" severity="danger"><span
                      class="font-bold text-green-400 font-size-small">Chuyên gia</span></Tag>
                  <Tag class="px-2 bg-green-100" v-else-if="data.role.id == 3" severity="danger"><span
                      class="font-bold text-green-400 font-size-small">Người bán</span></Tag>
                  <Tag class="px-2 surface-200" v-else severity="danger"><span
                      class="font-bold text-green-400 font-size-small">Người mua</span></Tag> -->

                  <Tag class="px-2 " v-if="data.role.id == '5'" severity="danger" value="Quản trị viên">
                  </Tag>
                  <Tag class="px-2 " v-else-if="data.role.id == '1'" severity="success" value="Quản lý">
                  </Tag>
                  <Tag class="px-2 " v-else-if="data.role.id == '2'" severity="success" value="Kiểm định viên">
                  </Tag>
                  <Tag class="px-2 " v-else-if="data.role.id == '3'" severity="warning" value="Người bán">
                  </Tag>
                  <Tag class="px-2 " v-else-if="data.role.id == '4'" severity="info" value="Người mua">
                  </Tag>
                  <Tag class="px-2 " v-else severity="info" :value="data.role.id">
                  </Tag>


                </div>
              </template>
            </Column>
            <Column field="updated" header="NGÀY CẬP NHẬT" sortable="sortable" className="p-text-center">
              <template #body="{ data }">{{
                data.updated | dateTimeFomat
              }}</template>
            </Column>
            <Column field="status" header="TRẠNG THÁI" sortable="sortable" className="p-text-right">
              <template #body="{ data }">
                <div>
                  <Tag class="px-2" v-if="data.deleted != null" severity="danger" value="Đã cấm"></Tag>
                  <Tag class="px-2" v-else severity="success" value="Hoạt động"></Tag>
                </div>
              </template>
            </Column>
            <Column :exportable="false" header="Hoạt động" className="p-text-right">
              <template #body="{ data }">
                <Button class="border-0 p-0 h-2rem w-2rem justify-content-center surface-200"
                  @click="viewDetail(data.id)">
                  <div class="icon--small icon-compose"></div>
                </Button>
                <Button v-if="data.deleted == null"
                  class="border-0 p-0 ml-1 h-2rem w-2rem justify-content-center surface-200" @click="deleteBoxById(data)">
                  <div class="icon--small icon-bin"></div>
                </Button>
              </template>
            </Column>
            <template #footer>
              <div>
                <div class="flex align-items-center">
                  <div class="icon--large icon-showing surface-400"></div>
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
  pPagenum: number = 1
  pPageSize: number = 10
  totalRecords: number = 0
  search: string = ''
  role: number = 0
  banned: boolean = false
  oRoles = [
    { name: 'Tất cả', value: 0 },
    { name: 'Quản trị viên', value: 1 },
    { name: 'Kiểm định viên', value: 2 },
    { name: 'Người bán', value: 3 },
    { name: 'Người mua', value: 4 },
    { name: 'Admin', value: 5 },
  ]
  oBanneds = [
    { name: 'Tất cả', value: null },
    { name: 'Hoạt động', value: false },
    { name: 'Đã cấm', value: true }
  ]

  @nsStoreUser.Action
  actSearchUser!: (params: any) => Promise<any>
  @nsStoreUser.Action
  actAdminBanUser!: (params: any) => Promise<any>
  @nsStoreUser.Action
  actModBanUser!: (params: any) => Promise<any>

  async mounted() {
    this.Search()
  }
  async Search(pageNum: number = this.pPagenum) {
    console.log('LTA', this.search)
    const params = {
      pageNum: pageNum,
      pageSize: this.pPageSize,
      search: this.search,
      role: this.role == 0 ? '' : this.role,
      banned: this.banned
    }
    const response = await this.actSearchUser(params)
    if (response) {
      this.boxData = response.records
      this.totalRecords = response.totalRecords
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
  async deleteBoxById(data: any) {
    if (!confirm("Bạn có chắc muốn cấm người này?")) {
      return
    }
    console.log(data)
    const params = {
      userId: data.id,
    }
    let response;
    const role = this.$cookies.get('auth.role')
    if (role == 1) {
      response = await this.actModBanUser(params)
    } else if (role == 5) {
      response = await this.actAdminBanUser(params)
    }
    if (response && response?.status == '200') {
      data.deleted = 'deleted'
      this.Search()
      this.$toast.add({ severity: 'info', summary: 'Thông báo', detail: 'Đã cấm người dùng', life: 5000 })
    }
  }
  onPage(event: any) {
    this.pPagenum = event.page + 1
    this.Search(event.page + 1)
  }
}

export default UserList
</script>
  
<style scoped>
.box-page-container {
  height: calc(100vh - 100px);
}
</style>
  