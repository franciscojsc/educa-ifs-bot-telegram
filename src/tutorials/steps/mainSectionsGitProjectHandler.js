const Composer = require('telegraf/composer');
const buttonsInline = require('./../../buttons/buttonsInline');
const buttonsKeyboard = require('./../../buttons/buttonsKeyboard');

const buttonMenuDefault = buttonsKeyboard.twoButton('Quiz', 'Tutoriais', 2);
const buttonContinue = buttonsInline.oneButton('Continuar?', 'c');

const mainSectionsGitProjectHandler = new Composer();

mainSectionsGitProjectHandler.action('c', async (ctx) => {
  await ctx.replyWithPhoto('https://git-scm.com/book/en/v2/images/areas.png', {
    caption:
      'Disponível em: https://git-scm.com/book/pt-br/v2/Come%C3%A7ando-O-B%C3%A1sico-do-Git',
  });
  await ctx.reply('O Git possui três seções principais:');

  await ctx.replyWithMarkdown(
    `- Diretório de trabalho (_Working Directory_):
  Arquivos adicionados ou modificados do projeto.
- Área de preparo (_Staging Area_):
  Local para reunir os arquivos antes de criar um nova versão.
- Diretório Git (_Repository_):
  Onde fica armazenado as informações sobre o projeto.`,
    buttonContinue
  );
  return ctx.wizard.next();
});

mainSectionsGitProjectHandler.hears(/Sair do tutorial/i, async (ctx) => {
  await ctx.reply(
    'Ok, saindo do tutorial, que tal outro tutorial ou um quiz?',
    buttonMenuDefault
  );
  await ctx.scene.leave();
});

mainSectionsGitProjectHandler.on('message', (ctx) => {
  ctx.reply('Confirme clicando nos botões :)');
});

module.exports = mainSectionsGitProjectHandler;
