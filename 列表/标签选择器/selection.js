$('document').ready(function(){
    $('#tags').selectable({
        stop: function(){
            // 寻找重复标签
            // 把所有被选中的标签组成一个数组
            var names = $.map($('.ui-selected, this'), function(element, i){
                return $(element).text();
            });
            $('li', this)
                .filter(function(){
                    return ( $.inArray($(this).text(), names) != -1 );
                })
                .addClass('ui-selected')
    }
    });
    // 点击approve按钮把相应的内容标记为approve并把数据传输到服务器
    $('#approve').click(function(){
        // 要传输到服务器的数据
        var approveItems ="";
        $('#tags')
            .find('.ui-selected')
            .addClass('approve')
            .removeClass('ui-selected reject')
            // 要传输的数据即每个被选中的元素的序号
            .each(function(){
                approveItems += $(this).index() + "|";
            });
        $('#approved').val(approveItems);
        console.log($('#approved').val());
    });
    // 点击reject按钮把相应内容标记为reject
    $('#reject').click(function(){
        $('#tags')
            .find('.ui-selected')
            .addClass('reject')
            .removeClass('ui-selected approve');
    });
    // 点击clear按钮清除li的所有标记
    $('#clear').click(function(){
        $('#tags')
            .find('li')
            .removeClass('ui-selected approve reject');
        $('#approved').val('');
    });
});