const WizardScene = require('telegraf/scenes/wizard');

const id = 'QUIZ_GIT';

const quizGitWizard = new WizardScene(
  id,
  async (ctx) => {
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.reply('Tchau');
    return ctx.scene.leave();
  }
);

module.exports = quizGitWizard;
