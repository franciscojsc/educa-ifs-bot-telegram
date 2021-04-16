const Composer = require('telegraf/composer');
const buttonsInline = require('./../../buttons/buttonsInline');
const buttonsKeyboard = require('./../../buttons/buttonsKeyboard');

const buttonMenuDefault = buttonsKeyboard.twoButton('Quiz', 'Tutoriais', 2);
const buttonContinue = buttonsInline.oneButton('Continuar?', 'c');

const path = require('path');
const imageCommandGitConfigUserEmail = path.join(
  __dirname,
  '..',
  '..',
  'assets',
  'imgs',
  'code',
  'git-config-user-email.png'
);
const imageCommandGitConfigGlobalList = path.join(
  __dirname,
  '..',
  '..',
  'assets',
  'imgs',
  'code',
  'git-config-global-list.png'
);
const imageCommandGitConfigResult = path.join(
  __dirname,
  '..',
  '..',
  'assets',
  'imgs',
  'code',
  'result-git-config.png'
);

const configUserEmailHandler = new Composer();

configUserEmailHandler.action('c', async (ctx) => {
  await ctx.reply(
    'Antes dos próximos passos, precisaremos realizar uma configuração para identificar o nosso usuário.'
  );
  await ctx.reply(
    'Utilize os comandos a seguir, alterando o nome e email colocando o seu:'
  );
  await ctx.replyWithPhoto({
    source: imageCommandGitConfigUserEmail,
  });
  await ctx.reply(
    'Visualize as configurações realizadas, utilizando o comando a seguir:'
  );
  await ctx.replyWithPhoto({
    source: imageCommandGitConfigGlobalList,
  });
  await ctx.replyWithMarkdown(
    'A saída do comando acima deve exibir o seu nome de seu usuário e email, ok',
    buttonContinue
  );
  return ctx.wizard.next();
});

configUserEmailHandler.hears(/Sair do tutorial/i, async (ctx) => {
  await ctx.reply(
    'Ok, saindo do tutorial, que tal outro tutorial ou um quiz?',
    buttonMenuDefault
  );
  await ctx.scene.leave();
});

configUserEmailHandler.on('message', (ctx) => {
  ctx.reply('Confirme clicando nos botões :)');
});

module.exports = configUserEmailHandler;
