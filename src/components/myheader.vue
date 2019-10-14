<template>
    <div class="header">
        <!-- 匿名插槽 -->
        <!-- 具名插槽 -->
        <!-- 作用域插槽 -->
        <slot name='left'></slot>
        <span>{{title}}</span>
        <!-- slot定义插槽 -->
        <span>
            <slot name="right"></slot>
        </span>
    </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang='less' scoped>
.header{
    display: flex;
    justify-content: space-between;
    line-height: 46px;
    padding: 0px 10px;
    background-color: rgb(240, 239, 239);
    border-bottom: 1px solid #ccc;
    span:nth-of-type(2){
        font-weight: bold;
    }
}
</style>
