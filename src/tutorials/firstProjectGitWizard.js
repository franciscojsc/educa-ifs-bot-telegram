const WizardScene = require('telegraf/scenes/wizard');

const id = 'FIRST_PROJECT';

const firstProjectGitWizard = new WizardScene(
  id,
  (ctx) => {
    ctx.reply(
      'O Git é um sistema de versionamento de código, criado por Linus Torvalds, o mesmo que criou o kernel Linux.'
    );
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.reply('Tchau');
    return ctx.scene.leave();
  }
);

module.exports = firstProjectGitWizard;
