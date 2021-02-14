$(function () {
    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    // 1. 定义提交参数
    var q = {
        pagenum: 1,              // 页码值
        pagesize: 2,               // 每页显示多少条数据
        cate_id: "",	            // 文章分类的 Id
        state: "",	            // 文章的状态，可选值有：已发布、草稿
    }

    // 2. 初始化文章列表
    var layer = layui.layer
    initTable()
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var str = template('tpl-table', res)
                $('tbody').html(str)
                // 调用分页
                renderPage(res.total)

            }
        })
    }


    // 3. 初始化分类
    var form = layui.form
    initCate()
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var str = template('tpl-cate', res)
                $('[name=cate_id]').html(str)
                form.render()
            }
        })
    }

    // 4. 筛选功能
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        // 获取
        var state = $('[name=state]').val()
        var cate_id = $('[name=cate_id]').val()
        // 赋值
        q.state = state
        q.cate_id = cate_id
        // 初始化文章列表
        initTable()
    })

    // 5. 分页
    var laypage = layui.laypage
    function renderPage(total) {
        layui.use('laypage', function () {

            //执行一个laypage实例
            laypage.render({
                elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
                count: total, //数据总数，从服务端得到
                limit: q.pagesize,  // 每页几条
                curr: q.pagenum,      // 第几页

                // 分页模块设置
                layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
                limits: [2, 3, 5, 10],


                jump: function (obj, first) {
                    //obj包含了当前分页的所有参数，比如：
                    q.pagenum = obj.curr
                    q.pagesize = obj.limit
                    //首次不执行
                    if (!first) {
                        //do something
                        initTable()
                    }
                }
            });
        });
    }

    // 6. 删除
    $('tbody').on('click','.btn-delete',function(){
        var Id = $(this).attr('data-id')
        layer.confirm('是否确认删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + Id,
                success: function(res){
                    if(res.status !== 0){
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    if($('.btn-delete').length == 1 && q.pagenum > 1) q.pagenum--
                    initTable()
                }
            })
            layer.close(index);
          });
    })

})