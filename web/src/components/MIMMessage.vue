<template>
    <ConfigProvider :theme="theme">
        <NavBar :title="`websocket,当前在线${socket.$state.userCount}人`" />
        <div class="message-box">
            <IMMessage></IMMessage>
        </div>
    </ConfigProvider>
</template>
    
<script setup lang='ts'>
import IMMessage from './IMMessage.vue';
import { NavBar, ConfigProvider } from 'vant';
import { onMounted, ref } from 'vue';
import { useSocketStore } from '@/store/useSocketStore';
const socket = useSocketStore();
const theme = ref('light');
onMounted(()=>{
    theme.value = 'dark';
})
</script>
    
<style lang="less" scoped>
.message-box{
    height: calc(~'100vh - 46px');
}
</style>