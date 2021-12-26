/* eslint-disable @typescript-eslint/no-non-null-assertion */
// import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
// import { ScrapedGroup, ScrapedIdol } from './types';
import bot from './server';
import rules from './modules/rules';
import check from './modules/check';
import save from './modules/save';
import remove from './modules/remove';

dotenv.config();

// const token: string = process.env.TELEGRAM_TOKEN!;
// const port: string | undefined = process.env.PORT;
// const options = { polling: true };

// const bot = new TelegramBot(token, options);

bot.setMyCommands([
    {
        command: '/rules',
        description: 'As regras do grupo.'
    },
    {
        command: '/check',
        description: 'Ver quem e quanto deve'
    },
    {
        command: '/save <nome>',
        description: 'Quem foi promovido tem que pagar, anota pra não esquecer.'
    },
    {
        command: '/remove  <nome>',
        description: 'Glória a Deus! breja free.'
    }
]);

bot.onText(/\/rules/, async (msg): Promise<void> => {
    rules(bot, msg);
});


bot.onText(/^\/remove? (.*)/, async (msg, match): Promise<void | null> => {
    const result: RegExpExecArray | undefined | null = match === undefined ? undefined : match;
    remove(bot, msg, result);
});

bot.onText(/^\/save? (.*)/, async (msg, match): Promise<void | null> => {
    const result: RegExpExecArray | undefined | null = match === undefined ? undefined : match;
    save(bot, msg, result);
});

bot.onText(/^\/check? ?(.*)/, async (msg, match): Promise<void | null> => {
    const result: RegExpExecArray | undefined | null = match === undefined ? undefined : match;
    check(bot, msg, result);
});

bot.onText(/\/test (.+)/, (msg): void => {
    const chatId = msg.chat.id;
    const opts = {
        "reply_markup": {
            "inline_keyboard": [[
                {
                    "text": "A",
                    "callback_data": 'error'
                },
                {
                    "text": "B",
                    "callback_data": 'success'
                }]
            ]
        }
    }
    bot.sendMessage(chatId, "test", opts);
});