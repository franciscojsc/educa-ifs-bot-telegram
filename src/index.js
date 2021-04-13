const env = require('../.env');
const Telegraf = require('telegraf');
const bot = new Telegraf(env.token);

const path = require('path');
const botImage = path.join(__dirname, 'assets', 'imgs', 'educaIFS_bot.png');

const buttonsKeyboard = require('./buttons/buttonsKeyboard');
const buttonStart = buttonsKeyboard.oneButton('Vamos começar?');
const buttonMenuDefault = buttonsKeyboard.twoButton('Quiz', 'Tutoriais', 2);

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
  await ctx.replyWithPhoto({ source: botImage }, buttonStart);
});

bot.hears([/vamos começar/i], async (ctx) => {
  await ctx.reply(
    'Meus conhecimentos atualmente são sobre a tecnologia Git, se tiver alguma dúvida, envie uma mensagem para mim, e tentarei responder, 😉 Ok'
  );
  await ctx.reply(
    'Clique nos botões abaixo, se quiser entrar no Quiz e testar seus conhecimentos, ou seguir os tutoriais disponíveis, vai ser bem legal!!!',
    buttonMenuDefault
  );
});

bot.launch();
