const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: '.wwebjs_cache'
    })
});
const qrcode = require('qrcode-terminal');


client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    console.log('QR RECEIVED', qr);
});

client.on('loading_screen', (percent, message) => {
    console.log('Lagi Loading... ', percent, message);
});

client.on('ready', () => {
    console.log('Bot Sudah Siap!!');
});
/*
client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }


});
*/
client.initialize();



function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
}
const array = ['💛','💙','💜','💚','❤','💔','💗','💓','💕','💖','💞','💘','💌'];
const result = getRandomItem(array);




client.on('message', async msg => {
    if (msg.body === '!ping') {
        msg.reply('pong');

    } else if (msg.isStatus === false) {
      //  msg.react('💜');
        msg.react(getRandomItem(array));
    }
    
}); 

client.on('message', async (msg) => {
    const chat = await msg.getChat();
    await chat.sendSeen();
});
/*
client.on('message', async msg => {
    console.log('Terdapat Chat, Lagi Di respon..');
    if (msg.isStatus === false) {
        const chat = await msg.getChat();
        chat.sendStateRecording();
    }
    });
*/
    sleep(15000).then(() => {

        client.on('message', async (msg) => {
            console.log('Terdapat Chat, Lagi Di respon..',);
            if (msg.isStatus === false) {
            var n=20000000;
            for(var i=1; i<=n; i++){
                await sleep(1000);
                const chat = await msg.getChat();
                chat.sendStateRecording();
                await sleep(1000);
                chat.sendStateTyping();
            }
        }
            });
        }) 
            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
            client.on('disconnected', (reason) => {
    console.log('terputus...', reason);
});
