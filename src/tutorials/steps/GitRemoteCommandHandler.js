const Composer = require('telegraf/composer');
const buttonsInline = require('./../../buttons/buttonsInline');
const buttonsKeyboard = require('./../../buttons/buttonsKeyboard');

const buttonMenuDefault = buttonsKeyboard.twoButton('Quiz', 'Tutoriais', 2);
const buttonContinue = buttonsInline.oneButton('Continuar?', 'c');

const GitRemoteCommandHandler = new Composer();

GitRemoteCommandHandler.action('c', async (ctx) => {
  await ctx.reply(
    'Com o terminal aberto no projeto local, vamos adicionar uma forma de reconhecer o repositório remoto no GitHub, utilizando os comandos que ele forneceu'
  );
  await ctx.replyWithMarkdown(
    'Execute o comando `git remote add URL` que o GitHub forneceu:'
  );
  await ctx.replyWithMarkdown(
    'O comando `git remote` é utilizado para indicar o servidor onde será enviados os commits',
    buttonContinue
  );
  return ctx.wizard.next();
});

GitRemoteCommandHandler.hears(/Sair do tutorial/i, async (ctx) => {
  await ctx.reply(
    'Ok, saindo do tutorial, que tal outro tutorial ou um quiz?',
    buttonMenuDefault
  );
  await ctx.scene.leave();
});

GitRemoteCommandHandler.on('message', (ctx) => {
  ctx.reply('Confirme clicando nos botões :)');
});

module.exports = GitRemoteCommandHandler;
