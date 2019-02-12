$('document').ready(function(){
    var TABLE ={}
    TABLE.paginate = function(table, pageLength){
        // 1.Set up pagin information 表格 行数  计算页数
        var $table = $(table);
        var $rows = $table.find('tbody > tr')
        var numPages = Math.ceil($rows.length / pageLength) - 1;
        var current = 0;
        // 2.Set up the navigation controls
        var $nav = $table
            .parents('.table-wrapper')
            .find('.wrapper-paging ul');
        var $back = $nav.find('li:first-child a');
        var $next = $nav.find('li:last-child a');
        $nav.find('.paging-this strong').text(current + 1);
        $nav.find('.paging-this span').text(numPages + 1);
        $back
            .addClass('paging-disabled')
            .click(function(){
                pagination('<');
            });
        $next.click(function(){
            pagination('>');
        });
        // 3.Show initial rows
        $rows
            .hide()
            .slice(0,pageLength)
            .show();
        // 4.Move previous and next
        pagination = function(direction){
            // 如果按的是 < back按钮
            if(direction === '<'){
                if(current > 1){
                    current -=1;
                }else if(current == 1){
                    current -=1;
                    $back.addClass("paging-disabled");
                }
             // 如果按的是 > next按钮
            }else{
                if(current < numPages -1){
                    current +=1;
                }else if(current == numPages -1){
                    current +=1;
                    $next.addClass("paging-disabled");
                }
            };
            // 5.Reveal the correct rows
            var reveal = function(current){
                $back.removeClass("paging-disabled");
                $next.removeClass("paging-disabled");
                // 显示表格
                $rows
                    .hide()
                    .slice(current * pageLength, current * pageLength + pageLength)
                    .show();
                // 更新导航栏
                $nav.find("a.paging-this strong").text(current + 1);
            };
            // 刷新表内容
            reveal(current);
        };
    };
    // 添加edit按钮 函数
    TABLE.formwork = function(table){
        var $tables = $(table);
        $tables.each(function(){
            var _table = $(this);
            // 在表头末尾添加 'edit'栏
            _table
                .find('thead tr')
                .append($('<th class="edit">&nbsp</th>'));
            // 在表体的每行末尾添加edit按钮
            _table
                .find('tbody tr')
                .append($('<td class="edit"><input type="button" value="Edit"/></td>'));
        });
        // 点击edit按钮
        /*$tables.find('.edit:button').on('click', function(e){
            TABLE.editable(this);
            e.preventDefault();
        });*/
        $tables.find('.edit :button').click(function(e){
            TABLE.editable(this);
            e.preventDefault();
        });
    };
    // 进入编辑/推出编辑 函数
    TABLE.editable = function(button){
        var $button = $(button);  // $(button) ??
        var $row = $button.parents('tbody tr');
        var $cells = $row.children('th').not('.edit');
        // 如果data('flag')为真，正处于edit状态，即将转回table状态
        if($row.data('flag')){
            console.log('to table');
            // 转回table状态
            $cells.each(function(){
                var _cell = $(this);
                _cell.html(_cell.find('input').val());
            });
            $row.data('flag', false);
            $button.val('Edit');
        }
        // 如果data('flag')为假，正处于table状态，即将转回edit状态
        else{
            console.log('to edit');
            // 转回edit状态
            $cells.each(function(){
                var _cell = $(this);
                _cell.data('text', _cell.html())
                    .html('');
                var $input = $('<input type="text" />')
                    .val(_cell.data('text'))
                    .width(_cell.width() - 16);
                _cell.append($input);
            });
            $row.data('flag', true);
            console.log($row.data('flag'));
            $button.val('Save');
        }
    }

    // 复选框 函数
    TABLE.checkbox = function(table){
        // 每行前面添加复选框
        $('table tbody tr th:first-child')
            .before('<th><input type="checkbox" /></th>');
        $('table thead tr th:first-child')
            .before('<th><input type="button" class="checkAll" value="CheckAll" /></th>');
        $('table thead tr th:first-child')
            .css('padding-right', 10);
        // 每行开头的复选框
        var chkselctors = ' tr th:nth-child(1) :checkbox';
        // 点击全选按钮全选复选框
        $('.checkAll').click(function(){
            var $checkAll = $(table + chkselctors);
            // 立一个flag 如果flag为false则全选，如果flag为true则全撤
            if (! $checkAll.data('flag')){
                console.log(1);
                $($checkAll).prop('checked',true);
                $checkAll.data('flag', true);
            }else{
                console.log(0);
                $($checkAll).prop('checked',false);
                $checkAll.data('flag', false);
            }
        });
        // 利用shift健进行多选
        $(table + chkselctors).click(function(e){  // 这个函数设计得有点精妙，我还没有完全掌握他的精妙之处
            var $table = $(table);
            var lastRow = $(table).data('lastRow');
            var thisRow = $(this).parents('tr').index();
            // 判断出shift多选操作的start 和 end
            if(lastRow !== undefined && e.shiftKey){
                var numChecked = 0;
                var start = lastRow < thisRow ? lastRow : thisRow;
                var end = lastRow > thisRow ? lastRow : thisRow;
                $table
                    .find(chkselctors)
                    .slice(start, end)
                    .prop('checked', true);
            };
            $table.data('lastRow', thisRow);
            console.log('lastRow:' + lastRow);
            console.log('thisRow:' + thisRow);
        });

    };

    // 调用函数
    TABLE.paginate('#celebs',8);
    TABLE.formwork('#celebs');
    TABLE.checkbox('#celebs');
});