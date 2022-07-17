import { createApp } from "vue";
import App from "./App.vue";
import './style.css'
import VueNativeSock from "vue-native-websocket-vue3";
import { useSocketStoreWithOut } from "./store/useSocketStore";
import { ConfigProvider } from 'vant';
import 'vant/lib/index.css';

const app = createApp(App);
const piniaSocketStore = useSocketStoreWithOut();
app.mount("#app");
app.use(ConfigProvider);
// 使用VueNativeSock插件，并进行相关配置
app.use(
  VueNativeSock,
  `ws://localhost:3301`,
  {
    // 启用pinia集成 | enable pinia integration
    store: piniaSocketStore,
    // 数据发送/接收使用使用json
    format: "json",
    // 开启手动调用 connect() 连接服务器
    connectManually: true,
    // 开启自动重连
    reconnection: true,
    // 尝试重连的次数
    reconnectionAttempts: 5,
    // 重连间隔时间
    reconnectionDelay: 3000
  }
);
export default app;