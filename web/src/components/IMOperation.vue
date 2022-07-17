<template>
    <div class="header">
        <i></i>
        <i></i>
        <i></i>
    </div>
    <div class="fn">
        <div>
            <img src="https://ts1.cn.mm.bing.net/th?id=OIP-C.QPH1IBosDYBqaU3O6wV3YAHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2" alt="">
        </div>
    </div>
</template>
    
<script setup lang='ts'>
    
</script>
    
<style lang="less" scoped>
.header{
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    >i{
        width: 10px;
        height: 10px;
        background: red;
        border-radius: 50%;
        display: inline-block;
        margin: 0 3px;
        &:nth-of-type(1){
            background: #ff5f57;
        }
        &:nth-of-type(2){
            background: #febc31;
        }
        &:nth-of-type(3){
            background: #27c841;
        }
    }
}
.fn{
    width: 100%;
    padding: 30px 0;
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    align-items: center;
    >div{
        width: 46px;
        height: 46px;
        border-radius: 5px;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>