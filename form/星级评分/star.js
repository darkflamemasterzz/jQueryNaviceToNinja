$('document').ready(function(){
    // 星星评分控件
    var starRating = {
        // 隐藏radio按钮并添加星星链接
        create : function(selector){
            $(selector).each(function(){
                var $list = $('<div></div>');
                $(this)
                    .find('input:radio')
                    .each(function(i){
                        var rating = $(this).parent().text();
                        var $item = $('<a href="#"></a>')
                            .attr('title',rating)
                            // 根据编号判断这是左边星还是右边星
                            .addClass(i%2==1 ? 'rating-right' : '')
                            .text(rating); // 还要text吗？
                        starRating.addHandlers($item); // 干什么呢？
                        $list.append($item);
                        // 如果这颗星被单击了（checked）则给它以及它前面的同级元素附上rating类
                        if ($(this).is(':checked')) {  // radio的checked属性？
                            $item.prevAll().andSelf().addClass('rating');
                        }
                    })
                // 把星星添加上去 并隐藏原来的radio
                $(this).append($list).find('label').hide();
            });
        },
        // 用户交互
        addHandlers : function(item){
            // 存储星星的被点击状态，初始为未点击false,点击了为true
            var isClicked = false;
            $(item)
                // 单击星星事件
                .click(function(e){
                    var $star = $(this);
                    var $allLinks = $(this).parent();
                    console.log($('input[value="3Stars"]'));
                    /*console.log($('input[value='+$star.text()+']'));*/
                    // 为被点击的星星设置checked属性
                    $allLinks
                        .parent()  // 这不是多余的吗？
                        .find('input[value="3Stars"]')  // 如果我前面点的不是radio而是它的父元素呢? 还有text吗？
                        .attr('checked',true);
                    // 添加ratings类
                    $allLinks.children().removeClass('rating');
                    $star.prevAll().addClass('rating');
                    $star.addClass('rating');
                    isClicked = true;
                    // 取消点击超链接的默认时事件
                    e.preventDefault();
                })
                // 悬停星星事件
                // andSelf() 在1.8以上的版本被弃用了。。。
                .hover(function(){  // 原来click不返回的吗？直接链hover
                    $(this).prevAll().addClass('rating');
                    $(this).addClass('rating');
                },function(){
                    // 如果已经点击了就别执行hover out事件了，不让白点了
                    if(!isClicked){
                        $(this).siblings().removeClass('rating');
                        $(this).removeClass('rating');
                    }
                });

        }
    }

    starRating.create(".stars");
});