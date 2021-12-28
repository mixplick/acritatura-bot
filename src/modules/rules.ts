import TelegramBot from 'node-telegram-bot-api';

const rules = (bot: TelegramBot, msg: TelegramBot.Message): void => {
    bot.sendMessage(
        msg.chat.id,
        `Art. 1º Todos são iguais perante a lei, sem distinção de qualquer natureza, sendo assim todos são obrigados a pagar R$150 reais (cento e cinquenta reais) da conta, a cada promoção, melhora ou mudança de emprego.`
        ,
        {
            parse_mode: 'HTML',
            // reply_markup: githubButton,
        }
    );

}

const source = (bot: TelegramBot, msg: TelegramBot.Message): void => {
    bot.sendMessage(
        msg.chat.id,
        `XGH não pensa, faz a primeira coisa que vem à mente. Não existe segunda opção, a única opção é a mais rápida.`
        ,
        {
            parse_mode: 'HTML',
            reply_markup: githubButton,
        }
    );

}
const githubButton = {
    inline_keyboard: [
        [{
            text: '🤖 Source Code',
            url: 'https://github.com/mixplick/acritatura-bot'
        }]
    ]
};
export default { rules, source };