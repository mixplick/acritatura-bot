import TelegramBot from 'node-telegram-bot-api';
import { iDebit } from '../types';
import executeQuery from './bigquery';

const Dataset = "telegram";
const Table = "tabela";

const check = async (bot: TelegramBot, msg: TelegramBot.Message, match?: RegExpExecArray | null): Promise<void> => {
    if (match![1] !== '') {
        const name = match![1];

        const query = `
        SELECT 
            Name, SUM(Debt) AS Debt 
        FROM  \`pessoal-312700.${Dataset}.${Table}\` 
        WHERE Name = "${name}"         
        GROUP BY Name 
        ORDER BY 2,1 DESC
        `;
        const [job] = await executeQuery(query);
        const [rows] = await job.getQueryResults();

        let resp = ``;
        rows.forEach((row: iDebit) => {
            resp += `@${row.Name} tá devendo ${row.Debt} caixa(s).`;
        });
        bot.sendMessage(
            msg.chat.id,
            resp
            ,
            {
                parse_mode: 'HTML',
                // reply_markup: githubButton,
            }
        );
    } else {
        const query = `
            SELECT 
                Name, SUM(Debt) AS Debt 
            FROM  \`pessoal-312700.${Dataset}.${Table}\`  
            GROUP BY Name 
            ORDER BY 2,1 DESC
            `;

        const [job] = await executeQuery(query);
        // Wait for the query to finish
        const [rows] = await job.getQueryResults();

        let resp = `##########CAIXAS##########\n`;
        rows.forEach((row: iDebit) => {
            const icon = "🍻".repeat(row.Debt)
            resp += `\n@${row.Name} deve ${row.Debt} ${icon}`;
        });
        bot.sendMessage(
            msg.chat.id,
            resp
            ,
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
            text: '🤖 Source Code',
            url: 'https://github.com/BreadGenie/van-tg-bot'
        }]
    ]
};
export default check;