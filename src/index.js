const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.TOKEN);

const path = require('path');
const botImage = path.join(__dirname, 'assets', 'imgs', 'educaIFS_bot.png');

const buttonsKeyboard = require('./buttons/buttonsKeyboard');
const buttonStart = buttonsKeyboard.oneButton('Vamos começar?');
const buttonExitTutorial = buttonsKeyboard.oneButton('Sair do tutorial');
const buttonExitQuiz = buttonsKeyboard.oneButton('Sair do Quiz');
const buttonMenuDefault = buttonsKeyboard.twoButton('Quiz', 'Tutoriais', 2);
const buttonSelectTutorial = buttonsKeyboard.threeButton(
  'Primeiro projeto com Git',
  'Contribuir com um projeto no GitHub',
  'Voltar para o menu principal',
  2
);

const wizardTutorialFirstProject = require('./tutorials/firstProjectGitWizard');
const wizardContributeProjectGitHub = require('./tutorials/contributeProjectGitHubWizard');
const wizardQuizGit = require('./quiz/quizGitWizard');

const stage = new Stage([
  wizardTutorialFirstProject,
  wizardContributeProjectGitHub,
  wizardQuizGit,
]);

bot.use(session());
bot.use(stage.middleware());

bot.catch((err, ctx) => {
  ctx.reply(
    `Estou com algum problema hoje, poderia conversar comigo mais tarde 🤕.`
  );
});

const User = require('./models/user');

const verifyUser = async (ctx) => {
  const name = ctx.update.message.from.first_name;

  try {
    const id = String(ctx.update.message.from.id);
    const user = await User.findOne({ id_telegram: id });

    if (!user) {
      await ctx.reply(
        `Olá ${name}, eu sou um Bot 🤖 e o meu nome é Educa IFS, mas você pode me chamar de Edu 😃!`
      );
      await User.create({
        id_telegram: id,
        first_name: name,
        init_chat: true,
      });
    } else {
      await ctx.reply(
        `Olá ${name}, prazer te ver de novo!
        Fique à vontade 😃`
      );
    }
  } catch (e) {
    await ctx.reply(
      `Olá ${name}, eu sou um Bot 🤖 e o meu nome é Educa IFS, mas você pode me chamar de Edu 😃!`
    );
    await ctx.reply(
      `Neste momento não estou com todas as minhas capacidades carregadas, mas pode ficar à vontade ✌️`
    );
  }
};

bot.start(async (ctx) => {
  await verifyUser(ctx);
  await ctx.replyWithPhoto({ source: botImage }, buttonStart);
});

bot.hears([/vamos começar/i], async (ctx) => {
  await ctx.reply(
    'Meus conhecimentos atualmente são sobre a tecnologia Git, se tiver alguma dúvida, envie uma mensagem para mim e tentarei responder, 😉 Ok'
  );
  await ctx.reply(
    'Clique nos botões abaixo, se quiser entrar no Quiz e testar seus conhecimentos, ou vamos comigo fazer alguns dos  tutoriais disponíveis, vai ser bem legal!!! ',
    buttonMenuDefault
  );
});

bot.hears(/Tutoriais/i, (ctx) => {
  ctx.reply('Vamos lá, selecione algum tutorial.', buttonSelectTutorial);
});

bot.hears(/Primeiro projeto com Git/i, async (ctx) => {
  await ctx.reply('Ok, boa escolha');
  await ctx.reply('👍', buttonExitTutorial);
  await ctx.scene.enter('FIRST_PROJECT');
});

bot.hears(/Contribuir com um projeto no GitHub/i, async (ctx) => {
  await ctx.reply('Ok, boa escolha');
  await ctx.reply('👍', buttonExitTutorial);
  await ctx.scene.enter('CONTRIBUTE_PROJECT_GITHUB');
});

bot.hears(/Quiz/i, async (ctx) => {
  await ctx.reply(
    'Legal, agora vamos testar seus conhecimentos sobre o Git',
    buttonExitQuiz
  );
  await ctx.scene.enter('QUIZ_GIT');
});

bot.hears(/Voltar para o menu principal/i, (ctx) => {
  ctx.replyWithMarkdown(
    'Escolha alguma opção: **Quiz** ou **Tutoriais**',
    buttonMenuDefault
  );
});

bot.on('message', async (ctx) => {
  await ctx.reply('Ops! Não entendi, tente novamente', buttonMenuDefault);
});

module.exports = bot;
