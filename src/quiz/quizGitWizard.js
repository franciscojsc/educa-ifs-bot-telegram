const WizardScene = require('telegraf/scenes/wizard');

const questionGitComposer = require('./step/questionGitComposer');

const buttonsInline = require('./../buttons/buttonsInline');
const buttonOK = buttonsInline.oneButton('Vamos lá?', 'ok');
const id = 'QUIZ_GIT';

const quizGitWizard = new WizardScene(
  id,
  async (ctx) => {
    ctx.reply('😎', buttonOK);
    return ctx.wizard.next();
  },
  questionGitComposer,
  (ctx) => {
    ctx.reply('Tchau');
    return ctx.scene.leave();
  }
);

module.exports = quizGitWizard;
