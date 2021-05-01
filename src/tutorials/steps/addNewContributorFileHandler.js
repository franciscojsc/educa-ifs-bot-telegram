const Composer = require('telegraf/composer');
const buttonsInline = require('./../../buttons/buttonsInline');
const buttonsKeyboard = require('./../../buttons/buttonsKeyboard');

const buttonMenuDefault = buttonsKeyboard.twoButton('Quiz', 'Tutoriais', 2);
const buttonContinue = buttonsInline.oneButton('Continuar?', 'c');
const buttonOK = buttonsInline.oneButton('OK?', 'ok');
const buttonPositive = buttonsInline.oneButton('Certo?', 'positive');

const addNewContributorFileHandler = new Composer();

addNewContributorFileHandler.action('c', async (ctx) => {
  await ctx.reply(
    'Deixe o terminal aberto, vamos utiliza-ló ainda e siga os próximos passos'
  );
  await ctx.replyWithMarkdown(
    'Nesse momento, sem utilizar o terminal, procure pela pasta `educa-ifs-treinamento` que baixamos, ela deve estar na "Área de trabalho" ou no seu" diretório pessoal".'
  );
  await ctx.replyWithMarkdown(
    'Dentro do pasta tem um arquivo com o nome `contribuidores.txt`',
    buttonOK
  );
});

addNewContributorFileHandler.action('ok', async (ctx) => {
  await ctx.reply('Que legal');
  await ctx.reply('👍');
  await ctx.replyWithMarkdown(
    'Agora abra o arquivo com seu editor de texto favorito e adicione o seu usuário do GitHub em uma nova linha.',
    buttonPositive
  );
});

addNewContributorFileHandler.action('positive', async (ctx) => {
  await ctx.replyWithMarkdown(
    'Após salvar o arquivo `contribuidores.txt`, vamos fazer o commit'
  );
  await ctx.replyWithMarkdown(
    'Lembrando que o _commit_ vai criar uma nova versão dos arquivos alterados'
  );
  await ctx.reply('😅');
  await ctx.replyWithMarkdown(
    'Eita, quase esqueci, vamos voltar ao terminal pra continuar?',
    buttonContinue
  );

  return ctx.wizard.next();
});

addNewContributorFileHandler.hears(/Sair do tutorial/i, async (ctx) => {
  await ctx.reply(
    'Ok, saindo do tutorial, que tal outro tutorial ou um quiz?',
    buttonMenuDefault
  );
  await ctx.scene.leave();
});

addNewContributorFileHandler.on('message', (ctx) => {
  ctx.reply('Confirme clicando nos botões :)');
});

module.exports = addNewContributorFileHandler;
