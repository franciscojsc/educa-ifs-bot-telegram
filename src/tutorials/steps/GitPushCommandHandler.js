const Composer = require('telegraf/composer');
const buttonsInline = require('./../../buttons/buttonsInline');
const buttonsKeyboard = require('./../../buttons/buttonsKeyboard');

const buttonMenuDefault = buttonsKeyboard.twoButton('Quiz', 'Tutoriais', 2);
const buttonContinue = buttonsInline.oneButton('Continuar?', 'c');

const GitPushCommandHandler = new Composer();

GitPushCommandHandler.action('c', async (ctx) => {
  await ctx.reply('Chegou o momento tão esperado, vamos enviar nosso código');
  await ctx.reply('🚀🚀🚀');
  await ctx.replyWithMarkdown(
    'Utilizaremos o comando `git push origin main` que o GitHub forneceu para publicar o projeto online'
  );
  await ctx.replyWithMarkdown(
    'O comando `git push` é responsável por enviar os commits para o servidor',
    buttonContinue
  );
  return ctx.wizard.next();
});

GitPushCommandHandler.hears(/Sair do tutorial/i, async (ctx) => {
  await ctx.reply(
    'Ok, saindo do tutorial, que tal outro tutorial ou um quiz?',
    buttonMenuDefault
  );
  await ctx.scene.leave();
});

GitPushCommandHandler.on('message', (ctx) => {
  ctx.reply('Confirme clicando nos botões :)');
});

module.exports = GitPushCommandHandler;
