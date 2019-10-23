var http = require('http');
var RequestUrl = require('url');
var login = require('./login');
http.createServer(function (request, response) {
  var obj = RequestUrl.parse(request.url, true);
  var get = obj.query;
  if (get.uin == undefined || get.uin == '') {
    response.end('uin is null!');
  }
  if (get.pwd == undefined || get.pwd == '') {
    response.end('pwd is null!');
  }
  if (get.vcode == undefined || get.vcode == '') {
    response.end('vcode is null!');
  }
  var uin = get.uin;
  var pwd = get.pwd;
  var vcode = get.vcode;
  response.writeHeader(200, { "Content-type": "text/html;charset=utf8" })
  try {
    var p = login.getmd5(uin, pwd, vcode);
    response.write(p);
  } catch (err) {
    response.write(err.toString());
  }
  response.end();
}).listen(1234);