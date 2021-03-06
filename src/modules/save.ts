import TelegramBot from 'node-telegram-bot-api';
import { iDebit } from '../types';
import executeQuery from './bigquery';

const Dataset = "telegram";
const Table = "tabela";

const save = async (bot: TelegramBot, msg: TelegramBot.Message, match: RegExpExecArray | null | undefined): Promise<void> => {
    if (match![1] !== '') {
        const name = match![1];

        const query = `
        INSERT \`pessoal-312700.${Dataset}.${Table}\` (Name, Debt, CreatedAt)
        VALUES("${name}", 1, CURRENT_TIMESTAMP())
        `;
        const [job] = await executeQuery(query);
        const resp = `Boa ${name}, tรก devendo mais uma caixa. ๐ป๐ป๐ป๐๐๐`;
        bot.sendMessage(
            msg.chat.id,
            resp,
            {
                parse_mode: 'HTML',
                // reply_markup: githubButton,
            }
        );
    } else {

        bot.sendMessage(
            msg.chat.id,
            `Precisa colocar quem tรก devendo neh man.`,
            {
                parse_mode: 'HTML',
                // reply_markup: githubButton,
            }
        );
    }
};
const githubButton = {
    inline_keyboard: [
        [{
            text: '๐ค Source Code',
            url: 'https://github.com/BreadGenie/van-tg-bot'
        }]
    ]
};
export default save;