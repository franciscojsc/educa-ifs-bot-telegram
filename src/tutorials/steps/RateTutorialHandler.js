const Composer = require('telegraf/composer');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');

const feedback = require('./../../lib/feedback');
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

RateTutorialHandler.action('o', async (ctx) => {
  await finallyTutorial(ctx, 'ótimo');
});

RateTutorialHandler.action('b', async (ctx) => {
  await finallyTutorial(ctx, 'bom');
});

RateTutorialHandler.action('r', async (ctx) => {
  await finallyTutorial(ctx, 'ruim');
});

RateTutorialHandler.action('p', async (ctx) => {
  await finallyTutorial(ctx, 'péssimo');
});

RateTutorialHandler.action('nqr', async (ctx) => {
  await finallyTutorial(ctx);
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

const finallyTutorial = async (ctx, option) => {
  if (!!option) {
    const { id } = ctx.update.callback_query.from;
    const { tutorial } = ctx.wizard.state;
    const timestamp = Date.now();
    await feedback(String(id), { tutorial, option, timestamp });
    await await ctx.replyWithMarkdown(`Muito obrigado pela resposta e por seguir o tutorial.
  Grande abraço e até mais!`);
  } else {
    await await ctx.replyWithMarkdown(`Muito obrigado por seguir o tutorial.
    Grande abraço e até mais!`);
  }

  await ctx.reply('👋');
  await ctx.reply('Que tal outro tutorial ou um quiz?', buttonMenuDefault);
  await ctx.scene.leave();
};

module.exports = RateTutorialHandler;
