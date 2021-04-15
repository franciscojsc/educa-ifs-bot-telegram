const Composer = require('telegraf/composer');
const buttonsInline = require('./../../buttons/buttonsInline');
const buttonsKeyboard = require('./../../buttons/buttonsKeyboard');

const buttonMenuDefault = buttonsKeyboard.twoButton('Quiz', 'Tutoriais', 2);
const buttonContinue = buttonsInline.oneButton('Continuar?', 'c');

const path = require('path');
const imageCommandGitStatus = path.join(
  __dirname,
  '..',
  '..',
  'assets',
  'imgs',
  'code',
  'git-status.png'
);
const imageCommandGitStatusResult = path.join(
  __dirname,
  '..',
  '..',
  'assets',
  'imgs',
  'code',
  'result-git-status.png'
);

const GitStatusCommandHandler = new Composer();

GitStatusCommandHandler.action('c', async (ctx) => {
  await ctx.replyWithMarkdown(
    'O comando `git status` é muito útil para podemos ver os status dos arquivos, iremos utilizar bastante.'
  );
  await ctx.reply('Execute o código a seguir, no projeto site-bot:');
  await ctx.replyWithPhoto(
    {
      source: imageCommandGitStatus,
    },
    {
      caption: 'Comando para visualizar os status dos arquivos',
    }
  );
  await ctx.replyWithMarkdown(
    'A saída deve está semelhante a imagem abaixo, que mostra que temos um arquivo com o status `untracked`.'
  );
  await ctx.replyWithPhoto(
    {
      source: imageCommandGitStatusResult,
    },
    buttonContinue
  );
  return ctx.wizard.next();
});

GitStatusCommandHandler.hears(/Sair do tutorial/i, async (ctx) => {
  await ctx.reply(
    'Ok, saindo do tutorial, que tal outro tutorial ou um quiz?',
    buttonMenuDefault
  );
  await ctx.scene.leave();
});

GitStatusCommandHandler.on('message', (ctx) => {
  ctx.reply('Confirme clicando nos botões :)');
});

module.exports = GitStatusCommandHandler;
