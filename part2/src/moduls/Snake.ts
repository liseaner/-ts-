class Snake{
    // 表示蛇tou的元素
    head:HTMLElement;
    // 蛇的身体（包括蛇头）
    bodies:HTMLCollection;
    // 获取蛇的容器
    element:HTMLElement;
    constructor(){
        this.element=document.getElementById('snake')!;
        this.head=document.querySelector('#snake>div') as HTMLElement;
        this.bodies=this.element.getElementsByTagName('div');
    }
    // 获取蛇的坐标（蛇头坐标）
    get X(){
        return this.head.offsetLeft;
    }
    get Y(){
        return this.head.offsetTop;
    }
    // 设置蛇投的坐标
    set X(value:number){
        if(this.X===value){
            return;
        }
        // X的值的合法范围0-290
        if(value<0||value>290){
            // 如果成立则证明撞墙了
            throw new Error('撞墙了！')
        }
        // 修改x时，是在修改水平左边，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然
        if(this.bodies[1]&&(this.bodies[1] as HTMLElement).offsetLeft===value){
            // rug如果发生了掉头，让蛇反方向继续移动
            if(value>this.X){
                // 如果新值value大于旧值x，则说明蛇在向右掉头，此时发送掉头应该使蛇继续向左走
                value=this.X-10;
            }else{
                // 
                value=this.X+10
            }
        }
        this.moveBody()
        this.head.style.left=value+'px';
        this.checkHeadBody()
    }
    set Y(value:number){
        if(this.Y===value){
            return;
        }
        // X的值的合法范围0-290
        if(value<0||value>290){
            // 如果成立则证明撞墙了
            throw new Error('撞墙了！')
        }
        if(this.bodies[1]&&(this.bodies[1] as HTMLElement).offsetTop===value){
            // rug如果发生了掉头，让蛇反方向继续移动
            if(value>this.Y){
                value=this.Y-10;
            }else{
                // 
                value=this.Y+10
            }
        }
        this.moveBody()
        this.head.style.top=value+'px';
        this.checkHeadBody()
    }
    // 蛇身体增加的方法
    addBody(){
        // 向element中添加一个div
        this.element.insertAdjacentHTML('beforeend',"<div></div>")
    }
    // 添加一个蛇身体移动的方法
    moveBody(){
        for(let i=this.bodies.length-1;i>0;i--){
            // 获取前面身体的位置
            let X=(this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y=(this.bodies[i-1] as HTMLElement).offsetTop;
            // 将值设置到当前身体上
            (this.bodies[i] as HTMLElement).style.left=X+'px';
            (this.bodies[i] as HTMLElement).style.top=Y+'px';
        }
    }

    // 检查蛇头是否撞到身体
    checkHeadBody(){
        // 获取所有的身体，检查是否和舌头的坐标发生重叠
        for(let i=1;i<this.bodies.length;i++){
            let bd=this.bodies[i] as HTMLElement;
            if(this.X===bd.offsetLeft && this.Y===bd.offsetTop){
                throw new Error('撞到自己了!')
            }
        }
    }
}
export default Snake;