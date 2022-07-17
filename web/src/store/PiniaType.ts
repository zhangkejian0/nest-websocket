export type SocketStore = {
    // 连接状态
    isConnected: boolean;
    // 消息内容
    message: string;
    // 重新连接错误
    reconnectError: boolean;
    // 心跳消息发送时间
    heartBeatInterval: number;
    // 心跳定时器
    heartBeatTimer: number;
    // 是否是移动端设备
    isMobile: boolean;
    // client
    client: Client,
    // 在线人数
    userCount: number,
    //输入框内容
    textareaValue: string;
    // 历史消息
    historyMessages: []
  };
  
  export type socketType = {
    $connect: () => void;
  };

type Client = {
  id: string
}