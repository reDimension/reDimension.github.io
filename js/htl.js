$(function(){
    var $pro = $(".progress");
    window.score = 0;
    window.noplay;//未被击打的动画画面数
    //点击查看游戏规则
    $(".rule").click(function(){
        $pro.width();//记录当前时间进度
        $(".rules").fadeIn(500);//淡入显示规则
        $(".hid").detach();//移除遮罩层及图片层
        clearInterval(start);//清除动画计时器
    })
    //点击关闭游戏规则
    $(".close").click(function(){
        $(".rules").fadeOut(100);//淡出隐藏规则
        if($pro.width()>0)//判断原先是否在游戏内
            $(".game").trigger("click");
    })
    //点击开始游戏或重新开始游戏
    $(".game").click(function(){
        var $hid = ($("<div class='hid'></div>"))//定义hid层
        if($pro.width()===0){//当前时间进度为零时初始化分数和进度
            score = 0;
            $pro.css("width",180)
        }
        $(".container").append($hid);//添加遮罩层
        $(".score").text(score);//改变分数
        game();//调用游戏的方法
    });

    //游戏的方法
    function game(){
        var $game = $(".game");
        var length = $pro.width();//时间进度条的长度
        window.play = 0;//初始化动画画面的变量
        window.random1 = 0;//9个地鼠洞的随机变量
        window.random2 = 0;//角色的随机变量
        window.start;//计时器的变量
        $game.fadeOut(100);//淡出隐藏开始按钮
        //计时器间隔播放动画
        start = setInterval(function(){
            length -= 1//每次播放减少进度条长度
            $pro.css("width",length)//改变进度条长度
            flash();//调用动画的方法
            if(!length){//进度条为0时
                clearInterval(start)//停止计时器
                $(".hid").detach();//清除动画计时器
                $game.html("重新开始");//改变按钮文字
                $game.fadeIn(100);//淡入显示按钮
            }
        },180)
    }

    //动画的方法
    function flash(){
        //各个洞口距小窗口的top和left值，[top,left]
        var htl = [[160,20],[115,100],[141,190],[221,20],[192,105],[212,202],[294,33],[275,121],[296,209]]
        var $wolf = $("<div class='wolf'></div>");//定义wolf层
        if(!play){//动画画面为第一个时
            $(".wolf").detach();//移除已有的图片层
            random2 = Math.round(Math.random());//随机角色
            random1 = Math.round(Math.random()*8);//随机洞口出现
            noplay = 6;//定义画面从第一个开始，到第几个结束
            $(".hid").append($wolf);//添加图片层
            //只让玩家点击一次图片层，防止重复加分
            $(".wolf").one("click",function(){
                if(random2){
                    score += 10;//打到灰太狼加分
                    $(".score").text(score);
                }else{
                    score -= 10;//打到小灰灰减分
                    $(".score").text(score);
                }
                play = 6;//画面从第几个开始
                noplay = 9;//画面到第几个结束
            })
        }
        //根据随机数和画面数计算改变样式
        $(".hid").css({
            top:htl[random1][0],
            left:htl[random1][1]
        })
        $(".wolf").css({
            width: 108*(play+1),
            left:-108*play
        })
        if(random2){
            $(".wolf").css({
                background:"url('./images/h.png')"
            })
        }else{
            $(".wolf").css({
                background:"url('./images/x.png')"
            })
        }
        play = (play+1)%noplay;//显示第几个画面
    }
})