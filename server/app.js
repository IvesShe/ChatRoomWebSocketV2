//引用websocket
let ws = require('nodejs-websocket');

//創建websocket Server
let server = ws.createServer(function(conn) {
    console.log('new connection');

    //監聽文本訊息
    conn.on('text', function(str) {
        console.log(str);
        let data = JSON.parse(str);

        //自定義資料結構處理
        switch (data.type) {
            case 'setname': //處理登入
                conn.nickname = data.name;
                boardcast(JSON.stringify({
                    name: 'Server',
                    text: data.name + ' 加入了房間',
                }));
                break;
            case 'chat': //處理聊天
                boardcast(JSON.stringify({
                    name: conn.nickname,
                    text: data.text,
                }));
                break;
            default:
                break;
        }
    })

    //監聽離線訊息
    conn.on('close', function(str) {
        console.log(11111111111);
        console.log(str);
        boardcast(JSON.stringify({
            name: 'Server',
            text: conn.nickname + ' 離開了房間',
        }));
    })

    //監聽錯誤訊息
    conn.on('error', function(err) {
        console.log(err);
    })
}).listen(3000);

function boardcast(str) { //發送廣播
    server.connections.forEach(function(conn) {
        conn.sendText(str);
    });
}
console.log('listen* 3000');