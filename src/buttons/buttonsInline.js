const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');

const confirmButton = (text_yes, text_no) =>
  Extra.markup(
    Markup.inlineKeyboard([
      Markup.callbackButton(text_yes, 'y'),
      Markup.callbackButton(text_no, 'n'),
    ])
  );

const oneButton = (text, callback_data) =>
  Extra.markup(
    Markup.inlineKeyboard([Markup.callbackButton(text, callback_data)])
  );

module.exports = {
  confirmButton,
  oneButton,
};
