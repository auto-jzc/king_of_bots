<template>
    <div ref="parent" class="gamemap">
        <!-- 加上这个属性tabindex="0"，就可以读取键盘输入了 -->
        <canvas ref="canvas" tabindex="0">
        </canvas>
    </div>
</template>
 
<script>
import { GameMap } from "@/assets/scripts/GameMap.js"
import { ref, onMounted } from 'vue'
 
export default {
    setup:() => {
        let parent = ref(null);
        let canvas = ref(null);
 
        onMounted(() => {
            new GameMap(canvas.value.getContext('2d'), parent.value);
        })
        return {
            parent,
            canvas
        }
    }
}
 
</script>
 
<style scoped>
 
div.gamemap {
    width: 100%;
    height: 100%;
    display: flex;/* 设置弹性布局，水平和垂直居中布局。 */
    justify-content: center;/* 水平居中 */
    align-items: center;/* 垂直居中 */
}
</style>