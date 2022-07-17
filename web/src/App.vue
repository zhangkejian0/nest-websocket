<template>
    <div class="im-main" v-if="!isMobile">
      <div class="operation">
        <IMOperation></IMOperation>
      </div>
      <div class="users">
        <IMUser></IMUser>
      </div>
      <div class="message">
        <IMMessage></IMMessage>
      </div>
    </div>
    <div class="im-main-mobile" v-else>
      <MIMMessage></MIMMessage>
    </div>
</template>
  
<script setup lang='ts'>
import IMOperation from './components/IMOperation.vue';
import IMUser from './components/IMUser.vue';
import IMMessage from './components/IMMessage.vue';
import MIMMessage from './components/MIMMessage.vue';
import { ComponentInternalInstance, getCurrentInstance, onMounted, ref } from 'vue';
import { useSocketStore } from './store/useSocketStore';
const ws = import.meta.env.VITE_GLOB_WEBSOCKET_URL;
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const socket = useSocketStore();
const isMobile = ref(false);
const connect = ()=>{
  proxy.$connect(`${ws}/${socket.$state.client.id}`);
}

const disconnect = ()=>{
  proxy.$disconnect();
}

const init = ()=>{
  isMobile.value = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
  socket.CHANAGE_ISMOBILE(isMobile.value)
  connect();
}

onMounted(()=>{
  setTimeout(() => {
    init()
  });
})
</script>
  
<style lang="less" scoped>
.im-main{
  width: 820px;
  height: 800px;
  margin: auto;
  background: var(--dark-background1);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  box-shadow: 10px 10px 30px var(--dark-background1);
  display: flex;
  .operation{
    width: 60px;
    background: var(--dark-background2);
  }
  .users{
    width: 260px;
    background: var(--dark-background3);
  }
  .message{
    flex: 1;
  }
}
</style>