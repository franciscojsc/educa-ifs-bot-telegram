const Composer = require('telegraf/composer');
const buttonsInline = require('./../../buttons/buttonsInline');
const buttonsKeyboard = require('./../../buttons/buttonsKeyboard');

const buttonMenuDefault = buttonsKeyboard.twoButton('Quiz', 'Tutoriais', 2);
const buttonContinue = buttonsInline.oneButton('Continuar?', 'c');

const path = require('path');
const imageCommandGitAdd = path.join(
  __dirname,
  '..',
  '..',
  'assets',
  'imgs',
  'code',
  'git-add.png'
);
const imageCommandGitAddStatusResult = path.join(
  __dirname,
  '..',
  '..',
  'assets',
  'imgs',
  'code',
  'result-git-add-untracked-staged-status.png'
);

const GitAddCommandHandler = new Composer();

GitAddCommandHandler.action('c', async (ctx) => {
  await ctx.replyWithMarkdown(
    'O comando `git add` é utilizado para mover arquivos do diretório de trabalho (_Working Directory_) para a área de preparo (_Staging Area_).'
  );
  await ctx.reply('Execute o código a seguir:');
  await ctx.replyWithPhoto({
    source: imageCommandGitAdd,
  });
  await ctx.replyWithMarkdown(
    'Agora vamos observar o status do arquivo com o comando `git status`'
  );
  await ctx.replyWithMarkdown(
    'A saída deve está semelhante a imagem abaixo, que mostra que temos um arquivo adicionado na área de preparo (_Staging Area_)'
  );
  await ctx.replyWithPhoto(
    {
      source: imageCommandGitAddStatusResult,
    },
    buttonContinue
  );
  return ctx.wizard.next();
});

GitAddCommandHandler.hears(/Sair do tutorial/i, async (ctx) => {
  await ctx.reply(
    'Ok, saindo do tutorial, que tal outro tutorial ou um quiz?',
    buttonMenuDefault
  );
  await ctx.scene.leave();
});

GitAddCommandHandler.on('message', (ctx) => {
  ctx.reply('Confirme clicando nos botões :)');
});

module.exports = GitAddCommandHandler;
