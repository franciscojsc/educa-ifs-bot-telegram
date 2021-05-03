const Composer = require('telegraf/composer');
const buttonsInline = require('./../../buttons/buttonsInline');
const buttonsKeyboard = require('./../../buttons/buttonsKeyboard');

const buttonMenuDefault = buttonsKeyboard.twoButton('Quiz', 'Tutoriais', 2);
const buttonContinue = buttonsInline.oneButton('Continuar?', 'c');
const buttonNext = buttonsInline.oneButton('Continuar?', 'proximo');
const buttonOk = buttonsInline.oneButton('OK?', 'ok');

const path = require('path');
const imageCommandGitLogTwoVersion = path.join(
  __dirname,
  '..',
  '..',
  'assets',
  'imgs',
  'code',
  'result-git-log-two-version.png'
);

const GitReviewHandler = new Composer();

GitReviewHandler.action('c', async (ctx) => {
  await ctx.replyWithMarkdown(
    'Vamos seguir os passos anteriores para o arquivo `index.html` que foi alterado.'
  );
  await ctx.reply('Veja o status do arquivo:');
  await ctx.replyWithMarkdown('`git status`');
  await ctx.replyWithMarkdown(
    'Adicione o arquivo na área de preparo (_Staging Area_)'
  );
  await ctx.replyWithMarkdown('`git add index.html`');
  await ctx.replyWithMarkdown(
    'E por fim, fazemos o _commit_, salvando a alteração no histórico.'
  );
  await ctx.replyWithMarkdown('`git commit -m "Alterando título"`', buttonOk);
});

GitReviewHandler.action('ok', async (ctx) => {
  await ctx.replyWithMarkdown(
    'Se observarmos o histórico de _commits_, podemos ver que temos duas versões.'
  );
  await ctx.replyWithMarkdown('`git log`');
  await ctx.replyWithPhoto({
    source: imageCommandGitLogTwoVersion,
  });
  await ctx.reply(
    'Lembre-se que para sair do modo de visualização do histórico, pressione a tecla Q do teclado ⌨',
    buttonNext
  );
});

GitReviewHandler.action('proximo', async (ctx) => {
  await ctx.reply('Pronto, aprendermos o básico sobre o Git.');
  await ctx.reply('🎉');
  await ctx.replyWithMarkdown(
    'De forma resumida, este é o fluxo básico de trabalho com Git:'
  );
  await ctx.replyWithMarkdown(
    `
1. Adicionar ou alterar arquivos no diretório de trabalho (_Working Directory_)
2. Mover os arquivos para área de preparo (_Staging Area_)
3. Fazer o _commit_ dos arquivos que estão na área de preparo`,
    buttonContinue
  );
  return ctx.wizard.next();
});

GitReviewHandler.hears(/Sair do tutorial/i, async (ctx) => {
  await ctx.reply(
    'Ok, saindo do tutorial, que tal outro tutorial ou um quiz?',
    buttonMenuDefault
  );
  await ctx.scene.leave();
});

GitReviewHandler.on('message', (ctx) => {
  ctx.reply('Confirme clicando nos botões :)');
});

module.exports = GitReviewHandler;
