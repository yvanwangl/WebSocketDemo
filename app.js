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


//client side
let count = 0;
let ws = new WebScoket('ws://localhost:3000/test');

ws.on('open', ()=>{
    console.log(`[CLIENT] open()`);
    ws.send('hello!');
});

ws.on('message', (msg)=>{
    console.log(`[CLIENT] receive: ${msg}`);
    count++;
    if(count>3){
        ws.send('goodbye!');
        ws.close();
    }else {
        setTimeout(()=>{
            ws.send(`Hello, i am No.${count}`);
        }, 1000);
    }
});