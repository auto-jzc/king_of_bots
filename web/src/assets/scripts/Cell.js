//Cell 类用于表示蛇身体的单元格
export class Cell {
    constructor(r, c) {
        //注意这里的r,c和x,y是反着的
        this.r = r;// 当前单元格所在的行
        this.c = c;// 当前单元格所在的列
        // 转换为 canvas 的坐标
        this.x = c + 0.5; // 中心点的 x 坐标（列号 + 0.5） 
        this.y = r + 0.5;// 中心点的 y 坐标（行号 + 0.5）
    }
}