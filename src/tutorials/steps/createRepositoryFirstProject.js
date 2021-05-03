const Composer = require('telegraf/composer');
const buttonsInline = require('./../../buttons/buttonsInline');
const buttonsKeyboard = require('./../../buttons/buttonsKeyboard');

const buttonMenuDefault = buttonsKeyboard.twoButton('Quiz', 'Tutoriais', 2);
const buttonContinue = buttonsInline.oneButton('Continuar?', 'c');
const buttonOk = buttonsInline.oneButton('OK?', 'ok');

const createRepositoryFirstProject = new Composer();

createRepositoryFirstProject.action('c', async (ctx) => {
  await ctx.reply(
    'Vamos criar um repositório no GitHub, para isso acesse o link abaixo:'
  );
  await ctx.reply('https://github.com/new');
  await ctx.reply('Preencha os campos, e após clique em ok', buttonOk);
});

createRepositoryFirstProject.action('ok', async (ctx) => {
  await ctx.reply(
    'Pronto, agora o repositório no Github está criado, veja que após a confirmação, foi direcionado para uma outra página, vamos utilizar algumas informações que estão nela.'
  );
  await ctx.reply(
    'Vamos utilizar os comandos que o GitHub forneceu para enviar os nossos commits locais.',
    buttonContinue
  );
  return ctx.wizard.next();
});

createRepositoryFirstProject.hears(/Sair do tutorial/i, async (ctx) => {
  await ctx.reply(
    'Ok, saindo do tutorial, que tal outro tutorial ou um quiz?',
    buttonMenuDefault
  );
  await ctx.scene.leave();
});

createRepositoryFirstProject.on('message', (ctx) => {
  ctx.reply('Confirme clicando nos botões :)');
});

module.exports = createRepositoryFirstProject;
