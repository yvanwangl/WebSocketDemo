//引入websocket模块
const WebScoket = require('ws');

//引入server类
const WebScoketServer = WebScoket.Server;


//实例化
const wss = new WebScoketServer({
    port: 3000
});

wss.on('connection', (ws)=>{
    console.log(`[SERVER] connection()`);
    ws.on('message', (message)=>{
        console.log(`[SERVER] received: ${message}`);
        ws.send(`ECHO: ${message}`, (err)=>{
            if(err){
                console.log(`[SERVER] error: ${err}`);
            }
        });
    });
});