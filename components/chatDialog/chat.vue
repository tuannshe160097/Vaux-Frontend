<template>
  <div id="body">
    <div id="chat-circle" ref="chatCircle" class="btn btn-raised" :class="{ 'hidden': !isHiddenChat }"
      @click="onChatCircleClick()">
      <i class="material-icons">🗨️</i>
    </div>
    <div class="chat-box" :class="{ 'hidden': isHiddenChat }">
      <div class="chat-box-header" ref="chatBox" @click="onChatBoxToggleClick()">
        {{ labelHeader }}
        <span class="chat-box-toggle"><i class="material-icons">_</i></span>
      </div>
      <div class="chat-box-body">
        <div class="chat-box-overlay">
        </div>
        <div class="chat-logs" ref="chatLogs">
          <div v-for="message in messages" :key="message.id" :class="['chat-msg', message.type]">
            <span class="msg-avatar">
              <!-- <img src="https://localhost:6565/api/item/5/images/55" /> -->
            </span>
            <div v-if="!message.imgId" class="cm-msg-text">{{ message.text }}</div>
            <div v-else class="cm-msg-img">
              <div style="max-height: 200px; width: 100%;">
                <img :src="message.imgUrl" style="max-height: 200px;max-width: 100%; object-fit: contain" />
              </div>
            </div>
          </div>
        </div>
        <!--chat-log -->
      </div>
      <div class="flex">
        <input @change="onUploadFile($event)" id="inputFile" type="file" class="hidden" style="display: none;" />
        <label class="chat-file" for="inputFile" style="z-index: 1000;">
          <span class="cursor-pointer material-icons">
            attach_file
          </span>
        </label>
        <input v-model="msg" type="text" class="flex-1" id="chat-input" @keyup.enter="onChatSubmitClick()"
          placeholder="Send a message..." />
        <!-- <Button class="chat-submit"> -->
        <span @click="onChatSubmitClick()" class="chat-submit cursor-pointer material-icons">
          send
        </span>
        <!-- </Button> -->
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import { Component, Vue, Prop, namespace, Watch } from 'nuxt-property-decorator'
const nsStoreItem = namespace('item/store-item')
import * as signalR from "@microsoft/signalr"
const nsStoreChat = namespace('chat/store-chat')

@Component
class Chat extends Vue {
  @Prop() labelHeader!: string;
  @Prop() curUserId!: any;
  @Prop() curItemId!: any;

  isHiddenChat: boolean = true
  msg: string = ''
  INDEX: number = 0
  messages: any[] = []
  connection: any
  @nsStoreChat.Action
  actSendChat!: (param: any) => Promise<any>
  @nsStoreChat.Action
  actGetChatHistory!: (param: any) => Promise<any>
  @nsStoreChat.Action
  actGetImageChat!: (param: any) => Promise<any>

  async created() {
    const loginToken = this.$cookies.get('auth._token');
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:6565/vauxchathub", { accessTokenFactory: () => loginToken })
      .build();
    await this.start()
    await this.joinChatRoom();
    await this.receiveMessage();
  }
  async mounted() {
    const param = {
      itemId: this.curItemId,
    }
    console.log('this.curItemId', this.curItemId)
    const result = await this.actGetChatHistory(param)
    if (result) {
      await result.records.forEach((record: any) => {
        this.generate_message(record.content, record.imageId, record.senderId, record.sender, record.created);
      });
      this.scrollToBottom();
      console.log(result)
    }
  }
  async start() {
    try {
      await this.connection.start();
      console.log("Connected to signal r hub");
    } catch (error) {
      console.log(error);
    }
  }
  async joinChatRoom() {
    const roomname = "ItemApplication_id" + this.curItemId;
    if (roomname) {
      sessionStorage.setItem('room', roomname);
      // here user will join the chat
      await this.joinChat(roomname);
    }
  }
  async joinChat(roomname: any) {
    if (!roomname)
      return;
    try {
      console.log('log: ', roomname)
      await this.connection.invoke("JoinRoom", roomname, parseInt(this.curItemId));
      console.log("Room Joined " + roomname)
    } catch (error) {
      console.log(error);
    }
  }
  async receiveMessage() {
    try {
      await this.connection.on("VauxItemMessage", (user: any, message: any) => {
        console.log('sser', user);
        console.log('mess', message);
        console.log("check")
        this.generate_message(message.content, message.imageId, message.senderId, message.sender, message.created);
      })
    } catch (error) {
      console.log(error);
    }
  }
  async sendMessage(message: any) {
    var formData = new FormData();
    console.log(this.curUserId);
    formData.append("SenderId", this.curUserId);
    // formData.append("ReceiverId", '1002');
    formData.append("ItemId", this.curItemId);
    formData.append("Content", message);
    formData.append("RawImage", '$("#txtMessage")[0].files[0]');
    const param = {
      formdata: formData,
      itemId: this.curItemId,
    }
    console.log("check")
    await this.actSendChat(param)
  }
  async onUploadFile(event: any) {
    const inputElement = event.target as HTMLInputElement
    const files = inputElement.files
    let file: any
    let fileUrl: any
    if (files && files.length > 0) {
      if (files[0].size / 1024 / 1024 > 20) {
        this.$store.commit(
          'commons/store-error/setError',
          'File tải lên quá lớn'
        )
        return
      }
      file = files[0]
      fileUrl = URL.createObjectURL(file)
    }
    var formData = new FormData();
    console.log(this.curUserId);
    formData.append("SenderId", this.curUserId);
    formData.append("ItemId", this.curItemId);
    formData.append("RawImage", file);
    const param = {
      formdata: formData,
      itemId: this.curItemId,
    }
    console.log("check")
    await this.actSendChat(param)
  }
  async onChatSubmitClick() {
    const msg = this.msg
    if (this.msg.trim() == '') {
      return false;
    }
    await this.sendMessage(msg);
    this.msg = ''
    this.scrollToBottom();
  }
  async generate_message(msg: string, imgId: number, senderId: number, senderName: string, sendDate: string) {
    this.INDEX++;
    const type = senderId == this.curUserId ? 'self' : 'user'
    let imgUrl: any = ''
    if (imgId) {
      imgUrl = await this.getImageUrl(imgId)
    }
    const newMessage = {
      id: this.INDEX,
      text: msg,
      imgId: imgId,
      imgUrl: imgUrl,
      type: type,
      name: senderName,
      date: sendDate
    };
    await this.messages.push(newMessage);
    this.scrollToBottom();
  }
  async getImageUrl(imgId: any): Promise<string | ArrayBuffer | null> {
    try {
      const response = await this.actGetImageChat({ itemId: this.curItemId, imageId: imgId });
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onloadend = () => {
          const base64Image = reader.result;
          resolve(base64Image);
        };
      });
    } catch (error) {
      console.error("Error fetching or converting image:", error);
      return '';
    }
  }
  async onChatCircleClick() {
    this.isHiddenChat = !this.isHiddenChat
    if (!this.isHiddenChat) {
      this.scrollToBottom(); // Thêm cuộc gọi scrollToBottom khi hộp chat được mở
    }
  }
  onChatBoxToggleClick() {
    this.isHiddenChat = !this.isHiddenChat
    if (!this.isHiddenChat) {
      this.scrollToBottom(); // Thêm cuộc gọi scrollToBottom khi hộp chat được mở
    }
  }
  scrollToBottom() {
    this.$nextTick(() => {
      const chatLogs = this.$refs.chatLogs as HTMLElement;
      if (chatLogs) {
        chatLogs.scrollTop = chatLogs.scrollHeight;
      }
    });
  }
}
export default Chat
</script>
  
