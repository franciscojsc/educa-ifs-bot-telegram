const WizardScene = require('telegraf/scenes/wizard');
const installGitHandler = require('./steps/installGitHandler');
const createProjectHandler = require('./steps/createProjectHandler');
const startRepositoryGitHandler = require('./steps/startRepositoryGitHandler');
const fileStatusLifecycleHandler = require('./steps/fileStatusLifecycleHandler');
const mainSectionsGitProjectHandler = require('./steps/mainSectionsGitProjectHandler');
const GitStatusCommandHandler = require('./steps/GitStatusCommandHandler');
const GitAddCommandHandler = require('./steps/GitAddCommandHandler');

const buttonsInline = require('./../buttons/buttonsInline');

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
  fileStatusLifecycleHandler,
  mainSectionsGitProjectHandler,
  GitStatusCommandHandler,
  GitAddCommandHandler,
  (ctx) => {
    ctx.reply('Tchau');
    return ctx.scene.leave();
  }
);

module.exports = firstProjectGitWizard;
