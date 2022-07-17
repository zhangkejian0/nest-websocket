<template>
    <div class="user">
        人员关系，龇牙编码中...
        <div>
            当前在线人数：<i>{{socket.$state.userCount}}</i>
        </div>
        <div>
            你的身份id
            <div><i>{{socket.$state.client.id}}</i></div>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
import { useSocketStore } from '@/store/useSocketStore';
const socket = useSocketStore();
</script>
    
<style lang="less" scoped>
.user{
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    b{
        font-size: 20px;
        font-weight: bolder;
    }
}
</style>