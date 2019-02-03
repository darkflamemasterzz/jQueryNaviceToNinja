$('document').ready(function(){
    $('.editable, .editable-area')
        // 提示用户此处可编辑
        .hover(function(){
            $(this).toggleClass('over-inline');
        })
        // 鼠标点击 编辑此处
        .click(function(event){
            console.log('click!');
            var $editable = $(this);
            // 如果此处已经是input则没必要用另一个Input替换掉这个input了
            if($editable.hasClass('active-inline')){
                return;
            }
            // 选择的内容（包括整个html格式）：去掉所有空格
            var contents = $.trim($editable.html().replace(/\/p>/g,"/p>\n\n"));  //不太收悉replace()
            $editable
                // 将处于可编辑状态的部分标记为active-inline类，并把内容删掉
                .addClass('active-inline')
                .empty();
            // 判断可编辑内容属于单行还是多行
            var editElement = $editable.hasClass('editable') ? '<input type="text"></input>' : '<textarea></textarea>';
            // 把内容替换为可编辑的input
            $(editElement)
                .css("width",$(this).width())   // 这里的this 是指h3而不是input??
                .css("height",$(this).height())
                .val(contents)  // 这里的contents不是包含整个html格式吗？就这样添上去?
                .appendTo($editable)
                .focus()
                // 移除光标 表示编辑结束
                .blur(function(event){  // 不太理解这里 移除光标这个动作不是由用户来完成的吗？
                    $editable.trigger('blur');
                });
        })
        // 光标离开input 编辑解释
        .blur(function(event){
            // 这里的$editable是指装着input的母元素
            var $editable = $(this);
            var edited = $editable.find(':first-child').val();
            $(this).removeClass('active-inline');
            $editable
                .children()
                .replaceWith('<em class="ajax">Saving...</em>');
            // 用延迟模拟传输数据的现象
             setTimeout(function(){
                 $editable
                     .children()
                     .replaceWith(edited);
            },800);
        });

    $('#test').click(function(){
        console.log('第一层:' + this);
        $('#test span')
            // 这里的this指向window
            .bind('load',(function(){console.log('第二层:' + this);})())
            // 这里的this指向#test
            .css("color",$(this).css("color"));
    });

});