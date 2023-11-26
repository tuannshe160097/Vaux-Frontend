import * as signalR from "@microsoft/signalr";
import { Plugin } from '@nuxt/types'
export default ({ app }:any) => {
  // Lấy giá trị token từ cookie
  const loginToken = app.$cookies.get('auth._token');

  // Khởi tạo kết nối SignalR với token
  const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:6565/vauxchathub", { accessTokenFactory: () => loginToken })
    .build();

  const start = async () => {
    try {
      await connection.start();
      console.log("Connected to SignalR hub");
    } catch (error) {
      console.log(error);
    }
  };

//   const joinUser = async () => {
//     const roomname = "ItemApplication_id5";
//     if (roomname) {
//       sessionStorage.setItem('room', roomname);
//       // Ở đây, bạn cần thay thế giá trị 9999 bằng giá trị thích hợp
//       await joinChat(roomname, 9999);
//     }
//   };

//   const joinChat = async (roomname:any, userId:any) => {
//     if (!roomname)
//       return;
//     try {
//       await connection.invoke("JoinRoom", roomname, userId);
//       console.log("Room Joined " + roomname);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const receiveMessage = async () => {
//     try {
//       await connection.on("VauxItemMessage", (user, message) => {
//         console.log(user);
//         console.log(message);
//         appendMessage(user + `: ` + message);
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const appendMessage = (message:any, messageClass:any) => {
//     const messageSectionEl = document.getElementById('messageSection');
//     const msgBoxEl = document.createElement("div");
//     msgBoxEl.classList.add("msg-box");
//     msgBoxEl.classList.add(messageClass);
//     msgBoxEl.innerHTML = message;
//     messageSectionEl.appendChild(msgBoxEl);
//   };

//   document.getElementById('btnSend').addEventListener('click', async (e) => {
//     e.preventDefault();
//     const txtMessageEl = document.getElementById('txtMessage');
//     const msg = txtMessageEl.value;
//     if (msg) {
//       await sendMessage(msg);
//       txtMessageEl.value = "";
//     }
//   });

//   const sendMessage = async (message) => {
//     var formData = new FormData();
//     formData.append("SenderId", 2);
//     formData.append("ReceiverId", 1002);
//     formData.append("ItemId", 5);
//     formData.append("Content", "");
//     formData.append("RawImage", $("#txtMessage")[0].files[0]);
//     $.ajax({
//       url: "https://localhost:6565/api/Chat/Send",
//       method: "POST",
//       processData: false,
//       contentType: false,
//       data: formData,
//     });
//   };

  const startApp = async () => {
    await start();
    // await joinUser();
    // await receiveMessage();
  };

  startApp();
};