$('document').ready(function(){
    // 创建TABLE对象来容纳各种方法代码
    var TABLE = {};

    // 固定表头函数
    TABLE.fixHeader = function(table){
        // 遍历每个表格（本例只有一个）
        $(table).each(function(){
            // 表格
            var $table = $(this);
            // 表头
            var $thead = $table.find('thead');
            // 表头内容
            var $ths = $thead.find('th');
            // 存储表格的各种位置参数
            $table.data('top', $thead.offset().top); // 对各种位置参数不够了解
            $table.data('left', $thead.offset().left);
            $table.data('bottom', $table.data('top') + $table.height() - $thead.height());

            // 创建虚假表头ul,并复制表头的内容
            var $list = $('<ul class="faux-head"></ul>');
            // 遍历每个表头内容
            $ths.each(function(i){
                _th = $(this);  // 不用先声明变量吗？
                $list.append(
                    $("<li></li>")
                        .addClass(_th.attr("class"))
                        .html(_th.html())  // 后一个遍历对象会覆盖前一个遍历对象吗？
                        .width(_th.width())  //哎？ 将li的宽度设为单个表头内容的宽度？
                    /*.click(function(){    // 哎？ 怎么报错了？
                        _th.click()
                    });*/
                )
                // 隐藏虚拟表头，并把它设置到原表头的位置
                    .hide().css({left:$table.data('left'), top: $table.data('top')});
            });
            // 添加虚拟表头
            $('body').append($list);

            // 对滚动scroll事件作出响应
            $(window).scroll(function(){
                clearTimeout(timer); // 干嘛呢？这是？
                var timer;
                timer = setTimeout(function(){  // 为什么要设置延迟间隔呢？
                    console.log('$table.data(\'top\'):'+$table.data('top'));
                    console.log($('document'));
                    console.log('$(\'document\').scrollTop():'+$(window).scrollTop());
                    console.log('$table.data(\'bottom\'):'+$table.data('bottom'));
                    // 如果表头超出窗口：执行以下语句
                    if ($table.data('top') < $(window).scrollTop() && $(window).scrollTop() < $table.data('bottom')){  // $(window)可以，$('document')不行??
                        $list
                            .show()
                            .stop()  // stop()??
                            .animate({
                                top: $(window).scrollTop(),
                                opacity:1
                            });
                    // 如果回到表头则淡出虚拟表头
                    }else{
                        $list.fadeOut(function(){
                            $(this).css({top: $table.data('top')});
                        });
                    }
                },100);
            });
        })
    };

    // 重复表头函数
    // 函数的参数：table表格  every每多少行插入表头
    TABLE.repeatHeader = function(table, every){
        $(table).each(function(){
            // $this这个表格
            var $this = $(this);
            // rowsLen行数（除表头外）
            var rowsLen = $this.find('tr:not(:first)').length;
            // 复制、插入表头到相应位置
            $(this).find('tr:first')
                .clone()  // 能不能把样式也clone过去呢？
                .css({
                    backgroundColor: $this.find('thead').css('background-color'),
                    color: $this.find('thead').css('color')
                })
                .insertAfter($this.find('tr:nth-child('+ every + 'n)'));
            // 列表的末行是不允许存在表头的
            if (rowsLen % every === 0){
                $this.find('tr:last').remove();
            }
        });
    }

    // 调用固定表头函数
    TABLE.repeatHeader('#celebs', 5);
});