const Composer = require('telegraf/composer');
const buttonsInline = require('./../../buttons/buttonsInline');
const buttonsKeyboard = require('./../../buttons/buttonsKeyboard');

const buttonMenuDefault = buttonsKeyboard.twoButton('Quiz', 'Tutoriais', 2);
const buttonContinue = buttonsInline.oneButton('Continuar?', 'c');

const path = require('path');
const imageCommandGitLog = path.join(
  __dirname,
  '..',
  '..',
  'assets',
  'imgs',
  'code',
  'git-log.png'
);
const imageCommandGitLogResult = path.join(
  __dirname,
  '..',
  '..',
  'assets',
  'imgs',
  'code',
  'git-log-result.png'
);

const GitLogCommandHandler = new Composer();

GitLogCommandHandler.action('c', async (ctx) => {
  await ctx.reply(
    'O nosso arquivo está salvo no repositório do Git, mas como visualizar o histórico?'
  );
  await ctx.reply('🤔');
  await ctx.replyWithMarkdown(
    'Para isso temos o comando `git log`, utilizado para exibir o histórico de _commits_.'
  );
  await ctx.reply('Execute o código a seguir:');
  await ctx.replyWithPhoto({
    source: imageCommandGitLog,
  });
  await ctx.reply('A saída será semelhante a imagem abaixo:');
  await ctx.replyWithPhoto({
    source: imageCommandGitLogResult,
  });
  await ctx.replyWithMarkdown(
    'Para sair da visualização do histórico, clique na letra Q do teclado ⌨.',
    buttonContinue
  );
  return ctx.wizard.next();
});

GitLogCommandHandler.hears(/Sair do tutorial/i, async (ctx) => {
  await ctx.reply(
    'Ok, saindo do tutorial, que tal outro tutorial ou um quiz?',
    buttonMenuDefault
  );
  await ctx.scene.leave();
});

GitLogCommandHandler.on('message', (ctx) => {
  ctx.reply('Confirme clicando nos botões :)');
});

module.exports = GitLogCommandHandler;
