/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
dotenv.config();
const TOKEN: string = process.env.TELEGRAM_TOKEN!;
const url = process.env.BOT_DOMAIN;
const port: string | undefined = process.env.PORT;
const bot = new TelegramBot(TOKEN, {
    polling: true
});


if (process.env.NODE_ENV === 'production') {
    bot.setWebHook(`${url}/bot${TOKEN}`);
}

const app = express();

// parse the updates to JSON
app.use(express.json());

// We are receiving updates at the route below!
app.post(`/bot${TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// Start Express Server
app.listen(port, () => {
    console.log(`Express server is listening on ${port}`);
});

// // Just to ping!
// bot.on('message', msg => {
//     bot.sendMessage(msg.chat.id, 'I am alive!');
// });

export default bot;