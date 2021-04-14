const Composer = require('telegraf/composer');
const buttonsInline = require('./../../buttons/buttonsInline');
const buttonsKeyboard = require('./../../buttons/buttonsKeyboard');

const buttonMenuDefault = buttonsKeyboard.twoButton('Quiz', 'Tutoriais', 2);
const buttonConfirm = buttonsInline.confirmButton('Sim', 'Não');

const path = require('path');
const fileHTML = path.join(
  __dirname,
  '..',
  '..',
  'assets',
  'html',
  'index.html'
);

const createProjectHandler = new Composer();

createProjectHandler.action('y', async (ctx) => {
  await ctx.reply(
    'Agora entre na pasta que você criou, e adicione este arquivo dentro'
  );
  await ctx.replyWithDocument({ source: fileHTML, filename: 'index.html' });
  await ctx.reply('Adicionou o arquivo na pasta?', buttonConfirm);
  return ctx.wizard.next();
});

createProjectHandler.action('n', async (ctx) => {
  await ctx.reply('Blz, sem pressa.');
  await ctx.reply('✌️');
  await ctx.reply('Já criou? Estou esperando 😉', buttonConfirm);
});

createProjectHandler.hears(/Sair do tutorial/i, async (ctx) => {
  await ctx.reply(
    'Ok, saindo do tutorial, que tal outro tutorial ou um quiz?',
    buttonMenuDefault
  );
  await ctx.scene.leave();
});

createProjectHandler.on('message', (ctx) => {
  ctx.reply('Confirme clicando nos botões :)');
});

module.exports = createProjectHandler;
