<template lang="pug">
.category-page-container.flex.flex-column
    .grid.justify-content-between
      .col-fixed
        h1.font-bold.m-0.font-size-4xlarge.line-height-1 Danh sách thể loại
        span.text-600.font-size-small(v-if='boxData') {{ boxData.length }} tìm kiếm
      .col-fixed
        .grid
          .col-fixed
            span.p-input-icon-left
              .icon.icon--left.icon-research.surface-900
              InputText.w-21rem.h-3rem(type='text', placeholder='Tìm kiếm')
          .col-fixed
            Button.w-9rem.h-3rem(@click="openBasic")
              .icon--base.icon-plus.surface-900.bg-white
              span.text-900.ml-3.text-white Thêm Mới
  
    .grid.grid-nogutter.flex-1.relative.overflow-hidden
      .col.h-full.absolute.top-0.left-0.right-0
        DataTable.w-full.airtag-datatable.h-full.flex.flex-column(
          v-if='boxData',
          :value='boxData',
          responsiveLayout='scroll',
          :selection.sync='selectedBoxes',
          dataKey='id',
          :resizableColumns='true',
          :rows='20',
          :scrollable='false'
        )
          Column(field='id', header='SỐ', sortable)
            template(#body='slotProps')
              span.font-semibold {{ slotProps.index + 1 }}
          Column(
            field='code',
            header='Tên',
            sortable
          )
          Column(
            field='seller.email',
            header='Mô tả',
            sortable,
            className='w-3'
          )
          Column(
            field='status',
            header='TRẠNG THÁI',
            sortable,
            className='p-text-right'
          )
            template(#body='{ data }')
              div
                Tag.px-2.bg-green-100(v-if='data.status')(severity='success')
                  span.font-bold.text-green-400.font-size-small Đang hoạt động
                Tag.px-2.surface-200(v-else)(severity='success')
                  span.font-bold.text-400.font-size-small Dừng hoạt động
          Column(
            :exportable='false',
            header='Hoạt động',
            sortable,
            className='p-text-right'
          )
            template(#body='{ data }')
              Button.border-0.p-0.h-2rem.w-2rem.justify-content-center.surface-200(
                :disabled='!data.status'
              )
                .icon--small.icon-compose
              Button.border-0.p-0.ml-1.h-2rem.w-2rem.justify-content-center.surface-200(
                @click='deleteBoxById(data.id)',
                :disabled='!data.status'
              )
                .icon--small.icon-bin
          template(#footer)
            div
              .flex.align-items-center(v-if='selectedBoxes.length <= 0')
                .icon--large.icon-footer-paginator.surface-400
                span.ml-3.text-400.font-size-small Showing 01 - 100 of 1280
              Button.p-button-danger.opacity-70(@click='deleteBoxById(null)', v-if='selectedBoxes.length > 0')
                .icon--small.icon-delete.bg-white
                span.ml-3 Delete {{ selectedBoxes.length }} items selected
            Paginator.p-0(:rows='20', :totalRecords='totalItemsCount')

      Dialog(header='Thêm thể loại' :visible.sync='displayBasic' :containerstyle="{width: '500vw'}")
        .field
          label Tên
          input.text-base.text-color.surface-overlay.p-2.border-1.border-solid.surface-border.border-round.appearance-none.outline-none.w-full(
          type='text',
          class='focus:border-primary'
        )
        .field
          label Mô tả
          Textarea.w-full( v-model="value1" rows="15" cols="100")
        template(#footer='')
          Button.p-button-text(label="No" icon="pi pi-times" @click="closeBasic")
          Button(label="Thêm mới" icon='pi pi-check' @click='closeBasic' autofocus='') 
        </template>          
</template>
    
<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { Box } from '~/models/Box'
const nsStoreBox = namespace('box/store-box')

@Component
class BoxList extends Vue {
  selectedBoxes = []
  selectedWarehouse = null
  selectedSize = null
  selectedLocation = null
  isFilter = false
  dateFrom = null
  dateTo = null
  totalItemsCount = 50
  masterData = []
  displayBasic: boolean = false

  @nsStoreBox.State
  boxData!: Box.Model[]

  @nsStoreBox.Action
  actGetBoxData!: () => Promise<void>

  @nsStoreBox.Action
  actDeleteBoxById!: (params: any) => Promise<any>

  async mounted() {
    await this.actGetBoxData()
  }

  async deleteBoxById(id: any) {
    const ids = id ? [id] : this.selectedBoxes.map((box: Box.Model) => box.id)
    const result = await this.actDeleteBoxById({ ids })
    if (result) {
      await this.actGetBoxData()
    }
  }

  openBasic() {
    this.displayBasic = true;
  }

  closeBasic() {
    this.displayBasic = false;
  }
}
export default BoxList
</script>
  
<style lang="sass" scoped>
.category-page-container
  height: calc(100vh - 24px)
  ::v-deep.p-component
    font-family: $font-family-primary
    ::v-deep.pi-calendar:before
      content: url('~/assets/icons/calendar.svg')
    ::v-deep.p-calendar-w-btn
      .p-button
        background: none
        border: none
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
    