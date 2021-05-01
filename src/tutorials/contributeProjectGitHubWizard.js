const WizardScene = require('telegraf/scenes/wizard');
const installGitHandler = require('./steps/installGitHandler');
const createAccountGitHubHandler = require('./steps/createAccountGitHubHandler');

const buttonsInline = require('./../buttons/buttonsInline');

const id = 'CONTRIBUTE_PROJECT_GITHUB';

const contributeProjectGitHubWizard = new WizardScene(
  id,
  async (ctx) => {
    await ctx.reply(
      'Agora vamos aprender como realizar uma contribuição em projetos no GitHub'
    );
    await ctx.reply(
      'Antes de iniciar, precisamos ter o Git instalado e uma conta no GitHub, blz?',
      buttonsInline.oneButton('OK?', 'ok')
    );
    return ctx.wizard.next();
  },
  installGitHandler,
  createAccountGitHubHandler,
  (ctx) => {
    ctx.reply('Tchau');
    return ctx.scene.leave();
  }
);

module.exports = contributeProjectGitHubWizard;
