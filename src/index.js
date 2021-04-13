const env = require('../.env');
const Telegraf = require('telegraf');
const bot = new Telegraf(env.token);

const path = require('path');
const botImage = path.join(__dirname, 'assets', 'imgs', 'educaIFS_bot.png');

bot.catch((err, ctx) => {
  ctx.reply(
    `Estou com algum problema hoje, poderia conversar comigo mais tarde 🤕.`
  );
});

bot.start(async (ctx) => {
  const nome = ctx.update.message.from.first_name;
  await ctx.reply(
    `Olá ${nome}, eu sou um Bot 🤖 e o meu nome é Educa IFS, mas você pode me chamar de Edu 😃!`
  );
  await ctx.replyWithPhoto({ source: botImage });
});

bot.launch();
