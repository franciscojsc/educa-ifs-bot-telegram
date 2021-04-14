const Composer = require('telegraf/composer');
const buttonsInline = require('./../../buttons/buttonsInline');
const buttonsKeyboard = require('./../../buttons/buttonsKeyboard');

const buttonMenuDefault = buttonsKeyboard.twoButton('Quiz', 'Tutoriais', 2);
const buttonContinue = buttonsInline.oneButton('Continuar?', 'c');
const buttonConfirm = buttonsInline.confirmButton('Sim', 'Não');

const installGitHandler = new Composer();

installGitHandler.action('ok', async (ctx) => {
  await ctx.reply(
    'Vamos precisar do Git instalado na máquina, acesse o link abaixo, para realizar a instalação.'
  );
  await ctx.reply(
    'https://git-scm.com/book/pt-br/v2/Come%C3%A7ando-Instalando-o-Git',
    buttonContinue
  );
});

installGitHandler.action('c', async (ctx) => {
  await ctx.reply('Legal, então vamos continuar!');
  await ctx.reply('Você instalou no sistema Windows?!');
  await ctx.replyWithPhoto('http://gph.is/1KxfmWg', buttonConfirm);
});

installGitHandler.action('y', async (ctx) => {
  await ctx.reply(
    'Certo, então, vamos utilizar o Git Bash que foi instalado junto com o Git'
  );
  await ctx.reply(
    `O Git Bash é um aplicativo, instalado com o Git no sistema Windows, que permite utilizar comandos do Bash.`
  );
  await ctx.reply('Crie uma pasta para o nosso projeto com o nome site-bot');
  await ctx.reply('Já criou? Estou esperando 😉', buttonConfirm);
  return ctx.wizard.next();
});

installGitHandler.action('n', async (ctx) => {
  await ctx.reply('Blz, menos mau, kkk');
  await ctx.replyWithPhoto('http://gph.is/1g9ATqH');
  await ctx.reply('😂');
  await ctx.reply('Brincadeiras à parte, vamos continuar');
  await ctx.reply('Crie uma pasta para o nosso projeto com o nome site-bot');
  await ctx.reply('Já criou? Estou esperando 😉', buttonConfirm);
  return ctx.wizard.next();
});

installGitHandler.hears(/Sair do tutorial/i, async (ctx) => {
  await ctx.reply(
    'Ok, saindo do tutorial, que tal outro tutorial ou um quiz?',
    buttonMenuDefault
  );
  await ctx.scene.leave();
});

installGitHandler.on('message', (ctx) => {
  ctx.reply('Confirme clicando nos botões :)');
});

module.exports = installGitHandler;
