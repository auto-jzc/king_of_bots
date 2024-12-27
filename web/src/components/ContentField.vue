<!--为了实现全局修改，开一个组件，只需要改这里就行-->
<template>
    <div class="container content-field">
        <div class="card">
            <div class="card-body">
                <!-- <slot> 是子组件中的一个占位符，表示父组件传递过来的内容会被渲染到这里。 -->
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
 
</script>
 
<style scoped>
div.content-field{
    margin-top: 20px;  /*实现边框页面自动20边距 */
}
 
</style>