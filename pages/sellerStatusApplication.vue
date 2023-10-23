<template lang="pug">
.box-page-container.flex.flex-column
    h3 Thông tin người dùng
    .grid
        .col-4
          .card-control
            .card-header.font-medium.text-xl Ảnh Đại Diện
            .card-body.p-5.text-center
              img.rounded-circle.mb-2(src='http://bootdey.com/img/Content/avatar/avatar1.png' alt='')
              .small.font-italic.text-muted.mb-4 JPG or PNG no larger than 5 MB
              Button Chọn ảnh đại diện

          .card-control.mt-3
              .card-header.font-medium.text-xl Ảnh CCCD
              .card-body.p-5.text-center
                img.mb-2(src='http://bootdey.com/img/Content/avatar/avatar1.png' alt='')
                .small.font-italic.text-muted.mb-4 JPG or PNG no larger than 5 MB
                Button Chọn ảnh CCCD
    
        .col-8
          .card-control
            .card-header.font-medium.text-xl Thông tin tài khoản
            .card-body.p-5
              .field
                  label Tên
                  input.text-base.text-color.surface-overlay.p-2.border-1.border-solid.surface-border.border-round.appearance-none.outline-none.w-full(
                  type='text',
                  class='focus:border-primary'
              )
              .field
                label Giới tính
                .field-radiobutton
                  RadioButton(name='gender' value='Chicago' v-model='gender')
                  label Nam
                .field-radiobutton
                  RadioButton(name='gender' value='Los Angeles' v-model='gender')
                  label Nữ
              .field
                label Năm sinh
                br 
                Calendar.surface-overlay(v-model="date" dateFormat="dd/mm/yy")      
              .field
                  label Số điện thoại
                  input.text-base.text-color.surface-overlay.p-2.border-1.border-solid.surface-border.border-round.appearance-none.outline-none.w-full(
                  type='text',
                  class='focus:border-primary'
              )
              .field
                  label Email
                  input.text-base.text-color.surface-overlay.p-2.border-1.border-solid.surface-border.border-round.appearance-none.outline-none.w-full(
                  type='text',
                  class='focus:border-primary'
              )
              .field
                label Số CCCD
                input.text-base.text-color.surface-overlay.p-2.border-1.border-solid.surface-border.border-round.appearance-none.outline-none.w-full(
                  type='text',
                  class='focus:border-primary'
              )
              .field
                label Địa chỉ
                input.text-base.text-color.surface-overlay.p-2.border-1.border-solid.surface-border.border-round.appearance-none.outline-none.w-full(
                  type='text',
                  class='focus:border-primary'
                )
              .field
                label Trạng thái
                input.text-base.text-color.surface-overlay.p-2.border-1.border-solid.surface-border.border-round.appearance-none.outline-none.w-full(
                  type='text',
                  class='focus:border-primary'
              )
              .field
                label Ngày tạo
                input.text-base.text-color.surface-overlay.p-2.border-1.border-solid.surface-border.border-round.appearance-none.outline-none.w-full(
                  type='text',
                  class='focus:border-primary'
              )
              .field
                label Ngày cập nhật
                input.text-base.text-color.surface-overlay.p-2.border-1.border-solid.surface-border.border-round.appearance-none.outline-none.w-full(
                  type='text',
                  class='focus:border-primary'
              )
              .field
                label Lý do tạo đơn
                input.text-base.text-color.surface-overlay.p-2.border-1.border-solid.surface-border.border-round.appearance-none.outline-none.w-full(
                  type='text',
                  class='focus:border-primary'
              )
              .field
                label Lý do phê duyệt/từ chối
                input.text-base.text-color.surface-overlay.p-2.border-1.border-solid.surface-border.border-round.appearance-none.outline-none.w-full(
                  type='text',
                  class='focus:border-primary'
              )
              .field 
                Button.m-7 Đồng ý
                Button.m-7 Từ chối
</template>
      
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'


@Component
class createAdmin extends Vue {

}
export default createAdmin
</script>

<style lang="sass" scoped>
.card-control
  display: block
  background: $color-white
  font-weight: 1
  font-size: 0.875rem
  line-height: 1
  color: #69707a
  background-clip: padding-box
  border: 1px solid #c5ccd6
  appearance: none
  border-radius: 0.35rem
.card-header
  padding: 1.2rem 1.35rem
  margin-bottom: 0
  background-color: rgba(33, 40, 50, 0.03)
  border-bottom: 1px solid rgba(33, 40, 50, 0.125)
.rounded-circle
  border-radius: 50% !important

</style>
            