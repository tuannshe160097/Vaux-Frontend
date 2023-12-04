<template>
  <div class="grid nested-grid">
    <div class="col-12 text-brown">
      Giá hiện tại
    </div>
    <div class="col-12">
      <h1>{{ formatNumber(curBid) }}</h1>
    </div>
    <div v-if="reservePrice <= curBid" class="col-12 text-brown">
      Đã đạt mức giá tối thiểu
    </div>
    <div v-else class="col-12 text-brown">
      Chưa đạt mức giá tối thiểu
    </div>
    <div class="col-12 mt-3  border-bottom-1" style="border-color: #E0A26F;">
      <div v-if="user" class="grid">
        <div class="col-4">
          <button @click="BidOption(curBid + 100000)" class="p-3 btn-second border-10 w-full">{{ formatNumber(curBid +
            100000)
          }}</button>
        </div>
        <div class="col-4">
          <button @click="BidOption(curBid + 200000)" class="p-3 btn-second border-10 w-full">{{ formatNumber(curBid +
            200000)
          }}</button>
        </div>
        <div class="col-4">
          <button @click="BidOption(curBid + 300000)" class="p-3 btn-second border-10 w-full">{{ formatNumber(curBid +
            300000)
          }}</button>
        </div>
        <div class="col-12">
          <InputNumber class="w-full this-p-inputtext-p-4" v-model="priceBid"
            :placeholder="`${formatNumber(curBid + 10000)} hoặc cao hơn`">
          </InputNumber>
        </div>
        <div class="col-12">
          <button class="p-3 btn-primary border-10 w-full" @click="postBids()">Đấu giá</button>
        </div>
      </div>
      <div v-else>
        <div class="font-bold text-center">
          Vui lòng đăng nhập để tham gia đấu giá
        </div>
      </div>
    </div>
    <div class="col-12" v-if="bids.length > 0">
      <div class="text-brown mb-1">Lịch sử đấu giá</div>
      <table class="w-full" style="  border-collapse: collapse;  border-spacing: 0;">
        <tr v-for="bid in bids" :key="bid.id">
          <td class="p-0 pe-2"> Người tham gia {{ bid.userId }}</td>
          <td class="px-2">{{ formatDistanceToNow(bid.time) }}</td>
          <td class="text-right ps-2">{{ formatNumber(bid.price) }}</td>
        </tr>
      </table>
    </div>
    <div class="col-12" v-else>
      <div class="text-center font-bold  mb-1">Chưa có ai tham gia đấu giá</div>
    </div>
  </div>
</template>
  
<script lang="ts">
import { Component, Vue, Prop, namespace, Watch } from 'nuxt-property-decorator'
import { User } from '~/models/User'
const nsStoreItem = namespace('item/store-item')
const nsStoreUser = namespace('user-auth/store-user')
import * as signalR from "@microsoft/signalr"

@Component
class BidDialog extends Vue {
  @Prop() curItemId!: any;
  @Prop() reservePrice!: any;

  curBid: any = 0
  priceBid: any = null
  bids: any[] = [
    // { id: 1, name: 'Lương Thị Kiểm Định Viên Thị Kiểm Định Viên', time: '2023-11-23T17:56', price: 1200000 },
    // { id: 2, name: 'Lương Tiến Anh', time: '2023-11-23T16:45', price: 1500000 },
    // { id: 3, name: 'Lương Tiến Anh', time: '2023-11-23T16:34', price: 1200000 },
    // { id: 4, name: 'Lương Tiến Anh', time: '2023-11-23T16:23', price: 120000 },
    // { id: 5, name: 'Lương Tiến Anh', time: '2023-11-23T16:11', price: 12000 }
  ]
  @nsStoreItem.Action
  actGetItemBids!: (params: any) => Promise<any>
  @nsStoreItem.Action
  actAddItemBids!: (params: any) => Promise<any>
  @nsStoreItem.Action
  actGetItem!: (params: any) => Promise<any>
  connection: any
  @nsStoreUser.State('user')
  user!: User.Model | undefined

  async created() {
    const loginToken = this.$cookies.get('auth._token');
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:6565/bidhub", { accessTokenFactory: () => loginToken })
      .build();
    await this.start()
    await this.joinBidRoom();
    await this.receiveMessage();
  }
  async mounted() {
    await this.getItemInfo()
    await this.getBids()
    this.getBids()
  }
  async start() {
    try {
      await this.connection.start();
      console.log("Connected to bid hub");
    } catch (error) {
      console.log(error);
    }
  }
  async joinBidRoom() {
    const roomname = "item_bid_" + this.curItemId;
    if (roomname) {
      sessionStorage.setItem('room', roomname);
      // here user will join the chat
      await this.joinBid(roomname);
    }
  }
  async joinBid(roomname: any) {
    if (!roomname)
      return;
    try {
      await this.connection.invoke("JoinBid", parseInt(this.curItemId, 10));
      console.log("Room Joined " + roomname)
    } catch (error) {
      console.log(error);
    }
  }
  async receiveMessage() {
    try {
      const roomname = "item_bid_" + this.curItemId;
      await this.connection.on(roomname, (bid: any, amount: any) => {
        this.curBid = amount
        this.getBids()
      })
    } catch (error) {
      console.log(error);
    }
  }
  async getItemInfo() {
    const params = {
      itemId: this.curItemId
    }
    const response = await this.actGetItem(params)
    if (response) {
      this.reservePrice = response.reservePrice
      this.curBid = 0
      if (response.highestBid) {
        this.curBid = response.highestBid.amount
      }
    }
  }
  async getBids() {
    const params = {
      itemId: this.curItemId
    }
    const response = await this.actGetItemBids(params)
    if (response && response.records.length > 0) {
      this.bids = []
      for (let i = response.records.length - 1; i >= 0; i--) {
        const bid = response.records[i];
        this.bids.push({
          id: bid.index,
          name: bid.user.name,
          userId: bid.user.id,
          price: bid.amount,
          time: bid.created,
        });
      }
    }
  }
  async postBids() {
    const params = {
      itemId: this.curItemId,
      real: {
        amount: this.priceBid
      }
    }
    const response = await this.actAddItemBids(params)
    if (response.status == 200) {
      this.$toast.add({
        severity: 'success',
        summary: 'Thành công',
        detail: "Đã đấu giá thành công",
        life: 5000
      })
    }
  }
  BidOption(amount: any) {
    this.priceBid = amount
    this.postBids()
  }
  formatNumber(number: any) {
    const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedNumber + " vnđ";
  }
  formatDistanceToNow(timeString: any) {
    const currentTime: any = new Date();
    const targetTime: any = new Date(timeString);

    const timeDifference = currentTime - targetTime;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} ngày trước`;
    } else if (hours > 0) {
      return `${hours} giờ trước`;
    } else if (minutes > 0) {
      return `${minutes} phút trước`;
    } else {
      return `${seconds>10 ? seconds : 'vài'} giây trước`;
    }
  }
}
export default BidDialog
</script>
  
<style lang="sass" scoped>

  </style>