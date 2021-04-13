const Markup = require('telegraf/markup');

const oneButton = (text) => Markup.keyboard([text]).resize().extra();

const twoButton = (firstText, secondText, columns = 1) => {
  return Markup.keyboard([firstText, secondText], { columns: columns })
    .resize()
    .extra();
};

module.exports = {
  oneButton,
  twoButton,
};
