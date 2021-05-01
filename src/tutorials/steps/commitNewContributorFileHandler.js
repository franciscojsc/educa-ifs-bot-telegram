const Composer = require('telegraf/composer');
const buttonsInline = require('./../../buttons/buttonsInline');
const buttonsKeyboard = require('./../../buttons/buttonsKeyboard');

const buttonMenuDefault = buttonsKeyboard.twoButton('Quiz', 'Tutoriais', 2);
const buttonContinue = buttonsInline.oneButton('Continuar?', 'c');

const path = require('path');
const imageCommandGitCommitNewBranch = path.join(
  __dirname,
  '..',
  '..',
  'assets',
  'imgs',
  'code',
  'git-commit-new-contributor.png'
);

const commitNewContributorFileHandler = new Composer();

commitNewContributorFileHandler.action('c', async (ctx) => {
  await ctx.reply(
    'No terminal, vamos utilizar o próximo comando para realizar o commit.'
  );
  await ctx.reply('Altere a palavra fulano para o seu nome.');
  await ctx.replyWithPhoto(
    {
      source: imageCommandGitCommitNewBranch,
    },
    buttonContinue
  );

  return ctx.wizard.next();
});

commitNewContributorFileHandler.hears(/Sair do tutorial/i, async (ctx) => {
  await ctx.reply(
    'Ok, saindo do tutorial, que tal outro tutorial ou um quiz?',
    buttonMenuDefault
  );
  await ctx.scene.leave();
});

commitNewContributorFileHandler.on('message', (ctx) => {
  ctx.reply('Confirme clicando nos botões :)');
});

module.exports = commitNewContributorFileHandler;
