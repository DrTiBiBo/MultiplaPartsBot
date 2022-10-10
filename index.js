const TelegramBot = require('node-telegram-bot-api')

const token = '5621040566:AAEqe12yBNI5KEptMPvPy5FN1xYDhu7-jEU'

const bot = new TelegramBot(token, { polling: true })

bot.onText(/\/echo (.+)/, (msg, match) => {

  const chatId = msg.chat.id
  const resp = match[1]

  bot.sendMessage(chatId, resp)
})

bot.onText(/\/start/, (msg) => {
  var options = {
    "reply_markup": {
      "keyboard": [
        [{ text: 'Test1', callback_data: '1' }],
        [{ text: 'Some button text 2', callback_data: '2' }],
        [{ text: 'Some button text 3', callback_data: '3' }]
      ]
    }
  };
  bot.sendMessage(msg.chat.id, "answer.", options);
})

//bot.on('message', (msg) => {
//  if (msg.text.toString().toLowerCase().indexOf('test') === 0)
//bot.sendMessage(msg.chat.id, "Test2")
//})

bot.on('callback_query', function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const opts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  };
  let text;

  if (action === '1') {
    text = 'You hit button 1';
  }

  bot.editMessageText(text, opts);
});