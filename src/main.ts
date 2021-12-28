import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import axios from 'axios';

dotenv.config();
const TOKEN: string = process.env.TELEGRAM_TOKEN!;
const url = process.env.BOT_DOMAIN;
const port: string | undefined = process.env.PORT;

const bot = new TelegramBot(TOKEN, {
    polling: true
});




const app = express();
app.use(express.json());

const init = async (): Promise<void> => {
    const webhook = bot.setWebHook(`${url}/bot${TOKEN}`);
    const res = await axios.get(`${url}/bot${TOKEN}`);
    console.log(res.data);
}

// app.post()