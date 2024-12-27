import { AcGameObject } from "./AcGameObject.js";
import { Wall } from "./wall.js";
import { Snake } from "./Snake.js";
export class GameMap extends AcGameObject {
    constructor(ctx, parent) {
        super();
        //如果不使用 this，ctx 和 parent 是构造函数内部的局部变量，只能在构造函数中访问，离开构造函数后就会失效。
        //使用 this，将 ctx 和 parent 绑定到当前实例对象，可以在整个类的任何方法中访问。
        this.ctx = ctx;//获得画笔，用于画图
        this.parent = parent;// 父容器 DOM，用于获取画布的宽高
        this.L = 0;// 每个格子的大小

        this.rows = 13;// 行数
        this.cols = 14;// 列数

        this.inner_walls_count = 30;// 随机墙的数量
        this.walls = [];// 存储墙体对象
        this.snakes = [
            new Snake({id : 0, color : "#4876ec", r : this.rows - 2, c : 1}, this),
            new Snake({id : 1, color : "#f94848", r : 1, c : this.cols - 2}, this),
        ];
    }

    //检查地图连通性,因为四周都是
    //通过深度优先搜索（DFS）判断从起点 (sx, sy) 是否能够到达终点 (tx, ty)
    check_is_connect(g, sx, sy, tx, ty) {
        if (sx == tx && sy == ty) return true;
        g[sx][sy] = true;

        let dx = [-1, 0, 1, 0];
        let dy = [0, 1, 0, -1];

        for (let i = 0; i < 4; i ++ ) {
            let x = sx + dx[i], y = sy + dy[i];
            //this 确保调用的是当前类的 check_is_connect 方法，而不是其他地方的同名函数。
            if (!g[x][y] && this.check_is_connect(g, x, y, tx, ty)) return true;
        }

        return false;
    }

    //生成墙体
    create_walls() {
        const st = [];//用bool数组来保存是否存在障碍物 初始置位false
        for (let r = 0; r < this.rows; r ++ ) {
            st[r] = [];  //使 st 成为一个二维布尔数组。
            for (let c = 0; c < this.cols; c ++ ){
                st[r][c] = false;
            }
        }

        // 四周先加上墙
        for (let r = 0; r < this.rows; r ++ ){
            st[r][0] =true;
            st[r][this.cols - 1] = true;
        }
            

        for (let c = 0; c < this.cols; c ++ ){
            st[0][c] = true;
            st[this.rows - 1][c] = true;
        }
            

        // 随机添加墙
        //只有内层循环运行完（找到一个有效的墙体对，或者尝试 1000 次后放弃）时，才会继续执行外层循环的下一次迭代。
        for (let i = 0; i < this.inner_walls_count / 2; i ++ ){
            for (let j = 0; j < 1000; j ++ ) { // 假装是个死循环，一共就121个空位，总能找到得到
                let r = parseInt(Math.random() * this.rows);
                let c = parseInt(Math.random() * this.cols);
                //这里都是行和列的操作，不涉及canvas的行和列
                if (st[r][c] || st[this.rows - 1 - r][this.cols - 1 - c]) continue; // 中心对称
                //(this.rows - 2, 1)：地图的左下角入口。(1, this.cols - 2)：地图的右上角出口。
                if (r == this.rows - 2 && c == 1 || r == 1 && c == this.cols - 2)
                    //continue 跳过当前内层循环的这次迭代，直接进入内层循环的下一次迭代。只针对 内层循环 for (let j = 0; j < 1000; j++)。
                    continue;
                st[r][c] = st[this.rows - 1 - r][this.cols - 1 - c] = true;
                // break 跳出当前内层循环，直接结束 for (let j = 0; j < 1000; j++)。
                break;
            }
        }

        //使用 JSON.parse(JSON.stringify(st)) 创建 st 的深拷贝，生成一个新的数组 backup_st。这是为了保护原始的 st 数据不受后续连通性检查的影响。
        //如果直接使用 backup_st = st，会创建对同一对象的引用，修改 backup_st 的同时也会改变 st。通过深拷贝，backup_st 和 st 互不影响。
        const backup_st = JSON.parse(JSON.stringify(st));
        if (!this.check_is_connect(backup_st, this.rows - 2, 1, 1, this.cols - 2)) return false;

        // 画墙
        for (let r = 0; r < this.rows; r ++ ){
            for (let c = 0; c < this.cols; c ++ ){
                if (st[r][c]){
                    this.walls.push(new Wall(r, c, this));
                }
            }     
        }
        return true;
    }

