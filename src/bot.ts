require ('dotenv').config();
import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.TELEGRAM_TOKEN!);
bot.command('oldschool', (ctx) => ctx.reply('Hello'));
bot.launch();