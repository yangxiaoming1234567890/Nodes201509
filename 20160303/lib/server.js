//->导入依赖的模块
var http = require("http");
var url = require("url");
var fs = require("fs");


//->创建一个server服务器
var server = http.createServer(function (request, response) {
    var urlObject = url.parse(request.url, true);
    var pathname = urlObject.pathname;

    //->访问的是adduser页面
    if (pathname === "/index.html") {
        var content = fs.readFileSync("./index.html", "utf8");
        response.write(content);
        response.end();
        return;
    }

    if (pathname === "/add") {
        var query = urlObject.query;
        content = fs.readFileSync("./userInfo.json", "utf8");
        content = JSON.parse(content);

        var n = content.count;
        content.count = ++n;
        content.list.push({
            id: n,
            userName: query.userName,
            userAge: query.userAge
        });

        fs.writeFileSync("./userInfo.json", JSON.stringify(content), "utf8");

        var res = {
            code: 0,
            info: {
                id: n,
                userName: query.userName,
                userAge: query.userAge
            }
        };

        response.writeHead(200, {'content-type': 'application/json'});
        response.end(JSON.stringify(res));
        return;
    }

    if (pathname === "/get") {
        var con = fs.readFileSync("./userInfo.json", "utf8");
        response.writeHead(200, {'content-type': 'application/json'});
        response.end(con);
        return;
    }

    if (pathname === "/del") {
        query = urlObject.query;
        con = fs.readFileSync("./userInfo.json", "utf8");
        con = JSON.parse(con);
        for (var i = 0; i < con.list.length; i++) {
            if (con.list[i].id == query.id) {
                con.count = con.count - 1;
                con.list.splice(i, 1);
                break;
            }
        }
        fs.writeFileSync("./userInfo.json", JSON.stringify(con), "utf8");
        response.writeHead(200, {'content-type': 'application/json'});
        response.end(JSON.stringify({code: 0}));
        return;
    }
});

//->监听一个端口请求
server.listen(1234, function () {
    console.log("启动成功,正在监听1234这个端口");
});