    // canvas 元素绑定键盘事件，用于玩家通过键盘控制两条蛇的移动方向。
    add_listening_events() {
        //必须写，使 canvas 元素获得键盘焦点，确保键盘事件可以被捕获。
        //默认情况下，canvas 不会自动获取键盘焦点，用户需要点击画布或调用 focus() 来手动设置。
        this.ctx.canvas.focus();
        //解构赋值
        const [snake0, snake1] = this.snakes;
        //canvas 绑定 keydown 事件监听器，当玩家按下键盘上的任意键时触发。
        this.ctx.canvas.addEventListener("keydown", e => {
            if (e.key === 'w'){
                snake0.set_direction(0);
                console.log("w");
            }
            else if (e.key === 'd') {
                snake0.set_direction(1);
                console.log("d");
            }
            else if (e.key === 's'){
                snake0.set_direction(2);
                console.log("s");
            }
            else if (e.key === 'a'){
                snake0.set_direction(3);
                console.log("a");
            }
            else if (e.key === 'ArrowUp'){
                snake1.set_direction(0);
                console.log("1");
            }
            else if (e.key === 'ArrowRight'){
                snake1.set_direction(1);
                console.log("2");
            }
            else if (e.key === 'ArrowDown'){
                snake1.set_direction(2);
                console.log("3");
            }
            else if (e.key === 'ArrowLeft'){
                snake1.set_direction(3);
                console.log("4");
            }
        });
    }

    //开始初始化地图
    //不断尝试生成随机墙，直到生成一个连通的地图。
    start() {
        for (let i = 0; i < 1000; i ++ )
            if(this.create_walls()) 
                break;
        this.add_listening_events();
    }

    //这个函数说白了，就是用画布把正方形画出来，对canvas操作
    update_size() {
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.cols * this.L;
        this.ctx.canvas.height = this.rows * this.L;
    }

    // 判断两条蛇是否准备下一回合了
    // 说白了只有状态处于静止状态，即 status === "idle" 。触发了方向操作，是上右下左其中一个，即direction === 0，1，2，3的时候，才可以移动。
    check_ready() { 
        for (const snake of this.snakes) {
           if (snake.status !== "idle") return false;
           if (snake.direction === -1) return false;
          }
        return true;  
     }

     //让两条蛇进入下一回合
     next_step() {
        for (const snake of this.snakes) {
            snake.next_step();
        }
    }


    check_valid(cell) {  // 检测目标位置是否合法：没有撞到两条蛇的身体和障碍物
        for (const wall of this.walls) {
            if (wall.r === cell.r && wall.c === cell.c)
                return false;
        }
 
        for (const snake of this.snakes) {
            let k = snake.cells.length;
            if (!snake.check_tail_increasing()) {  // 当蛇尾会前进的时候，蛇尾不要判断
                k -- ;
            }
            for (let i = 0; i < k; i ++ ) {
                if (snake.cells[i].r === cell.r && snake.cells[i].c === cell.c)
                    return false;
            }
        }
 
        return true;
    }
 
     
    update() {
        this.update_size();
        if (this.check_ready()) {
            this.next_step();
        }
        this.render();
    }

    // 渲染画布，奇数格偶数格跳着染颜色。
    render() {
        //color_even是偶数，color_odd是奇数。
        const color_even = "#AAD751", color_odd = "#A2D149";
        for (let r = 0; r < this.rows; r ++ ){
            for (let c = 0; c < this.cols; c ++ ) {
                if ((r + c) & 1) this.ctx.fillStyle = color_odd;
                else this.ctx.fillStyle = color_even;
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);
            }
        }     
    }
}
