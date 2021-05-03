const Composer = require('telegraf/composer');
const buttonsInline = require('./../../buttons/buttonsInline');
const buttonsKeyboard = require('./../../buttons/buttonsKeyboard');

const buttonMenuDefault = buttonsKeyboard.twoButton('Quiz', 'Tutoriais', 2);
const buttonContinue = buttonsInline.oneButton('Continuar?', 'c');
const buttonOK = buttonsInline.oneButton('OK?', 'ok');
const buttonConfirm = buttonsInline.confirmButton('Sim', 'Não');

const createAccountGitHubHandler = new Composer();

createAccountGitHubHandler.action('c', async (ctx) => {
  await ctx.reply('Legal, então vamos continuar.');
  await ctx.reply('E a conta no GitHub já está feita?', buttonConfirm);
});

createAccountGitHubHandler.action(['y', 'ok'], async (ctx) => {
  await ctx.reply(
    'Maravilha, agora que temos todos os requisitos, vamos iniciar'
  );
  await ctx.reply('👏', buttonContinue);
  return ctx.wizard.next();
});

createAccountGitHubHandler.action('n', async (ctx) => {
  await ctx.reply('Ok, acesse o site do GitHub e crie uma conta');
  await ctx.reply('https://github.com/join', buttonOK);
});

createAccountGitHubHandler.hears(/Sair do tutorial/i, async (ctx) => {
  await ctx.reply(
    'Ok, saindo do tutorial, que tal outro tutorial ou um quiz?',
    buttonMenuDefault
  );
  await ctx.scene.leave();
});

createAccountGitHubHandler.on('message', (ctx) => {
  ctx.reply('Confirme clicando nos botões :)');
});

module.exports = createAccountGitHubHandler;
