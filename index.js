require('dotenv').config();                             
const axios = require('axios');                           

const TelegramBot = require('node-telegram-bot-api');       //importing node-telegram-bot-api module
 
   console.log("Bot is starting...")
   console.log("TELEGRAM_TOCKEN "+process.env.TELEGRAM_TOCKEN);
    console.log("GROUP_ID "+process.env.GROUP_ID);
    
    const bot = new TelegramBot(process.env.TELEGRAM_TOCKEN, {polling: true});
    bot.on('message', (msg) => {
        const chatId = process.env.GROUP_ID;
        bot.sendMessage(chatId, 'Welcome to WikiBot. Type /random to get random article from wikipedia');
        bot.onText(/\/random/, (msg) => {
            axios.get('https://en.wikipedia.org/api/rest_v1/page/random/summary')    //using axios to get random articles data from wikipedia api
            .then((res) => {
                const data = res.data;
                const title = data.title;
                const extract = data.extract;
                const link = data.content_urls.desktop.page;
                bot.sendMessage(chatId, title + '\n' + extract + '\n' + link);
                console.log("message sent successfully,please check your telegram group")
                console.log("title: " + title + '\n' + "extract: " + extract + '\n' + "link: " + link);
              
            })
            .catch((err) => {
                console.log(err);
            })
        })
    }
    )


