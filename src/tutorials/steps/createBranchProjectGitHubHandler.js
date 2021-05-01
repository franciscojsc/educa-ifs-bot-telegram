const Composer = require('telegraf/composer');
const buttonsInline = require('./../../buttons/buttonsInline');
const buttonsKeyboard = require('./../../buttons/buttonsKeyboard');

const buttonMenuDefault = buttonsKeyboard.twoButton('Quiz', 'Tutoriais', 2);
const buttonContinue = buttonsInline.oneButton('Continuar?', 'c');
const buttonOK = buttonsInline.oneButton('OK?', 'ok');

const path = require('path');
const imageCommandGitNewBranch = path.join(
  __dirname,
  '..',
  '..',
  'assets',
  'imgs',
  'code',
  'git-branch-new-contributor.png'
);
const imageCommandBranch = path.join(
  __dirname,
  '..',
  '..',
  'assets',
  'imgs',
  'code',
  'git-branch.png'
);

const createBranchProjectGitHubHandler = new Composer();

createBranchProjectGitHubHandler.action('c', async (ctx) => {
  await ctx.replyWithMarkdown(
    'Agora, vamos criar um _branch_ para adicionar nossas alterações'
  );
  await ctx.replyWithMarkdown(
    'Utilize o comando a seguir alterando o nome fulano pelo seu nome:'
  );
  await ctx.replyWithPhoto(
    {
      source: imageCommandGitNewBranch,
    },
    buttonOK
  );
});

createBranchProjectGitHubHandler.action('ok', async (ctx) => {
  await ctx.replyWithMarkdown(
    'Estamos em outro _branch_, utilize o comando a seguir para visualizar'
  );
  await ctx.replyWithPhoto({
    source: imageCommandBranch,
  });
  await ctx.replyWithMarkdown(
    'Podemos observar que no resultado tem um asterisco no _branch_ que foi criado, isso indica o _branch_ que estamos atualmente',
    buttonContinue
  );

  return ctx.wizard.next();
});

createBranchProjectGitHubHandler.hears(/Sair do tutorial/i, async (ctx) => {
  await ctx.reply(
    'Ok, saindo do tutorial, que tal outro tutorial ou um quiz?',
    buttonMenuDefault
  );
  await ctx.scene.leave();
});

createBranchProjectGitHubHandler.on('message', (ctx) => {
  ctx.reply('Confirme clicando nos botões :)');
});

module.exports = createBranchProjectGitHubHandler;
