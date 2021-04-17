const Composer = require('telegraf/composer');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');

const buttonsKeyboard = require('./../../buttons/buttonsKeyboard');

const buttonMenuDefault = buttonsKeyboard.twoButton('Quiz', 'Tutoriais', 2);

const RateTutorialHandler = new Composer();

RateTutorialHandler.action('exit', async (ctx) => {
  await ctx.replyWithMarkdown(`Opa..
  Antes de sair, pode me responder uma coisa.`);
  await ctx.reply(
    'O que você achou do tutorial?',
    Extra.markup(
      Markup.inlineKeyboard(
        [
          Markup.callbackButton('Ótimo 🤩', 'o'),
          Markup.callbackButton('Bom 😁', 'b'),
          Markup.callbackButton('Ruim 😞', 'r'),
          Markup.callbackButton('Péssimo 😡', 'p'),
          Markup.callbackButton('Não quero responder', 'nqr'),
        ],
        { columns: 2 }
      )
    )
  );
});

RateTutorialHandler.action(['o', 'b', 'r', 'p'], async (ctx) => {
  await ctx.replyWithMarkdown(`Muito obrigado pela sua resposta.
  Grande abraço e até mais!`);
  await ctx.reply('👋');
  await ctx.reply('Que tal outro tutorial ou um quiz?', buttonMenuDefault);
  await ctx.scene.leave();
});

RateTutorialHandler.action('nqr', async (ctx) => {
  await ctx.replyWithMarkdown(`Muito obrigado por seguir o tutorial.
  Grande abraço e até mais!`);
  await ctx.reply('👋');
  await ctx.reply('Que tal outro tutorial ou um quiz?', buttonMenuDefault);
  await ctx.scene.leave();
});

RateTutorialHandler.hears(/Sair do tutorial/i, async (ctx) => {
  await ctx.reply(
    'Ok, saindo do tutorial, que tal outro tutorial ou um quiz?',
    buttonMenuDefault
  );
  await ctx.scene.leave();
});

RateTutorialHandler.on('message', (ctx) => {
  ctx.reply('Confirme clicando nos botões :)');
});

module.exports = RateTutorialHandler;
