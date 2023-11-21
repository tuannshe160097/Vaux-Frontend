<template>
    <h1>Item</h1>
</template>
  
<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import CreateAuction from '~/components/dialog/CreateAuction.vue'
import { getDateFormat } from '~/utils/commons/helper'
const nsStoreAuction = namespace('auction/store-auction')
const dayjs = require('dayjs')

@Component({
    layout: 'public',
    components: {
        CreateAuction
    },
    meta: { isPublic: true }
})
class EditAuctionList extends Vue {
    startDate: any = null
    endDate: any = null
    displayAddItem: boolean = false
    selectedItemsApproved: any = []

    @nsStoreAuction.Action
    actGetAuctionById!: (params: any) => Promise<any>

    @nsStoreAuction.Action
    actUpdateAuction!: (params: any) => Promise<any>

    async mounted() {
        const itemId = this.$route?.params?.id
        console.log('LTA: ', itemId)
    }

    openModelAddItem() {
        this.displayAddItem = true
    }

    addItemApproved(items: any) {
        this.selectedItemsApproved = [...items]
        this.displayAddItem = false
    }

    async onDeleteItem(row: any) {
        if (!this.selectedItemsApproved || !this.selectedItemsApproved.length) {
            return
        }
        this.selectedItemsApproved = [...this.selectedItemsApproved.filter((item: any) => item.id !== row.id)]
    }

    validateThrowMessage() {
        if (!this.startDate || !this.endDate) {
            return 'Vui lòng nhập đầy đủ thông tin thời gian'
        }
        if (!this.selectedItemsApproved || !this.selectedItemsApproved.length) {
            return 'Vui lòng thêm sản phẩm'
        }
    }

    async onEditAuction() {
        const msg = this.validateThrowMessage()
        if (msg) {
            this.$toast.add({
                severity: 'error',
                summary: 'Thông báo lỗi',
                detail: msg,
                life: 3000,
            })
            return
        }

        const response = await this.actUpdateAuction({
            id: this.$route?.params?.id,
            startDate: getDateFormat(this.startDate),
            endDate: getDateFormat(this.endDate),
            itemIds: this.selectedItemsApproved.map((item: any) => item.id)
        })

        if (response) {
            this.$toast.add({
                severity: 'success',
                summary: 'Thông báo thành công',
                detail: 'Cập nhật phiên đấu giá thành công',
                life: 3000,
            })
            this.$router.push('/admin/auction')
        }
    }

}
export default EditAuctionList
</script>
  
<style lang="sass" scoped>
  .edit-auction-page
    height: calc(100vh - 100px)
  
  .element
    @include overflow-ellipsis(400px)
  </style>
  