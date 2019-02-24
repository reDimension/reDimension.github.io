$(function(){
    var $pro = $(".progress");
    window.score = 0;
    $(".rule").click(function(){
        $(".rules").fadeIn(500);
        $(".hid").detach();
        clearInterval(start);
    })
    $(".close").click(function(){
        $(".rules").fadeOut(500);
        if($pro.width()>0)
            $(".game").trigger("click");
    })
    $(".game").click(function(){
        if($pro.width()===0){
            score = 0;
            $pro.css("width",180)
        }
        $(".container").append($("<div class='hid'></div>"));
        $(".score").text(score);
        game();
    });

    function game(){
        var length = $pro.width();
        var $game = $(".game");
        window.findex = -1;
        window.random1 = 0;
        window.random2 = 0;
        window.noplay = 6;
        window.start;
        $game.fadeOut(500);
        start = setInterval(function(){
            length -= 1
            $pro.css("width",length)
            flash();//动画
            if(!length){
                clearInterval(start)
                $(".hid").detach();
                $game.html("重新开始");
                $game.fadeIn(500);
            }
        },200)
    }

    function flash(){
        var htl = [[160,20],[115,100],[141,190],[221,20],[192,105],[212,202],[294,33],[275,121],[296,209]]
        if(findex===-1){
            random2 = Math.round(Math.random());
            random1 = Math.round(Math.random()*8);
            $(".hid").append($("<div class='wolf'></div>"));
        }else if(!findex){
            $(".wolf").detach();
            random2 = Math.round(Math.random());
            random1 = Math.round(Math.random()*8);
            noplay = 6;
            $(".hid").append($("<div class='wolf'></div>"));
            $(".wolf").one("click",function(){
                if(random2){
                    score += 10;
                    $(".score").text(score);
                }else{
                    score -= 10;
                    $(".score").text(score);
                }
                findex = 6;
                noplay = 9;
            })
        }
        $(".hid").css({
            top:htl[random1][0],
            left:htl[random1][1]
        })
        $(".wolf").css({
            width: 108*(findex+1),
            height: 101,
            left:-108*findex
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
        findex = (findex+1)%noplay;
    }
})