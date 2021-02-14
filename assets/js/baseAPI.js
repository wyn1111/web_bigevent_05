// 服务器地址
var baseURL = 'http://api-breakingnews-web.itheima.net'

// 拦截所有ajax请求
$.ajaxPrefilter(function (params) {
    params.url = baseURL + params.url
    // console.log(params.url);
    // 身份验证
    if (params.url.indexOf('/my/') !== -1) {
        params.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 判断身份验证信息
    params.complete = function(res) {
        // console.log(res.responseJSON);
        var obj = res.responseJSON
        if(obj.status == 1 && obj.message == '身份认证失败！'){
            // 清空本地token
            localStorage.removeItem('token')
            // 页面跳转
            location.href = '/login.html'
        }
    }
})