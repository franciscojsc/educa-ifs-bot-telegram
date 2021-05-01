const Composer = require('telegraf/composer');
const buttonsInline = require('./../../buttons/buttonsInline');
const buttonsKeyboard = require('./../../buttons/buttonsKeyboard');

const buttonMenuDefault = buttonsKeyboard.twoButton('Quiz', 'Tutoriais', 2);
const buttonExit = buttonsInline.oneButton('Finalizar Tutorial?', 'exit');
const buttonOK = buttonsInline.oneButton('OK?', 'ok');
const buttonPositive = buttonsInline.oneButton('Certo?', 'positive');

const path = require('path');
const imageCommandGitCommitNewBranch = path.join(
  __dirname,
  '..',
  '..',
  'assets',
  'imgs',
  'code',
  'git-commit-new-contributor.png'
);

const createPullRequestProjectGitHubHandler = new Composer();

createPullRequestProjectGitHubHandler.action('c', async (ctx) => {
  await ctx.replyWithMarkdown(
    'Volte para o repositório no site do GitHub, atualize a página, e perceba que temos uma opção para fazermos um _Pull Request_.'
  );
  await ctx.replyWithMarkdown(
    'O _Pull Request_ é uma funcionalidade de algumas plataformas que hospedam projetos Git. Com o uso do _Pull Request_, temos a possibilidade de realizar um pedido ao dono do repositório, para que aceite os nossos commits.'
  );
  await ctx.replyWithMarkdown(
    'Clique no botão `Compare & pull request`',
    buttonOK
  );
});

createPullRequestProjectGitHubHandler.action('ok', async (ctx) => {
  await ctx.replyWithMarkdown('Agora vamos criar o _Pull Request_');
  await ctx.replyWithMarkdown(
    'Adicione uma mensagem sobre sua solicitação e clique no botão `Create pull request`',
    buttonPositive
  );
});

createPullRequestProjectGitHubHandler.action('positive', async (ctx) => {
  await ctx.reply('Estou muito feliz, você concluiu o tutorial com sucesso');
  await ctx.reply('🎊');
  await ctx.reply(
    'Quando ele  aceitar você estará no site do link abaixo como um contribuidor.'
  );
  await ctx.reply(
    'https://franciscojsc.github.io/educa-ifs-treinamento',
    buttonExit
  );

  return ctx.wizard.next();
});

createPullRequestProjectGitHubHandler.hears(
  /Sair do tutorial/i,
  async (ctx) => {
    await ctx.reply(
      'Ok, saindo do tutorial, que tal outro tutorial ou um quiz?',
      buttonMenuDefault
    );
    await ctx.scene.leave();
  }
);

createPullRequestProjectGitHubHandler.on('message', (ctx) => {
  ctx.reply('Confirme clicando nos botões :)');
});

module.exports = createPullRequestProjectGitHubHandler;
