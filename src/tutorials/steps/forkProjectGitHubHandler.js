const Composer = require('telegraf/composer');
const buttonsInline = require('./../../buttons/buttonsInline');
const buttonsKeyboard = require('./../../buttons/buttonsKeyboard');

const buttonMenuDefault = buttonsKeyboard.twoButton('Quiz', 'Tutoriais', 2);
const buttonContinue = buttonsInline.oneButton('Continuar?', 'c');

const forkProjectGitHubHandler = new Composer();

forkProjectGitHubHandler.action('c', async (ctx) => {
  await ctx.reply('Acesse o repositório do link abaixo');
  await ctx.reply('https://github.com/franciscojsc/educa-ifs-treinamento');
  await ctx.replyWithMarkdown(
    'Clique no botão `Fork`, para realizar uma cópia do repositório para o seu usuário',
    buttonContinue
  );
  return ctx.wizard.next();
});

forkProjectGitHubHandler.hears(/Sair do tutorial/i, async (ctx) => {
  await ctx.reply(
    'Ok, saindo do tutorial, que tal outro tutorial ou um quiz?',
    buttonMenuDefault
  );
  await ctx.scene.leave();
});

forkProjectGitHubHandler.on('message', (ctx) => {
  ctx.reply('Confirme clicando nos botões :)');
});

module.exports = forkProjectGitHubHandler;
