const Composer = require('telegraf/composer');
const buttonsInline = require('./../../buttons/buttonsInline');
const buttonsKeyboard = require('./../../buttons/buttonsKeyboard');

const buttonMenuDefault = buttonsKeyboard.twoButton('Quiz', 'Tutoriais', 2);
const buttonExit = buttonsInline.oneButton('Finalizar Tutorial?', 'exit');

const finishPublishFirstProject = new Composer();

finishPublishFirstProject.action('c', async (ctx) => {
  await ctx.reply('Que legal, você chegou até o ultimo passo');
  await ctx.reply('Acesse o Github e veja o resultado');
  await ctx.reply('🎊');
  await ctx.reply('🥳', buttonExit);
  return ctx.wizard.next();
});

finishPublishFirstProject.hears(/Sair do tutorial/i, async (ctx) => {
  await ctx.reply(
    'Ok, saindo do tutorial, que tal outro tutorial ou um quiz?',
    buttonMenuDefault
  );
  await ctx.scene.leave();
});

finishPublishFirstProject.on('message', (ctx) => {
  ctx.reply('Confirme clicando nos botões :)');
});

module.exports = finishPublishFirstProject;
