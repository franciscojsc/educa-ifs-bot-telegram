const Composer = require('telegraf/composer');
const buttonsInline = require('./../../buttons/buttonsInline');
const buttonsKeyboard = require('./../../buttons/buttonsKeyboard');

const buttonMenuDefault = buttonsKeyboard.twoButton('Quiz', 'Tutoriais', 2);
const buttonContinue = buttonsInline.oneButton('Continuar?', 'c');
const buttonOk = buttonsInline.oneButton('OK?', 'ok');

const explainProjectPublication = new Composer();

explainProjectPublication.action('c', async (ctx) => {
  await ctx.reply('Que tal publicar seu projeto online', buttonOk);
});

explainProjectPublication.action('ok', async (ctx) => {
  await ctx.reply('Pelo visto tá interessado');
  await ctx.reply('😃');
  await ctx.reply('Vamos utilizar a plataforma GitHub', buttonContinue);
  return ctx.wizard.next();
});

explainProjectPublication.hears(/Sair do tutorial/i, async (ctx) => {
  await ctx.reply(
    'Ok, saindo do tutorial, que tal outro tutorial ou um quiz?',
    buttonMenuDefault
  );
  await ctx.scene.leave();
});

explainProjectPublication.on('message', (ctx) => {
  ctx.reply('Confirme clicando nos botões :)');
});

module.exports = explainProjectPublication;
