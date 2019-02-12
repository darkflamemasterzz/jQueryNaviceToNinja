$('document').ready(function(){
    // 隐藏二级、三级栏目 设置手柄事件
    $('#celebTree ul')
        .hide()
        .prev('span')
        .before('<span></span>')
        .prev()
        .addClass('handle closed')
        .click(function(){   //click函数里，this应该指向手柄还是ul?
            $(this)
                .toggleClass('closed opened')
                .nextAll('ul')
                .toggle();
        });
    // 利用事件委托处理单击事件
    // 如果逐个处理，除了增加文本量外还会造成很大的性能影响？？why??
    $('.title li').click(function(e){
        // 只有被点击的元素被设置为selected类
        $('.selected').removeClass('selected');
        $(e.target).addClass('selected');
        // 获取、存储被单击的元素的文本
        var celebrity = $(e.target).text();
        // 获取、存储被单击的元素的一级栏目标题文本
        var category = $(e.target)
            .parents('.title')
            .find('span')
            .text();
        // 显示被单击的元素文本和他的一级栏目标题文本
        $('#show span').text(category + ">" + celebrity);
    });
});