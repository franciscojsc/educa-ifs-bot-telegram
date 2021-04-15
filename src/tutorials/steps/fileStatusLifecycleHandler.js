const Composer = require('telegraf/composer');
const buttonsInline = require('./../../buttons/buttonsInline');
const buttonsKeyboard = require('./../../buttons/buttonsKeyboard');

const buttonMenuDefault = buttonsKeyboard.twoButton('Quiz', 'Tutoriais', 2);
const buttonContinue = buttonsInline.oneButton('Continuar?', 'c');

const fileStatusLifecycleHandler = new Composer();

fileStatusLifecycleHandler.action('c', async (ctx) => {
  await ctx.reply(
    'Vamos conhecer o ciclo de vida dos status dos arquivos no Git.'
  );
  await ctx.replyWithPhoto(
    'https://www.git-scm.com/book/en/v2/images/lifecycle.png',
    {
      caption:
        'Disponível em: https://www.git-scm.com/book/pt-br/v2/Fundamentos-de-Git-Gravando-Altera%C3%A7%C3%B5es-em-Seu-Reposit%C3%B3rio',
    }
  );
  await ctx.reply('O Git possui 4 status definidos para os arquivos, que são:');

  await ctx.replyWithMarkdown(
    `- \`untracked\`
  Quando o arquivo foi criado ou adicionado, mas o Git não consegue encontrar nenhuma versão anterior.
- \`unmodified\`
  Após adicionar o arquivo no Git e o arquivo não sofreu alterações.
- \`modified\`
  Se houver alterações no arquivo e ainda não estiver salvo no repositório Git.
- \`staged\`
  Quando o arquivo está na área de preparação, antes de criar uma versão dos arquivos.`,
    buttonContinue
  );
  return ctx.wizard.next();
});

fileStatusLifecycleHandler.hears(/Sair do tutorial/i, async (ctx) => {
  await ctx.reply(
    'Ok, saindo do tutorial, que tal outro tutorial ou um quiz?',
    buttonMenuDefault
  );
  await ctx.scene.leave();
});

fileStatusLifecycleHandler.on('message', (ctx) => {
  ctx.reply('Confirme clicando nos botões :)');
});

module.exports = fileStatusLifecycleHandler;
