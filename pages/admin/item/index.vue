<template>
  <div class="box-page-container flex flex-column container">
    <div class="flex justify-content-between header container">
      <div class="col-fixed">
        <h2 class="font-bold m-0 font-size-4xlarge line-height-1">
          Danh sách sản phẩm
        </h2>
      </div>
      <div class="col-fixed">
        <div class="grid align-content-center">
          <div class="col-fixed"></div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="row justify-content-between">
        <div class="col-fixed">
          <!-- <div class="grid formgrid">
            <div class="col-3">
              <label>Tên sản phẩm</label>
              <InputText
                class="w-21rem h-3rem"
                type="text"
                placeholder="Tìm kiếm"
                v-model="search"
              ></InputText>
            </div>
            <div class="col field justify-content-end flex pt-5">
              <Button
                class="mr-2"
                label="Tìm kiếm"
                style="height: 36px"
                @click="getCategory()"
              />
              <Button
                class=""
                label="Thêm Mới"
                style="height: 36px"
                @click="openModelCategory(null)"
              />
            </div>
          </div> -->
        </div>
      </div>
      <div class="row flex-1 relative">
        <div class="col-12 md:col-12">
          <DataTable
            class="w-full airtag-datatable h-full flex flex-column"
            v-if="items"
            :value="items"
            responsiveLayout="scroll"
            dataKey="id"
            :resizableColumns="true"
            :rows="10"
            :scrollable="false"
            stripedRows
          >
            <Column field="id" header="STT" sortable="sortable">
              <template #body="slotProps">
                <span class="">{{ slotProps.index + 1 }}</span>
              </template>
            </Column>
            <Column
              field="name"
              className="font-semibold"
              header="Tên"
              sortable="sortable"
            ></Column>
            <Column
              field="categoryid"
              className="font-semibold"
              header="Hạng mục"
              sortable="sortable"
            ></Column>
            <Column
              field="sellerid"
              className="font-semibold"
              header="Người bán"
              sortable="sortable"
            ></Column>
            <Column
              field="description"
              header="Mô tả"
              sortable="sortable"
              className="overflow-ellipsis"
            >
              <template #body="{ data }">
                <p class="element">{{ data.description }}</p>
              </template>
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
                    v-if="!data.deleted"
                    severity="success"
                    ><span class="font-bold text-green-400 font-size-small"
                      >Đang hoạt động</span
                    ></Tag
                  >
                  <Tag class="px-2 surface-200" v-else severity="success"
                    ><span class="font-bold text-400 font-size-small"
                      >Dừng hoạt động</span
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
              <!-- <template #body="{ data }">
                <Button
                  class="border-0 p-0 h-2rem w-2rem justify-content-center surface-200"
                  @click="openModelCategory(data)"
                >
                  <div class="icon--small icon-compose"></div>
                </Button>
              </template> -->
            </Column>
            <!-- <template #footer="">
              <div>
                <div class="flex align-items-center">
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
            </template> -->
            <template #empty>
              <div class="justify-content-center flex font-italic">
                Không có dữ liệu
              </div></template
            >
          </DataTable>
        </div>
        <!-- <Dialog
          :header="titleModel"
          :visible.sync="displayBasic"
          :containerStyle="{ width: '50vw' }"
          :maximizable="true"
          :modal="true"
        >
          <div class="field">
            <label>Tên</label>
            <InputText
              class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none w-full focus:border-primary"
              type="text"
              v-model="sName"
              placeholder="Vui lòng nhập tên"
            />
          </div>
          <div class="field">
            <label>Mô tả</label>
            <Textarea
              class="text-left w-full"
              v-model="sDescription"
              rows="15"
              cols="100"
              placeholder="Vui lòng nhập mô tả"
            />
          </div>
          <template #footer>
            <Button
              label="Hủy bỏ"
              icon="pi pi-times"
              @click="closeModel"
              class="p-button-text"
            />
            <Button label="Lưu" icon="pi pi-check" @click="onSaveCategory" />
          </template>
        </Dialog>
        <ConfirmDialog></ConfirmDialog> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { confirmDelete } from '~/utils/commons/helper'
const nsStoreItem = namespace('item/store-mod-item')

@Component({
  middleware: ['authenticate'],
  layout: 'admin',
})
class ItemList extends Vue {
  items = []
  sName: string = ''
  sDescription: string = ''

  @nsStoreItem.Action
  actGetItemList!: (param: any) => Promise<any>

  async mounted() {
    this.GetItem()
  }
  async GetItem() {
    const param = {
      pageNum:  1,
      pageSize: 10,
      orderBy: 'id',
    }
    const response = await this.actGetItemList(param)
    if (response) {
      this.items = response.records
    }
  }
}
export default ItemList
</script>

<style lang="sass" scoped>
.box-page-container
  height: calc(100vh - 100px)

.element
  @include overflow-ellipsis(400px)
</style>