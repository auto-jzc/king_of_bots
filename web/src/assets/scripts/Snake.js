import { AcGameObject } from "./AcGameObject";
import { Cell } from "./Cell";
 
 
export class Snake extends AcGameObject {
    //使用info的优点，如果以后需要为蛇增加更多属性（如速度、方向等），可以直接在 info 中添加，而不需要修改构造函数的参数列表。
    //使用对象传递参数，不需要严格记住参数的顺序，减少出错概率。
    constructor(info, gamemap) {
        super();
 
        this.id = info.id;// 取出基本的id，蛇的唯一标识
        this.color = info.color;// 蛇的颜色
        this.gamemap = gamemap; // 游戏地图对象，方便调用函数和参数
 
        //存放蛇的身体，起始时只有一个单元格
        //Snake 的 cells 数组存储了多个 Cell 对象。每个 Cell 表示蛇身体的一部分，包括蛇头、身体和尾巴。
        this.cells = [new Cell(info.r, info.c)];
        this.next_cell = null;  // 下一步的目标位置
        this.speed = 5; 

        this.direction = -1;//-1表示没有指令，0、1、2、3表示上右下左
        this.status ="idle";//idle表示静止 move表示正在移动 die表示死亡

        this.dr = [-1, 0, 1, 0]; //上右下左,行的偏移量
        this.dc = [0, 1, 0, -1]; //上右下左,列的偏移量
 
        this.step = 0;//表示回合数
        this.eps = 1e-2;  // 允许的误差

        this.eye_direction = 0;
        if (this.id === 1) this.eye_direction = 2;
 
        this.eye_dx = [
            [-1, 1],
            [1, 1],
            [1, -1],
            [-1, -1],
        ];
        this.eye_dy = [
            [-1, -1],
            [-1, 1],
            [1, 1],
            [1, -1],
        ];
    }
    start() {
 
    }
    
    set_direction(d){
        this.direction = d;
    }

    //检测当前回合数，蛇的长度是否增加
    check_tail_increasing() {    
        if (this.step <= 10) return true;
        if (this.step % 3 === 1) return true;
        return false;
    }

    //蛇的状态变为走下一步
    next_step() { 
        const d = this.direction;
        this.next_cell = new Cell(this.cells[0].r + this.dr[d], this.cells[0].c + this.dc[d]);
        this.direction = -1; //清空方向操作
        this.status = "move";
        this.step ++ ;   
 
        // 求长度
        const k = this.cells.length;
        // 初始元素不变 每一个元素往后移动一位
        for (let i = k; i > 0; i -- ) { 
            // 如果直接赋值（如 this.cells[i] = this.cells[i - 1]），会导致引用问题——this.cells[i] 和 this.cells[i - 1] 指向同一个内存地址，修改其中一个会影响另一个。
            this.cells[i] = JSON.parse(JSON.stringify(this.cells[i - 1]));
        }

        if (!this.gamemap.check_valid(this.next_cell)) {
            this.status = "die";
        }
    }
    //这个函数实现的是每一帧画一次，一帧移动一点
    update_move() {
        const dx = this.next_cell.x - this.cells[0].x;
        const dy = this.next_cell.y - this.cells[0].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
 
        if (distance < this.eps) {  // 走到目标点了
            this.cells[0] = this.next_cell;  // 添加一个新蛇头
            this.next_cell = null;
            this.status = "idle";  // 走完了，停下来

            if (!this.check_tail_increasing()) { // 蛇不变长。
                this.cells.pop();
            }
 
        } else {
            const move_distance = this.speed * this.timedelta / 1000;
            this.cells[0].x += move_distance * dx / distance;
            this.cells[0].y += move_distance * dy / distance;

            if (!this.check_tail_increasing()) {
                const k = this.cells.length;
                const tail = this.cells[k - 1], tail_target = this.cells[k - 2];
                const tail_dx = tail_target.x - tail.x;
                const tail_dy = tail_target.y - tail.y;
                tail.x += move_distance * tail_dx / distance;
                tail.y += move_distance * tail_dy / distance;
            }
        }
    }

    // 每一帧执行一次
    update() { 
        if (this.status === 'move') {
            this.update_move();
        }

        this.render();
    }
 
    render() {
        // 画出基本的蛇头
        const L = this.gamemap.L;
        const ctx = this.gamemap.ctx;
 
        ctx.fillStyle = this.color;// 设置蛇的颜色

        if (this.status === "die") {
            ctx.fillStyle = "white";
        }
        //of遍历的是值
        for (const cell of this.cells) {
            ctx.beginPath();// 开始绘制路径，。如果不写这句话，新绘制的图形会和之前的图形路径连在一起，可能导致意料之外的效果。
            ctx.arc(cell.x * L, cell.y * L, L / 2 * 0.8, 0, Math.PI * 2);// 绘制圆，圆心位置+半径+角度值0到2Π
            ctx.fill();// 填充颜色
        }

        for (let i = 1; i < this.cells.length; i ++ ) {
            const a = this.cells[i - 1], b = this.cells[i];
            if (Math.abs(a.x - b.x) < this.eps && Math.abs(a.y - b.y) < this.eps)
                continue;
            if (Math.abs(a.x - b.x) < this.eps) {
                ctx.fillRect((a.x - 0.4) * L, Math.min(a.y, b.y) * L, L * 0.8, Math.abs(a.y - b.y) * L);
            } else {
                ctx.fillRect(Math.min(a.x, b.x) * L, (a.y - 0.4) * L, Math.abs(a.x - b.x) * L, L * 0.8);
            }
        }

        ctx.fillStyle = "black";
        for (let i = 0; i < 2; i ++ ) {
            const eye_x = (this.cells[0].x + this.eye_dx[this.eye_direction][i] * 0.15) * L;
            const eye_y = (this.cells[0].y + this.eye_dy[this.eye_direction][i] * 0.15) * L;
 
            ctx.beginPath();
            ctx.arc(eye_x, eye_y, L * 0.05, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}


