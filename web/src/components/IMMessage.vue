<template>
    <div class="message-main" :class="{isMobile: socket.$state.isMobile}">
        <div class="historical-news">
            <template v-for="(item,index) in socket.$state.historyMessages" :key="index">
                <div class="news right" v-if="item.user.id === socket.$state.client.id">
                    <div class="massage">
                        {{item.data}}
                    </div>
                    <img src="https://ts1.cn.mm.bing.net/th?id=OIP-C.QPH1IBosDYBqaU3O6wV3YAHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2" class="avatar">
                </div>
                <div class="news" v-else>
                    <img src="https://ts1.cn.mm.bing.net/th?id=OIP-C.QPH1IBosDYBqaU3O6wV3YAHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2" class="avatar">
                    <div class="massage">
                        {{item.data}}
                        <div class="clientId">--来自: {{item.user.id}}</div>
                    </div>
                </div>
            </template>
        </div>
        <div class="text-box">
            <textarea v-model="socket.$state.textareaValue" @keydown="sendMessage" placeholder="请输入内容，按回车发送"></textarea>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
import { useSocketStore } from '@/store/useSocketStore';
import { ComponentInternalInstance, getCurrentInstance, ref } from 'vue';
const socket = useSocketStore();

const sendMessage =(e: KeyboardEvent)=>{
    const { code, keyCode } = e;
    if(!socket.$state.textareaValue) return;
    if(keyCode === 13){
        socket.SOCKET_SEND();
        return
    }
    if(code === 'Enter'){
        socket.SOCKET_SEND();
        return
    }
}

</script>
    
<style lang="less" scoped>
.message-main{
    display: flex;
    flex-flow: column;
    height: 100%;
    .historical-news{
        height: 600px;
        overflow: auto;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        padding: 20px;
        box-sizing: border-box;
        .news{
            display: flex;
            margin-bottom: 16px;
            .avatar{
                width: 30px;
                height: 30px;
                border-radius: 5px;
                display: inline-block;
                overflow: hidden;
            }
            .massage{
                background-color: #2c2c2c;
                padding: 6px 6px;
                border-radius: 5px;
                margin-right: 10px;
                word-break: break-all;
                margin-left: 15px;
                display: inline-block;
                position: relative;
                line-height: normal;
                &:after {
                    content: '';
                    background: #2c2c2c;
                    width: 10px;
                    height: 10px;
                    border-bottom-left-radius: 2px;
                    top: 12px;
                    left:-5px;
                    position: absolute;
                    transform: rotate(45deg);
                }
                .clientId{
                    font-size: 12px;
                    color: #878787;
                }
            }
            &.right{
                justify-content: flex-end;
                .massage{
                    background-color: #28b561;
                    &:after {
                        content: '';
                        background-color: #28b561;
                        border-bottom-left-radius: 2px;
                        right: -5px;
                        left: auto;
                        position: absolute;
                        transform: rotate(45deg);
                    }
                }
            }
        }
        
    }
    .text-box{
        flex: 1;
        padding: 10px;
        box-sizing: border-box;
        textarea{
            border: 0;
            width: 100%;
            height: calc(~'100% ');
            resize: none;
            outline-style: none;
            background: none;
        }
    }
    &.isMobile{
        .historical-news{
            height: 60vh;
        }
    }
}
</style>