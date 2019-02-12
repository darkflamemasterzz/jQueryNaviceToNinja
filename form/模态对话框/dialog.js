$('document').ready(function(){
    // 创建显示对话框函数
    function openDialog(selector){
        $(selector)
            .clone()
            .appendTo('#overlay')
            .show()
            .parent()
            .fadeIn('fast');
        console.log('open!');
    }
    // 创建关闭对话框函数
    function closeDialog(selector){
        $(selector)
            .parents('#overlay')
            .fadeOut('fast', function(){
                $(this)  // 这个this是指selector还是#overlay呢？
                    .find('.dialog')
                    .remove();
            });
        console.log('close!');
    }

    // 单击显示对话框
    $('.button').click(function(e){
        openDialog('#eula');
        // 关闭对话框
        // 放在这里可以执行
        $('#eula')
            .find('.ok, .cancel')
            .on('click', function(){
                console.log(this);
                closeDialog(this);
            });
    });
    // 放在这里执行不了
    $('#eula')
        .find('.ok, .cancel')
        .on('click', function(){  // 执行不了？
            console.log(this);   // 没响应？
            closeDialog(this);  // 这个this是指#eula还是 .ok,.cancel呢？
        });
});