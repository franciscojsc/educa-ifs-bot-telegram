const Composer = require('telegraf/composer');
const buttonsInline = require('./../../buttons/buttonsInline');
const buttonsKeyboard = require('./../../buttons/buttonsKeyboard');

const buttonMenuDefault = buttonsKeyboard.twoButton('Quiz', 'Tutoriais', 2);
const buttonContinue = buttonsInline.oneButton('Continuar?', 'c');

const path = require('path');
const imageCommandAlterHTML = path.join(
  __dirname,
  '..',
  '..',
  'assets',
  'imgs',
  'code',
  'alter-html.png'
);

const editFileHandler = new Composer();

editFileHandler.action('c', async (ctx) => {
  await ctx.reply('Ops!');
  await ctx.reply('😅');
  await ctx.replyWithMarkdown(
    'Faltou algo para fazer, vamos adicionar o seu nome no arquivo `index.html`'
  );
  await ctx.replyWithMarkdown(
    'Abra o arquivo `index.html` com seu editor de texto preferido e altere a linha do título adicionando o conteúdo a seguir com o seu nome.'
  );
  await ctx.replyWithMarkdown('`<h1>Seu nome</h1>`');
  await ctx.reply('Vai ficar mais ou menos com está na imagem abaixo');
  await ctx.reply('👇');
  await ctx.replyWithPhoto(
    {
      source: imageCommandAlterHTML,
    },
    buttonContinue
  );
  return ctx.wizard.next();
});

editFileHandler.hears(/Sair do tutorial/i, async (ctx) => {
  await ctx.reply(
    'Ok, saindo do tutorial, que tal outro tutorial ou um quiz?',
    buttonMenuDefault
  );
  await ctx.scene.leave();
});

editFileHandler.on('message', (ctx) => {
  ctx.reply('Confirme clicando nos botões :)');
});

module.exports = editFileHandler;
