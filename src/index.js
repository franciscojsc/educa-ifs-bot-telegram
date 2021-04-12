const env = require('../.env');
const Telegraf = require('telegraf');
const bot = new Telegraf(env.token);

bot.start(async (ctx) => {
  const nome = ctx.update.message.from.first_name;
  await ctx.reply(
    `Olá ${nome}, eu sou um Bot 🤖 e o meu nome é Educa IFS, mas você pode me chamar de Edu 😃!`
  );
});

bot.launch();
