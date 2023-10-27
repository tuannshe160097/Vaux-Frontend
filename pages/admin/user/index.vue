//View all user
<template>
  <div class="box-page-container flex flex-column">
    <div class="grid justify-content-between">
      <div class="col-fixed">
        <h1 class="font-bold m-0 font-size-4xlarge line-height-1">
          Danh sách người dùng
        </h1>
        <span class="text-600 font-size-small" v-if="boxData"
          >{{ boxData.length }} products found</span
        >
      </div>
      <div class="col-fixed">
        <div class="grid">
          <div class="col-fixed">
            <span class="p-input-icon-left">
              <div class="icon icon--left icon-search-input surface-900"></div>
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
    <div class="grid grid-nogutter flex-1 relative overflow-hidden">
      <div class="col h-full absolute top-0 left-0 right-0">
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
        >
          <Column field="id" header="STT" sortable="sortable">
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
            <template #body="{ data }">{{ formatDate(data.created) }}</template>
          </Column>
          <Column
            field="updated"
            header="NGÀY CẬP NHẬT"
            sortable="sortable"
            className="p-text-right"
          >
            <template #body="{ data }">{{ formatDate(data.updated) }}</template>
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
                  ><span class="font-bold text-green-400 font-size-small"
                    >Bị chặn</span
                  ></Tag
                >
                <Tag class="px-2 surface-200" v-else severity="danger"
                  ><span class="font-bold text-400 font-size-small"
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
          <template #footer="footer">
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
</template>
  
  <script>
export default {
  name: 'UserList',
  layout: 'default',
  data() {
    return {
      boxData: [],
      totalItemsCount: 150,
      selectedBoxes: [],
    }
  },
  created() {
    // Gọi API khi component được tạo
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        const result = await this.$axios.get(
          process.env.BASE_URL + '/api/mod/account?pageNum=1&pageSize=20',
          {}
        )
        this.boxData = result.data
      } catch (error) {
        console.log(error)
        if (error.response) {
          console.log('Lỗi khi xử lý yêu cầu:', error.response.data)
          if ([401, 403].includes(error.response.status)) {
            this.$router.push('/authen/login')
          }
        } else {
          console.error('Lỗi khi gửi yêu cầu:', error)
        }
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      const day = date.getDate().toString().padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0') // Tháng trong JavaScript bắt đầu từ 0
      const year = date.getFullYear()
      return `${day}-${month}-${year}`
    },
    viewDetail(id) {
      this.$router.push('/admin/user/detail?userId='+id)
    },
    deleteBoxById(id){
      
    }
  },
}
</script>
  
  <style scoped>
.box-page-container {
  height: calc(100vh - 24px);
}
.box-page-container ::v-deep.p-component {
  font-family: $font-family-primary;
}
.box-page-container ::v-deep.p-component ::v-deep.pi-calendar:before {
  content: url('~/assets/icons/calendar.svg');
}
.box-page-container ::v-deep.p-component ::v-deep.p-calendar-w-btn,
.box-page-container ::v-deep.p-component .p-buttonn {
  color: #fff;
  background: #a16b56;
  border: 1px solid #a16b56;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  transition: background-color 0.15s, border-color 0.15s, box-shadow 0.15s;
  border-radius: 4px;
}
.box-page-container ::v-deep.p-component ::v-deep.text-right {
  text-align: right !important;
}
.box-page-container
  ::v-deep.p-component
  ::v-deep.text-right
  .p-column-header-content {
  justify-content: end !important;
}
.box-page-container ::v-deep.p-component ::v-deep.disable-button {
  pointer-events: none;
  background-color: $text-color-300;
}
.box-page-container ::v-deep.p-component ::v-deep.disable-button .icon {
  background-color: $text-color-500;
}
</style>
  