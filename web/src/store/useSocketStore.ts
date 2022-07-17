import { defineStore } from "pinia";
import { store } from "@/store";
import main from "@/main";
import { SocketStore } from "@/store/PiniaType";
import { getClientInfo, setClientInfo } from "@/utils/localStorage";

export const useSocketStore = defineStore({
  id: "socket",
  state: (): SocketStore => ({
    // 连接状态
    isConnected: false,
    // 消息内容
    message: "",
    // 重新连接错误
    reconnectError: false,
    // 心跳消息发送时间
    heartBeatInterval: 50000,
    // 心跳定时器
    heartBeatTimer: 0,
    // 是否为移动端设备
    isMobile: false,
    // 客户端信息
    client: getClientInfo(),
    // 在线人数
    userCount: 0,
    // 输入框内容
    textareaValue: '',
    // 历史消息
    historyMessages: [],
  }),
  actions: {
    // 连接打开
    SOCKET_ONOPEN(event: any) {
      console.log("successful websocket connection");
      main.config.globalProperties.$socket = event.currentTarget;
      this.isConnected = true;
      // 连接成功时启动定时发送心跳消息，避免被服务器断开连接
      this.heartBeatTimer = window.setInterval(() => {
        const message = "ping";
        this.isConnected &&
          main.config.globalProperties.$socket.sendObj({
            event: 'ping',
            data: message
          });
      }, this.heartBeatInterval);
    },
    // 连接关闭
    SOCKET_ONCLOSE(event: any) {
      this.isConnected = false;
      // 连接关闭时停掉心跳消息
      window.clearInterval(this.heartBeatTimer);
      this.heartBeatTimer = 0;
      console.log("连接已断开: " + new Date());
      console.log(event);
    },
    // 发生错误
    SOCKET_ONERROR(event: any) {
      console.error(event);
    },
    // 发送消息
    SOCKET_SEND(){
      this.isConnected &&
      main.config.globalProperties.$socket.sendObj({
        event: 'client_send',
        data: this.textareaValue
      });
    },
    // 收到服务端发送的消息
    SOCKET_ONMESSAGE(message: any) {
      this.message = message;
      const {event, data, time, user} = message;
      // console.log(`服务端消息：`, message)
      if(event === 'client_send_ok'){
        this.textareaValue = '';
      }
      if(event === 'client_info'){
        this.client.id = user.id;
        setClientInfo(this.client)
      }
      if(event === 'client_count'){
        this.userCount = data;
        setClientInfo(this.client)
      }
      if(event === 'broadcast'){
        this.historyMessages.push(message)
      }
    },
    // 自动重连
    SOCKET_RECONNECT(count: any) {
      console.info("消息系统重连中...", count);
    },
    // 重连错误
    SOCKET_RECONNECT_ERROR() {
      this.reconnectError = true;
    },
    // 重连错误
    CHANAGE_ISMOBILE(value) {
      this.isMobile = value;
    }
  }
});

// Need to be used outside the setup
export function useSocketStoreWithOut() {
  return useSocketStore(store);
}