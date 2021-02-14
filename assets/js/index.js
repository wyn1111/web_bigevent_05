$(function(){
    // 1. 获取用户信息
    getUserInfo()

    // 2. 退出
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('是否确认提出?', { icon: 3, title: '提示' }, function (index) {
            // 清空本地token
            localStorage.removeItem('token')
            // 页面跳转
            location.href = '/login.html'
            // 关闭询问框
            layer.close(index);
        });
    })

})

// 获取用户信息函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            // 渲染头像
            // console.log(res.data);
            renderAvatar(res.data)
        }
    })
}


// 渲染头像函数
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 渲染头像
    if (user.user_pic !== null) {
        // 有头像
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avatar').hide()
    } else {
        // 没有头像
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.text-avatar').show().html(text)
    }
}