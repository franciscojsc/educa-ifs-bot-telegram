const WizardScene = require('telegraf/scenes/wizard');

const id = 'CONTRIBUTE_PROJECT_GITHUB';

const contributeProjectGitHubWizard = new WizardScene(
  id,
  async (ctx) => {
    await ctx.reply(
      'Agora vamos aprender como realizar uma contribuição em projetos no GitHub'
    );
    await ctx.reply(
      'Antes de iniciar, precisamos ter o Git instalado e uma conta no GitHub, blz?'
    );
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.reply('Tchau');
    return ctx.scene.leave();
  }
);

module.exports = contributeProjectGitHubWizard;
