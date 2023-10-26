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
          <Column field="id" header="SỐ" sortable="sortable">
            <template #body="slotProps"
              ><span class="font-semibold">{{
                slotProps.index + 1
              }}</span></template
            >
          </Column>
          <Column
            field="phone"
            header="SỐ ĐIỆN THOẠI"
            sortable="sortable"
            bodyClass="font-semibold"
          ></Column>
          <Column
            field="email"
            header="EMAIL"
            sortable="sortable"
            className="w-3"
          ></Column>
          <Column
            field="created.format(dd-mm-yyyy)"
            header="NGÀY TẠO"
            sortable="sortable"
            className="p-text-right"
          >
            <template #body="{ data }">{{
              new Date(data.createAt).toLocaleDateString('en-US')
            }}</template>
          </Column>
          <Column
            field="updated.format(dd-mm-yyyy)"
            header="NGÀY CẬP NHẬT"
            sortable="sortable"
            className="p-text-right"
            bodyClass="font-semibold"
          >
            <template #body="{ data }">{{
              new Date(data.createAt).toLocaleDateString('en-US')
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
                <Tag class="px-2 bg-green-100" v-if="deleted" severity="success"
                  ><span class="font-bold text-green-400 font-size-small"
                    >AVAILABLE</span
                  ></Tag
                >
                <Tag class="px-2 surface-200" v-else="v-else" severity="success"
                  ><span class="font-bold text-400 font-size-small"
                    >DISABLE</span
                  ></Tag
                >
              </div>
            </template>
          </Column>
          <Column
            :exportable="false"
            header="Hoạt động"
            sortable="sortable"
            className="p-text-right"
          >
            <template #body="{ data }">
              <Button
                class="border-0 p-0 h-2rem w-2rem justify-content-center surface-200"
                :disabled="!data.status"
              >
                <div class="icon--small icon-edit"></div>
              </Button>
              <Button
                class="border-0 p-0 ml-1 h-2rem w-2rem justify-content-center surface-200"
                @click="deleteBoxById(data.id)"
                :disabled="!data.status"
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
  name: 'CreateAdmin',
  layout: 'default',
  data() {
    return {
      boxData: [],
      totalItemsCount: 150,
      selectedBoxes: [],
      selectedWarehouse: null,
      selectedSize: null,
      selectedLocation: null,
      isFilter: false,
      dateFrom: null,
      dateTo: null,
      masterData: [],
    }
  },
  created() {
    // Gọi API khi component được tạo
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        const token = this.$cookies.get('jwt')
        if (token) {
          console.log('LTA: ' + token)
          const result = await this.$axios.$get(
            process.env.BASE_URL + '/api/mod/account?pageNum=1&pageSize=20',
            {
              headers: {
                Authorization: 'Bearer ' + token,
              },
            }
          )
          console.log(result)
          this.boxData = result
        } else {
          this.$router.push('/authen/login')
        }
      } catch (error) {
        if (error.response) {
          console.log('Lỗi Bad Request:', error.response.data)
          // Xử lý lỗi 400 ở đây
        } else {
          console.error('Lỗi khi gửi yêu cầu:', error)
        }
      }
    },
  },
}
</script>
  
  <style lang="sass" scoped>
.box-page-container
  height: calc(100vh - 24px)
  ::v-deep.p-component
    font-family: $font-family-primary
    ::v-deep.pi-calendar:before
      content: url('~/assets/icons/calendar.svg')
    ::v-deep.p-calendar-w-btn
    .p-buttonn
      color: #ffffff
      background: #A16B56
      border: 1px solid #A16B56
      padding: 0.5rem 0.75rem
      font-size: 1rem
      transition: background-color 0.15s, border-color 0.15s, box-shadow 0.15s
      border-radius: 4px
    ::v-deep.text-right
      text-align: right !important
      .p-column-header-content
        justify-content: end !important
    ::v-deep.disable-button
      pointer-events: none
      background-color: $text-color-300
      .icon
        background-color: $text-color-500
</style>
  