// 出现的问题
// 连续狂点会出现意象不到的效果

$(document).ready(function(){
    // main_picture显示屏
    // 获取图片的张数
    var numPic = $('#photos_inner img').length;
    // 每张img获取一个便签，便签为0的为mainImg
    $('#photos_inner img').each(function(i){
        $(this).addClass(String(i));
    });
    // 将带有0索引号的img输出到mainPic中去
    $("#mainPic img").attr("src",$(".0").attr("src"));
    // 缩略图滚动器
    $('#photos_inner').click(function(){
        // 计算有多少空间可以滚动: 滚动区的宽度 - 显示区的宽度
        var scrollAmount = $(this).width() - $(this).parent().width();
        var currentPos = Math.abs(parseInt($(this).css('left')));
        var remainingScroll = scrollAmount - currentPos;
        //var nextScroll = Math.floor($(this).parent().width()/2);
        // 改为每次滚一张
        var nextScroll = 180;
        // 判断滚多少
        if (remainingScroll < nextScroll){
            nextScroll = remainingScroll;
        }
        if (currentPos < scrollAmount){
            $(this).animate({'left':'-='+nextScroll}, 'slow');
        }
        else{
            $(this).animate({'left':0},'fast');
            // mainPic的图片也要改变
            $("#photos_inner img").each(function(i){
                $(this).attr("class",String(i));
            });
            $("#mainPic img").attr("src",$(".0").attr("src"));
            return;
        }

        // 改变索引号:索引号+1，若等于numPic则索引号=0
        $("#photos_inner img").each(function(){
            var check = parseInt($(this).attr("class"));
            if (check>0){
                check=check-1;
            }
            else{
                check=11;
            }
            $(this).attr("class",check);
        });
        // 移除mainPic中的旧img,并重新将索引号为0的新img输出到mainPic中去
        $("#mainPic img").attr("src",$(".0").attr("src"));
    });
});