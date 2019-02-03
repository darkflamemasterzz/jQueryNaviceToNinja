$('document').ready(function(){
    function test(){
      console.log('test');
    }
    // 用户移动到下一个字段时，检测有没有填
    $('.filled')
        .on("load",test())
        .blur(function(){   // $('input')可以吗?
        if (! $(this).val().length){
            $(this)
                .addClass('error')
                .after('<span class="errorTips">Default value will be used</span>');
        }})
        // 如果用户没填必填选，则自动补上默认数据
        .each(function(){
            $(this)
                // 把用户每次填上去的值设为default值
                /*.data('default', $(this).val())*/
                .addClass('inactive')
                .focus(function(){
                    $(this).removeClass('inactive')
                        .data('default', $(this).val());
                    // focus到该字段时如果该字段的值是默认值或者空值，则清空该字段的值
                    if($(this).val() === $(this).data('default') || $(this).val() === ''){
                        console.log(typeof($(this).data('default')));
                        $(this).val('');
                    }

                })
                .blur(function(){
                    if($(this).val() === '' || $(this).val() === $(this).data('default')){
                        $(this).addClass('inactive').val($(this).data('default'));
                    }
                });
        });
    // 用户重新focus该字段后取出错误提示符和样式
    $(':input').focus(function(){
        $(this)
            .removeClass('error')
            .next('span')
            .remove();
    });
    // 提交表单前必须填完字段
    $('form').submit(function(event){
        var error = false;
        // 遍历所有text型字段，看有没有空的
        $(this).find(".filled").each(function(){
            // 如果有空的，alert一个窗口提示用户并focus到空字段上
            if(! $(this).val().length){
                alert("Textbox must be filled");
                $(this).focus();
                error = true;
                // 发现一个空字段后就结束循环
                return false;
            }
        });
        // 有空字段就别交表单了
        if(error){
            event.preventDefault();
        }
    });


    // 限制反馈字段的最大长度，显示最大长度指示器
    $('#maxLength')
        // 选择对象从.maxLength转到新加入的span
        .next()
        .hide()
        // 选择对象从span转回.maxlength
        .end()  // end()的用法我还不太收悉
        .keypress(function(event){
            var current = $(this).val().length;  // 每按一次键新建一个变量？能优化一下吗？
            // 字数限制为140
            if (current >= 140){
                // 允许使用删除键和退格键
                if (event.which !=0 && event.which !==8){
                    event.preventDefault();
                }
            }
            //$(this).next().show().text(140 - current);
            $('span').show().text(140 - current);
        });


});

