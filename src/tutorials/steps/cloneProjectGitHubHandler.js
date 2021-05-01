const Composer = require('telegraf/composer');
const buttonsInline = require('./../../buttons/buttonsInline');
const buttonsKeyboard = require('./../../buttons/buttonsKeyboard');

const buttonMenuDefault = buttonsKeyboard.twoButton('Quiz', 'Tutoriais', 2);
const buttonContinue = buttonsInline.oneButton('Continuar?', 'c');
const buttonOK = buttonsInline.oneButton('OK?', 'ok');

const path = require('path');
const imageCommandGitClone = path.join(
  __dirname,
  '..',
  '..',
  'assets',
  'imgs',
  'code',
  'git-clone-educa-ifs-treinamento.png'
);
const imageEnterDirectoryProject = path.join(
  __dirname,
  '..',
  '..',
  'assets',
  'imgs',
  'code',
  'enter-directory-project.png'
);

const cloneProjectGitHubHandler = new Composer();

cloneProjectGitHubHandler.action('c', async (ctx) => {
  await ctx.reply(
    'Pronto, temos uma cópia, agora iremos realizar o clone do projeto para nossa máquina local'
  );
  await ctx.replyWithMarkdown(
    'Clique no botão `Code` e copie a URL.',
    buttonOK
  );
});

cloneProjectGitHubHandler.action('ok', async (ctx) => {
  await ctx.reply(
    'Abra o terminal, e digite o comando a seguir alterando a URL pela a que você copiou'
  );
  await ctx.replyWithPhoto({
    source: imageCommandGitClone,
  });
  await ctx.replyWithMarkdown(
    'Após clonar o projeto, entre na pasta `educa-ifs-treinamento` utilizando o comando abaixo:'
  );
  await ctx.replyWithPhoto(
    {
      source: imageEnterDirectoryProject,
    },
    buttonContinue
  );

  return ctx.wizard.next();
});

cloneProjectGitHubHandler.hears(/Sair do tutorial/i, async (ctx) => {
  await ctx.reply(
    'Ok, saindo do tutorial, que tal outro tutorial ou um quiz?',
    buttonMenuDefault
  );
  await ctx.scene.leave();
});

cloneProjectGitHubHandler.on('message', (ctx) => {
  ctx.reply('Confirme clicando nos botões :)');
});

module.exports = cloneProjectGitHubHandler;
