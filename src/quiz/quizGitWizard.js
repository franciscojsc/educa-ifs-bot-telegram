const WizardScene = require('telegraf/scenes/wizard');

const questionGitComposer = require('./step/questionGitComposer');

const Quiz = require('./../models/quiz');

const logger = require('./../lib/logger');

const buttonsInline = require('./../buttons/buttonsInline');
const buttonOK = buttonsInline.oneButton('Vamos lá?', 'ok');
const id = 'QUIZ_GIT';

const loadDB = async () => {
  return await Quiz.find({}).select({
    _id: 0,
    question: 1,
    answers: 1,
    rightAnswer: 1,
  });
};

const quizGitWizard = new WizardScene(
  id,
  async (ctx) => {
    ctx.reply('😎', buttonOK);
    try {
      ctx.wizard.state['db'] = await loadDB();
    } catch (e) {
      logger.error(e);
      ctx.wizard.state['db'] = [];
    }
    return ctx.wizard.next();
  },
  questionGitComposer,
  (ctx) => {
    ctx.reply('Tchau');
    return ctx.scene.leave();
  }
);

module.exports = quizGitWizard;
