import Food from './Food';
import ScorePanel from './scorePanel';
import Snake from './Snake';
class GameControl{
        // 定义三个属性
        snake:Snake;
        food:Food;
        scorePannel:ScorePanel;
        // chuang建一个属性来存储蛇的移动方向（也就是按键的方向）
        direction:string='';
        // 创建一个属性用来记录游戏是否结束
        isLive=true;

        constructor(){
            this.snake=new Snake();
            this.food=new Food();
            this.scorePannel=new ScorePanel(10,2);
            this.init()
        }
        //游戏的初始化方法，调用后游戏开始
        init(){
            // 绑定键盘按下的事件
            document.addEventListener('keydown',this.keydownHandler.bind(this))
            // 调用run方法使蛇移动
            this.run()
        }
            //         ArrowUp
            // bundle.js:2 ArrowRight
            // 2bundle.js:2 ArrowLeft
            // bundle.js:2 ArrowDown
        // 创建一个键盘按下的响应函数
        keydownHandler(event:KeyboardEvent){
            console.log(event.key)
            console.log(this)
            this.direction=event.key;
        }
        // 创建一个控制蛇移动的方法
        run(){
            // 获取蛇现在的坐标
            let X=this.snake.X;
            let Y=this.snake.Y;

            switch(this.direction){
                case "ArrowUp":
                    case "Up":
                    Y-=10;
                    break;
                case "ArrowDown":
                    case "Down":
                        Y+=10;
                        break;
                case "ArrowLeft":
                    case "Left":
                        X-=10;
                        break;
                case "ArrowRight":
                    case "Right":
                        X+=10;
                        break;
            }
            // 检查蛇是否吃到了食物
            this.checkEat(X,Y);
        try{
                // 修改蛇的X，Y值
                this.snake.X=X;
                this.snake.Y=Y;
        }catch(e:any){
                alert(e.message+'GAME OVER!')
                this.isLive=false
        }
            // 开启一个定时器
            this.isLive&&setTimeout(this.run.bind(this),300-(this.scorePannel.level-1)*30)
        }
        checkEat(X:number,Y:number){
            if(X===this.food.X&&Y===this.food.Y){
                // 食物的位置要进行重置
                this.food.change();
                // 分数增加
                this.scorePannel.addScore();
                // 蛇要增加一节
                this.snake.addBody()
            }
        }
}
export default GameControl;