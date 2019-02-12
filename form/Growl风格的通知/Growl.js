$('document').ready(function(){
    // 生成通知气泡的框架
    function addNotice(notice){
        $('<div class="notice"></div>')
            .append('<div class="skin"></div>')
            .append('<a href="#" class="close"></a>')
            .append($('<div class="content"></div>').html(notice))
            .hide()
            .appendTo('#growl')
            .fadeIn(1000);
    };
    //将消息淡入显示
    addNotice("<p>Welcome to StarTracker!</p>");
    setTimeout(function(){
        addNotice('<p>Stay awhile</p><p>Stay forever!</p>');
    },1000);
    //关闭气泡
    // 上面有一个气泡是1000毫秒后才添加上去的，这时候函数已经声明完毕了，所以要同样延迟1000毫秒再声明函数。
    setTimeout(function(){
        $('#growl')
            .find('.close')
            .on('click',function(){
                console.log('click');
                $(this)
                    .closest('.notice')
                    .animate({
                        border:'none',
                        height:0,
                        marginBottom:0,
                        marginTop:'-6px',
                        opacity:0,
                        paddingBottom:0,
                        paddingTop:0,
                        queue:false
                    },1000,function(){
                        $(this).remove();
                    })
            });
    },1000);  // 可实际上气泡是实时、随机添加的，这可怎么办？
});
