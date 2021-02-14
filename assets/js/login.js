$(function () {
    // 1. 点击去注册账号，隐藏登录区，显示注册区
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 2. 点击去登录，隐藏注册区，显示登录区
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 3. 自定义验证规则
    var form = layui.form
    form.verify({
        // 密码规则
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 确认密码规则
        repwd: function(value){
            var pwd = $('.reg-box input[name=password').val()
            if(value !== pwd) {
                return '两次密码输入不一致！'
            }
        }
    })

    // 4. 注册功能
    var layer = layui.layer
    $('#form_reg').on('submit',function(e){
        // 阻止默认提交
        e.preventDefault()
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function(res){
                if(res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // 切换到登陆页面
                $('#link_login').click()
                // 重置表单
                $('#form_reg')[0].reset()
            }
        })
    })

    // 5. 登录功能
    $('#form_login').on('submit',function(e){
        // 阻止默认提交
        e.preventDefault()
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res){
                if(res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // 保存token
                localStorage.setItem('token',res.token)
                // 跳转
                location.href = '/index.html'
            }
        })
    })
})