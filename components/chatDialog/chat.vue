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
                            <img
                                src="https://localhost:6565/api/item/5/images/55" />
                        </span>
                        <div class="cm-msg-text">{{ message.text }}</div>
                    </div>
                </div>
                <!--chat-log -->
            </div>
            <div class="chat-input">
                <input v-model="msg" type="text" id="chat-input"  @keyup.enter="onChatSubmitClick()" placeholder="Send a message..." />
                <button class="chat-submit" @click="onChatSubmitClick()"><i class="material-icons">send</i></button>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { Component, Vue, Prop, namespace, Watch } from 'nuxt-property-decorator'
const nsStoreItem = namespace('item/store-item')

@Component
class Chat extends Vue {
    @Prop() labelHeader!: string;
    @Prop() selectedItemsProp: any;

    isHiddenChat: boolean = true

    items = [];
    selectedItems: any = [];
    showModal = false;
    msg: string = ''
    INDEX: number = 0
    messages: any[] = []
    buttons: any[] = [
        { name: 'Existing User', value: 'existing' },
        { name: 'New User', value: 'new' }
    ]

    @nsStoreItem.Action
    actGetItemApproved!: () => Promise<any>;

    @Watch('isDisplayDialog')
    setShowModal() {
        this.selectedItems = [...this.selectedItemsProp];
        this.showModal = this.isDisplayDialog;
        if (this.isDisplayDialog) {
            this.getItemApproved();
        }
    }
    async onChatSubmitClick() {
        const msg = this.msg
        if (this.msg.trim() == '') {
            return false;
        }
        await this.generate_message(msg, 'self');
        await this.generate_message(msg, 'user');
        this.scrollToBottom();
    }
    generate_message(msg: string, type: string) {
        this.INDEX++;
        const newMessage = {
            id: this.INDEX,
            text: msg,
            type: type
        };
        this.messages.push(newMessage);

        // Các dòng code xử lý DOM đã được thay thế bằng việc cập nhật mảng messages
        if (type === 'self') {
            // Nếu là tin nhắn của người dùng, có thể xóa nội dung input
            // (Nếu muốn giữ nội dung, bạn có thể bỏ đoạn này)
            this.msg = ''
        }
    }
    onChatCircleClick() {
        // this.$nextTick(() => {
        //     const chatCircle = this.$refs.chatCircle as HTMLElement;
        //     const chatBox = this.$refs.chatBox as HTMLElement;

        //     chatCircle.style.transform = chatCircle.style.transform === 'scale(0)' ? 'scale(1)' : 'scale(0)';
        //     chatBox.style.transform = chatBox.style.transform === 'scale(0)' ? 'scale(1)' : 'scale(0)';
        // });
        this.isHiddenChat = !this.isHiddenChat
    }
    onChatBoxToggleClick() {
        // this.$nextTick(() => {
        //     const chatCircle = this.$refs.chatCircle as HTMLElement;
        //     const chatBox = this.$refs.chatBox as HTMLElement;

        //     chatCircle.style.transform = 'scale(0)';
        //     chatBox.style.transform = chatBox.style.transform === 'scale(0)' ? 'scale(1)' : 'scale(0)';
        // });
        this.isHiddenChat = !this.isHiddenChat
    }
    scrollToBottom() {
        const chatLogs = this.$refs.chatLogs as HTMLElement
        if (chatLogs)
            chatLogs.scrollTop = chatLogs.scrollHeight;
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
  padding-left: 15px
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

.chat-msg
  clear: both

  &.self > .cm-msg-text
    float: right
    margin-right: 10px
    background: $primary
    color: white


  </style>