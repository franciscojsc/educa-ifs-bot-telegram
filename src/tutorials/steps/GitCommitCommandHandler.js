const Composer = require('telegraf/composer');
const buttonsInline = require('./../../buttons/buttonsInline');
const buttonsKeyboard = require('./../../buttons/buttonsKeyboard');

const buttonMenuDefault = buttonsKeyboard.twoButton('Quiz', 'Tutoriais', 2);
const buttonContinue = buttonsInline.oneButton('Continuar?', 'c');
const buttonOk = buttonsInline.oneButton('OK?', 'ok');

const path = require('path');
const imageCommandGitCommit = path.join(
  __dirname,
  '..',
  '..',
  'assets',
  'imgs',
  'code',
  'git-commit.png'
);
const imageCommandGitCommitResult = path.join(
  __dirname,
  '..',
  '..',
  'assets',
  'imgs',
  'code',
  'result-git-commit.png'
);

const GitCommitCommandHandler = new Composer();

GitCommitCommandHandler.action('c', async (ctx) => {
  await ctx.reply('Chegou o momento de criar uma versão do seu arquivo.');
  await ctx.replyWithMarkdown(
    'O comando `git commit` é utilizado para criar um ponto na história com os arquivos que estão na área de preparo (_Staging Area_).'
  );
  await ctx.reply('Execute o código a seguir:');
  await ctx.replyWithPhoto({
    source: imageCommandGitCommit,
  });
  await ctx.reply('A saída será semelhante a imagem abaixo:');
  await ctx.replyWithPhoto({
    source: imageCommandGitCommitResult,
  });
  await ctx.replyWithMarkdown(
    'Podemos perceber que utilizamos uma opção `-m` e uma pequena frase entre aspas, isso é para você colocar uma pequena mensagem sobre o que representa esse ponto da história.',
    buttonOk
  );
});

GitCommitCommandHandler.action('ok', async (ctx) => {
  await ctx.replyWithMarkdown('Que legal, criamos o nosso primeiro `commit`');
  await ctx.replyWithMarkdown('🥳', buttonContinue);
  return ctx.wizard.next();
});

GitCommitCommandHandler.hears(/Sair do tutorial/i, async (ctx) => {
  await ctx.reply(
    'Ok, saindo do tutorial, que tal outro tutorial ou um quiz?',
    buttonMenuDefault
  );
  await ctx.scene.leave();
});

GitCommitCommandHandler.on('message', (ctx) => {
  ctx.reply('Confirme clicando nos botões :)');
});

module.exports = GitCommitCommandHandler;
