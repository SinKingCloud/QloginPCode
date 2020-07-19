/**
 * QQ登陆p值算法
 * Author:流逝中沉沦
 * @QQ:1178710004
 * Blog:https://www.clwl.online/qloginpcode
 */
var http = require('http');
var RequestUrl = require('url');
var login = require('./login');
http.createServer(function (request, response) {
    var obj = RequestUrl.parse(request.url, true);
    var get = obj.query;
    response.setHeader("Content-type","text/json;charset=utf8");
    response.setHeader("status",200);
    if (get.uin == undefined || get.uin == '') {
        response.end(JSON.stringify({ code: 0, msg: "QQ不能为空！" }));
    }
    if (get.pwd == undefined || get.pwd == '') {
        response.end(JSON.stringify({ code: 0, msg: "密码不能为空！" }));
    }
    if (get.vcode == undefined || get.vcode == '') {
        response.end(JSON.stringify({ code: 0, msg: "VCODE不能为空！" }));
    }
    if (get.md5 == undefined || get.md5 == '') {
        var ismd5 = false;
    }else{
        var ismd5 = true;
    }
    var uin = get.uin;
    var pwd = get.pwd;
    var vcode = get.vcode;
    try {
        var p = login.getmd5(uin, pwd, vcode,ismd5);
    } catch (error) {
        var p = error;
    }
    response.end(JSON.stringify({ code: 1, msg: "获取成功",data:p }));
}).listen(1234);//端口号
