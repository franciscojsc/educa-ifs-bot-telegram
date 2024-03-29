const Composer = require('telegraf/composer');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');

const buttonsKeyboard = require('./../../buttons/buttonsKeyboard');
const buttonMenuDefault = buttonsKeyboard.twoButton('Quiz', 'Tutoriais', 2);

const questionGitComposer = new Composer();

questionGitComposer.action('ok', async (ctx) => {
  initQuestion(ctx);
  continueQuestion(ctx);
  updateQuestion(ctx);
});

questionGitComposer.action('right', async (ctx) => {
  ctx.wizard.state.right++;
  await ctx.replyWithMarkdown('👍');
  continueQuestion(ctx);
  updateQuestion(ctx);
});

questionGitComposer.action('wrong', async (ctx) => {
  const answer = ctx.wizard.state.answer;
  ctx.wizard.state.wrong++;

  await ctx.replyWithMarkdown(`A resposta era ${answer}`);
  await ctx.replyWithMarkdown('👎');
  continueQuestion(ctx);
  updateQuestion(ctx);
});

questionGitComposer.hears(/Sair do Quiz/i, async (ctx) => {
  await score(ctx);
  await ctx.reply(
    'Ok, saindo do Quiz, que tal um tutorial ou tentar o quiz novamente?',
    buttonMenuDefault
  );
  await ctx.scene.leave();
});

questionGitComposer.on('message', (ctx) => {
  ctx.reply('Confirme clicando nos botões :)');
});

const loadQuestion = (questions, position) => {
  const buttonsAnswers = questions[position].answers.map((answer) => {
    return Markup.callbackButton(
      answer,
      questions[position].rightAnswer == answer ? 'right' : 'wrong'
    );
  });

  return {
    question: questions[position].question,
    answers: buttonsAnswers,
    rightAnswer: questions[position].rightAnswer,
  };
};

const initQuestion = async (ctx) => {
  const { db } = ctx.wizard.state;
  if (db.length > 0) {
    ctx.wizard.state['position'] = 0;
    ctx.wizard.state['size'] = db.length - 1;
    ctx.wizard.state['right'] = 0;
    ctx.wizard.state['wrong'] = 0;
  } else {
    await ctx.reply(
      'Não tenho perguntas no momento 😔, fale comigo mais tarde',
      buttonMenuDefault
    );
    return ctx.scene.leave();
  }
};

const continueQuestion = async (ctx) => {
  const { position, size } = ctx.wizard.state;

  if (position > size) {
    await score(ctx);
    await ctx.reply(
      'Que tal um tutorial ou tentar o quiz novamente?',
      buttonMenuDefault
    );
    return ctx.scene.leave();
  }
};

const score = async (ctx) => {
  const { right, wrong } = ctx.wizard.state;
  await ctx.reply(`Sua pontuação:
    Acertou: ${right || 0}
    Errou: ${wrong || 0}`);
};

const updateQuestion = async (ctx) => {
  const { position, size, db } = ctx.wizard.state;

  if (position <= size) {
    const position = ctx.wizard.state.position++;
    const q = loadQuestion(db, position);
    ctx.wizard.state['answer'] = q.rightAnswer;

    await ctx.reply(
      `${q.question} 🤔`,
      Extra.markup(Markup.inlineKeyboard(q.answers, { columns: 1 }))
    );
  }
};

module.exports = questionGitComposer;