<style lang="sass" scoped>

#chat-circle
  position: fixed
  bottom: 50px
  right: 50px
  background: $primary
  width: 80px
  height: 80px
  border-radius: 50%
  color: white
  padding: 28px
  cursor: pointer
  box-shadow: 0px 3px 16px 0px rgba(0, 0, 0, 0.6), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)

.chat-box
  display: block
  background: #efefef
  position: fixed
  right: 30px
  bottom: 50px
  width: 350px
  max-width: 85vw
  max-height: 100vh
  border-radius: 10px
  box-shadow: 0px 3px 16px 0px rgba(0, 0, 0, 0.6), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)

.chat-box-toggle
  float: right
  margin-right: 15px
  cursor: pointer

.chat-box-header
  background: $primary
  height: 70px
  border-top-left-radius: 10px
  border-top-right-radius: 10px
  color: white
  text-align: center
  font-size: 20px
  padding-top: 17px

.chat-box-body
  position: relative
  height: 370px
  height: auto
  border: 1px solid #ccc
  overflow: hidden

#chat-input
  background: #f4f7f9
  width: 100%
  position: relative
  height: 47px
  padding-top: 10px
  padding-right: 50px
  padding-bottom: 10px
  padding-left: 45px
  border: none
  resize: none
  outline: none
  border: 1px solid #ccc
  color: #888
  border-top: none
  border-bottom-right-radius: 10px
  border-bottom-left-radius: 10px
  overflow: hidden

.chat-submit
  position: absolute
  bottom: 3px
  right: 10px
  background: transparent
  box-shadow: none
  border-radius: 50%
  color: $primary
  width: 35px
  height: 35px

.chat-file
  position: absolute
  bottom: 3px
  left: 10px
  background: transparent
  box-shadow: none
  border-radius: 50%
  color: $primary
  width: 35px
  height: 35px

.chat-logs
  padding: 15px
  height: 370px
  overflow-y: scroll

  &::-webkit-scrollbar-track
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3)
    background-color: #F5F5F5

  &::-webkit-scrollbar
    width: 5px
    background-color: #F5F5F5

  &::-webkit-scrollbar-thumb
    background-color: $primary

@media only screen and (max-width: 500px)
  .chat-logs
    height: 40vh

.chat-msg
  &.user > .msg-avatar img
    width: 45px
    height: 45px
    border-radius: 50%
    float: left
    width: 15%

  &.self > .msg-avatar img
    width: 45px
    height: 45px
    border-radius: 50%
    float: right
    width: 15%

.cm-msg-text
  background: white
  padding: 10px 15px 10px 15px
  color: #666
  max-width: 75%
  float: left
  margin-left: 10px
  position: relative
  margin-bottom: 20px
  border-radius: 30px
.cm-msg-img
  background: white
  max-width: 75%
  float: left
  margin-left: 10px
  position: relative
  margin-bottom: 20px

.chat-msg
  clear: both

  &.self > .cm-msg-text
    float: right
    margin-right: 10px
    background: $primary
    color: white
  &.self > .cm-msg-img
    float: right
    margin-right: 10px
    background: $primary
    color: white
  </style>