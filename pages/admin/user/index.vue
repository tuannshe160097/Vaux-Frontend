//View all user
<template>
  <div class="box-page-container flex flex-column container">
    <div class="header container">
      <div class="col-fixed">
        <h2 class="font-bold m-0 text-uppercase">Danh sách người dùng</h2>
      </div>
    </div>
    <div class="card-body">
      <div class="row justify-content-between">
        <div class="col-fixed">
          <div class="grid">
            <div class="col-fixed">
              <span class="p-input-icon-left">
                <div
                  class="icon icon--left icon-search-input surface-900"
                ></div>
                <InputText
                  class="w-21rem h-3rem"
                  type="text"
                  placeholder="Tìm kiếm"
                ></InputText
              ></span>
            </div>
            <div class="col-fixed">
              <Button class="w-9rem h-3rem">
                <div class="icon--base icon-plus surface-900 bg-white"></div>
                <span class="text-900 ml-3 text-white">Thêm Mới</span>
              </Button>
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
                formatDate(data.created)
              }}</template>
            </Column>
            <Column
              field="updated"
              header="NGÀY CẬP NHẬT"
              sortable="sortable"
              className="p-text-right"
            >
              <template #body="{ data }">{{
                formatDate(data.updated)
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
                      >Bị chặn</span
                    ></Tag
                  >
                  <Tag class="px-2 surface-200" v-else severity="danger"
                    ><span class="font-bold text-green-400 font-size-small"
                      >Hoạt động</span
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
                  <div class="icon--small icon-edit"></div>
                </Button>
                <Button
                  class="border-0 p-0 ml-1 h-2rem w-2rem justify-content-center surface-200"
                  @click="deleteBoxById(data.id)"
                >
                  <div class="icon--small icon-delete"></div>
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
                    >Showing 01 - 100 of 1280</span
                  >
                </div>
                <Button
                  class="p-button-danger opacity-70"
                  @click="deleteBoxById(null)"
                  v-if="selectedBoxes.length &gt; 0"
                >
                  <div class="icon--small icon-delete bg-white"></div>
                  <span class="ml-3"
                    >Delete {{ selectedBoxes.length }} items selected</span
                  >
                </Button>
              </div>
              <Paginator
                class="p-0"
                :rows="20"
                :totalRecords="totalItemsCount"
              ></Paginator>
            </template>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { formatDate } from '~/utils/commons/helper'
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
  @nsStoreUser.Action
  actSearchUser!: (params: {
    pageNum: number
    pageSize: number
  }) => Promise<any>

  async mounted() {
    const params = {
      pageNum: this.pageNum || 1,
      pageSize: this.pageSize || 10,
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
    this.$router.push('/admin/user/detail?userId=' + id)
  }
  deleteBoxById(id: any) {}
}

export default UserList
</script>
  
  <style scoped>
.box-page-container {
  height: calc(100vh - 100px);
}
.header {
  height: 90px;
  background: #fff;
  width: auto;
  align-items: center;
  display: flex;
  padding: 2rem;
  color: #a16b56;
  text-transform: uppercase;
}
.card-body {
  margin: 1rem;
  background: #fff;
  border-radius: 10px;
  padding: 1rem;
}
table .p-datatable-thead {
  background: #ead9d2;
}

.p-datatable.p-datatable-striped .p-datatable-tbody > tr:nth-child(even) {
  background-color: #fbf8f7 !important;
}
</style>
  