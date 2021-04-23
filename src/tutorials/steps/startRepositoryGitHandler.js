const Composer = require('telegraf/composer');
const buttonsInline = require('./../../buttons/buttonsInline');
const buttonsKeyboard = require('./../../buttons/buttonsKeyboard');

const buttonMenuDefault = buttonsKeyboard.twoButton('Quiz', 'Tutoriais', 2);
const buttonContinue = buttonsInline.oneButton('Continuar?', 'c');
const buttonOK = buttonsInline.oneButton('Confirmar?', 'ok');

const path = require('path');
const imageCommandGitInit = path.join(
  __dirname,
  '..',
  '..',
  'assets',
  'imgs',
  'code',
  'git-init.png'
);
const imageCommandGitInitResult = path.join(
  __dirname,
  '..',
  '..',
  'assets',
  'imgs',
  'code',
  'result-git-init.png'
);

const startRepositoryGitHandler = new Composer();

startRepositoryGitHandler.action(['y', 'ok'], async (ctx) => {
  await ctx.replyWithMarkdown(
    'Agora vamos iniciar o repositório Git na pasta `site-bot`.'
  );
  await ctx.replyWithMarkdown(
    `O comando \`git init\` é utilizado para iniciar o repositório local, pode ser utilizado em uma pasta vazia ou com arquivos existentes.`
  );
  await ctx.replyWithMarkdown(
    'Abra o terminal, e dentro da pasta `site-bot` execute o código a seguir:'
  );
  await ctx.replyWithPhoto(
    {
      source: imageCommandGitInit,
    },
    {
      caption: 'Comando para iniciar um repositório Git',
    }
  );
  await ctx.reply('A saída deve estar semelhante a imagem abaixo');
  await ctx.replyWithPhoto(
    {
      source: imageCommandGitInitResult,
    },
    buttonContinue
  );
  return ctx.wizard.next();
});

startRepositoryGitHandler.action('n', async (ctx) => {
  await ctx.reply('Ok, estou aguardando você, ✌️');
  await ctx.reply('Confirme quando terminar', buttonOK);
});

startRepositoryGitHandler.hears(/Sair do tutorial/i, async (ctx) => {
  await ctx.reply(
    'Ok, saindo do tutorial, que tal outro tutorial ou um quiz?',
    buttonMenuDefault
  );
  await ctx.scene.leave();
});

startRepositoryGitHandler.on('message', (ctx) => {
  ctx.reply('Confirme clicando nos botões :)');
});

module.exports = startRepositoryGitHandler;
