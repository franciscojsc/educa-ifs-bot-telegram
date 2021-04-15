const WizardScene = require('telegraf/scenes/wizard');
const installGitHandler = require('./steps/installGitHandler');
const createProjectHandler = require('./steps/createProjectHandler');

const buttonsInline = require('./../buttons/buttonsInline');
const startRepositoryGitHandler = require('./steps/startRepositoryGitHandler');

const id = 'FIRST_PROJECT';

const firstProjectGitWizard = new WizardScene(
  id,
  async (ctx) => {
    await ctx.reply(
      'O Git é um sistema de versionamento de código, criado por Linus Torvalds, o mesmo que criou o kernel Linux.',
      buttonsInline.oneButton('OK?', 'ok')
    );
    return ctx.wizard.next();
  },
  installGitHandler,
  createProjectHandler,
  startRepositoryGitHandler,
  (ctx) => {
    ctx.reply('Tchau');
    return ctx.scene.leave();
  }
);

module.exports = firstProjectGitWizard;
