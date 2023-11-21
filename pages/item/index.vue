<template>
  <section class="surface-0 flex align-items-center justify-content-center p-2">
    <div class="item-page-container flex flex-column w-full">
      <DataView :value="products" :layout="layout" :paginator="false" :rows="pPageSize" :sortOrder="sortOrder" :sortField="sortField">
        <template #header>
          <div class="grid grid-nogutter">
            <div class="col-9 flex" style="text-align: left">
              <InputText class="flex-1" v-model="searchText" placeholder="Nhập tên"></InputText>
              <Dropdown class="w-3 ml-2" v-model="sortCategoryKey" :options="sortOptions" dataKey="id" optionValue="id" optionLabel="name" placeholder="Category"/>
              <Button class="w-2 ml-2" label="Tìm kiếm" @click="getItem" />
            </div>
            <div class="col-3" style="text-align: right">
              <DataViewLayoutOptions v-model="layout" />
            </div>
          </div>
        </template>

        <template #list="slotProps">
          <div class="col-12">
            <div class="product-list-item">
              <ImagePreview :src="slotProps.data.thumbnailId || require('~/assets/images/default.jpg')" alt="Image"
                imageClass="w-max-100" imageStyle="object-fit: contain" />
              <div class="product-list-detail">
                <div class="product-name">{{slotProps.data.name}}</div>
                <div class="product-description">{{slotProps.data.description}}</div>
                <i class="pi pi-tag product-category-icon"></i><span class="product-category">{{slotProps.data.category.name}}</span>
              </div>
              <div class="product-list-action">
                <span class="product-price">${{slotProps.data.reservePrice}}</span>
                <Button class="mb-2" icon="pi pi-shopping-cart" label="Add to Cart"></Button>
                <span class="product-badge-status">{{slotProps.data.statusString}}</span>
              </div>
            </div>
          </div>
        </template>

        <template #grid="slotProps">
          <div class="col-12 md:col-4 lg:col-3">
            <div class="product-grid-item card">
              <div class="product-grid-item-top">
                <div>
                  <i class="pi pi-tag product-category-icon"></i>
                  <span class="product-category">{{slotProps.data.category.name}}</span>
                </div>
                <span class="product-badge-status">{{slotProps.data.statusString}}</span>
              </div>
              <div class="product-grid-item-content">
                <ImagePreview :src="slotProps.data.thumbnailId || require('~/assets/images/default.jpg')" alt="Image"
                  imageClass="w-max-100" imageStyle="object-fit: contain" />
                <div class="product-name">{{slotProps.data.name}}</div>
                <div class="product-description">{{slotProps.data.description}}</div>
              </div>
              <div class="product-grid-item-bottom">
                <span class="product-price">${{slotProps.data.reservePrice}}</span>
                <Button icon="pi pi-shopping-cart"></Button>
              </div>
            </div>
          </div>
        </template>
        <template #footer="">
          <Paginator
            class="p-0"
            :rows="pPageSize"
            :totalRecords="totalRecords"
            @page="onPage($event)"
          >
          </Paginator>
        </template>
    </DataView>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
const nsStoreItem = namespace('item/store-public-item')
const nsStoreCategory = namespace('category/store-category')

@Component({
    middleware: ['authenticate'],
    layout: 'public'
})
class ItemList extends Vue {

  products: any = null
  layout : any = 'grid'
  sortOrder : any = null
  sortField : any = null
  searchText: string = ''
  sortCategoryKey : any = null
  sortOptions: any = [{ id: '', name: '--------------' }]
  pPageNum: number = 1
  pPageSize: number = 12
  totalRecords: number = 0


  @nsStoreItem.Action
  actGetItem!: (param: any) => Promise<any>

  @nsStoreCategory.Action
  actGetCategory!: (params: any) => Promise<any>

  async mounted() {
    this.getItem()
    this.getCategory()
  }

  async getItem() {
    const param = {
      pageNum:  this.pPageNum,
      pageSize: this.pPageSize,
      search: this.searchText || '',
      category: this.sortCategoryKey || '',
    }
    const response = await this.actGetItem(param)
    if (response) {
      this.products = response?.records
      this.totalRecords = response.totalRecords
    }
  }

  async getCategory() {
    const response = await this.actGetCategory({
      pageNum: 1,
      pageSize: 1000,
      search: '',
    })
    if (response) {
      this.sortOptions = [
        { id: '', name: '--------------' },
        ...response.records
      ]
    }
  }

  onPage(event: any) {
    this.pPageNum = event.page + 1
    this.getItem()
  }

}
export default ItemList
</script>

<style lang="sass">
.item-page-container
  .p-dataview-content

    .product-grid-item
      margin: 0.5rem
      border: 1px solid #dee2e6

      .product-grid-item-top, .product-grid-item-bottom
        display: flex
        align-items: center
        justify-content: space-between
      
      .product-grid-item-top
        .product-badge-status
          background: #c8e6c9
          color: #256029
          border-radius: 2px
          padding: 0.25em 0.5rem
          text-transform: uppercase
          font-weight: 700
          font-size: 12px
          letter-spacing: .3px
          box-sizing: border-box

      .product-grid-item-bottom
        .product-price
          font-size: 1.5rem
          font-weight: 600
      
      .product-grid-item-content
        text-align: center

        img
          width: 75%
          box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23)
          margin: 1.5rem 0

        .product-name
          font-size: 1.5rem
          font-weight: 700
        
        .product-description
          margin: 0 0 1rem 0

    .card
      background: var(--surface-card)
      padding: 1rem
      border-radius: 10px

    .product-list-item
      display: flex
      align-items: center
      padding: 1rem
      width: 100%

      img
        width: 150px
        box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23)
        margin-right: 2rem

      .product-list-detail
        flex: 1 1 0

        .product-name
          font-size: 1.5rem
          font-weight: 700

        .product-description
          margin: 0 0 1rem 0

        .product-category-icon
          vertical-align: middle
          margin-right: 0.5rem

      .product-list-action
        display: flex
        flex-direction: column

        .product-price
          font-size: 1.5rem
          font-weight: 600
          margin-bottom: 0.5rem
          -ms-flex-item-align: end
          align-self: flex-end

        .product-badge-status
          background: #c8e6c9
          color: #256029
          border-radius: 2px
          padding: 0.25em 0.5rem
          text-transform: uppercase
          font-weight: 700
          font-size: 12px
          letter-spacing: .3px
          box-sizing: border-box

  .p-dataview-footer
    background: unset !important
</style>
