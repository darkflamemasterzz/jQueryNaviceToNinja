$('document').ready(function(){
    // SWAPLIST对象
    var SWAPLIST = {};
    // 函数swap: 把选中的元素添加到另一边
    SWAPLIST.swap = function(from, to){
        $(from)
            .find(':selected')
            .appendTo(to);
    }
    // 函数swapAll: 全部转移
    SWAPLIST.swapAll = function(from, to){
        $(from)
            .children()
            .appendTo(to);
    }
    // 函数invert: 反转选择
    SWAPLIST.invert = function(list){
        $(list)
            .children()
            .prop('selected', function(i, selected){
                return !selected;
            });
    }
    // 函数search: 利用搜索栏快速搜索目标
    SWAPLIST.search = function(list, search){
        $(list)
            .children()
            .prop('selected', false)
            .filter(function(){
                // 如果搜索内容为空则直接返回false
                if(!search){
                    return false;
                }
                //如果搜索内容存在于列表中则返回ture并选择上
                return $(this)
                    .text()
                    .toLowerCase()
                    .indexOf(search.toLowerCase()) > -1
            })
            .prop('selected', true);
    }


    // 单击#swapRight按钮，把选中的元素从左边的candidates移到右边的a-listers
    $('#swapRight').click(function(){
        SWAPLIST.swap('#candidates', '#a-listers');
    });
    // 单击#swapLeft按钮，把选中的元素从右边的a-listers移到右边的candidates
    $('#swapLeft').click(function(){
        SWAPLIST.swap('#a-listers', '#candidates');
    });
    // 全部从左到右转移
    $('#swapRightAll').click(function(){
        SWAPLIST.swapAll('#candidates', '#a-listers');
    });
    // 全部从右到左转移
    $('#swapLeftAll').click(function(){
        SWAPLIST.swapAll('#a-listers', '#candidates');
    });
    // 双击对应select元素实施反转选择操作
    $('select').dblclick(function(){
        SWAPLIST.invert(this);
    });
    // 搜索栏 一边输入一边搜素
    $('#search input').keyup(function(){
        SWAPLIST.search("#a-listers, #candidates", $(this).val());
    });
});