$(function(){
    // 1. 文章类别列表展示
    initArtCateList()
    // 封装函数
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                var str = template('tpl-art-cate', res)
                $('tbody').html(str)
            }
        })
    }

    // 2. 添加文章分类
    var layer = layui.layer
    $('#btnAdd').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px','260px'],
            content: $('#dialog-add').html()
        });
    })

    // 3. 提交文章分类添加
    var indexAdd = null
    $('body').on('submit','#form-add',function(e){
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCateList()
                layer.msg(res.message)
                layer.close(indexAdd)
            }
        })
    })


    // 4. 修改表单弹出框
    var indexEdit = null
    var form = layui.form
    $('tbody').on('click','.btn-edit',function(){
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px','260px'],
            content: $('#dialog-edit').html()
        });
        // 将修改渲染到页面
        var Id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,
            success: function(res){
                form.val('form-edit',res.data)
            }
        })
    })
    // 4. 修改表单提交
    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCateList()
                layer.msg(res.message)
                layer.close(indexEdit)
            }
        })
    })


    // 5. 删除
    $('tbody').on('click','.btn-detele',function(){
        var Id = $(this).attr('data-id')
        layer.confirm('是否确认删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + Id,
                success: function(res){
                    if(res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    initArtCateList()
                    layer.msg(res.message)
                    layer.close(index);
                }
            })
            
        });
    })

})