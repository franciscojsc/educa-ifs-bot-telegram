const Composer = require('telegraf/composer');
const buttonsInline = require('./../../buttons/buttonsInline');
const buttonsKeyboard = require('./../../buttons/buttonsKeyboard');

const buttonMenuDefault = buttonsKeyboard.twoButton('Quiz', 'Tutoriais', 2);
const buttonContinue = buttonsInline.oneButton('Continuar?', 'c');

const path = require('path');
const imageCommandGitPushNewBranch = path.join(
  __dirname,
  '..',
  '..',
  'assets',
  'imgs',
  'code',
  'git-push-new-contributor-branch.png'
);

const pushBranchNewContributorGitHubHandler = new Composer();

pushBranchNewContributorGitHubHandler.action('c', async (ctx) => {
  await ctx.reply(
    'Chegou o momento de enviar as nossas alterações para o GitHub.'
  );
  await ctx.reply(
    'Para isso, vamos precisar enviar o branch que criamos e adicionamos a alteração'
  );

  await ctx.replyWithMarkdown(
    'Utilize o comando a seguir para enviar ao **GitHub**. Altere a palavra `contribuidor-fulano` para o nome do seu _branch_ que criamos anteriormente.'
  );
  await ctx.replyWithPhoto(
    {
      source: imageCommandGitPushNewBranch,
    },
    buttonContinue
  );

  return ctx.wizard.next();
});

pushBranchNewContributorGitHubHandler.hears(
  /Sair do tutorial/i,
  async (ctx) => {
    await ctx.reply(
      'Ok, saindo do tutorial, que tal outro tutorial ou um quiz?',
      buttonMenuDefault
    );
    await ctx.scene.leave();
  }
);

pushBranchNewContributorGitHubHandler.on('message', (ctx) => {
  ctx.reply('Confirme clicando nos botões :)');
});

module.exports = pushBranchNewContributorGitHubHandler;
