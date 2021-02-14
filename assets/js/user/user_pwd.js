$(function () {
    // 1. 自定义校验规则
    var form = layui.form
    form.verify({
        // 密码
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 新旧不重复
        samePwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return "原密码和旧密码不能相同！"
            }
        },
        // 两次新密码相同
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return "两次新密码输入不一致！"
            }
        }
    })


    // 2.表单提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                $('.layui-form')[0].reset()
            }
        })
    })
})