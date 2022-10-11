import { VercelRequest, VercelResponse } from "@vercel/node";
import { Telegraf, Context as TelegrafContext, session } from "telegraf";

import { about } from "..";
import { ok } from "./responses";
import startScene from '../controllers/start';
import { Scenes } from "telegraf";

//import { Update } from "telegraf/typings/core/types/typegram";
//import { Stage } from "telegraf/typings/scenes";




const isDev = process.env.DEV;

const VERCEL_URL = process.env.VERCEL_URL;

const BOT_TOKEN = process.env.BOT_TOKEN;

export const bot = new Telegraf<Scenes.SceneContext>(BOT_TOKEN);

//const { enter, leave } = Scenes.Stage;


function botUtils() {
	console.log('Test');
	
	bot.use(Telegraf.log());
	//bot.use(logger);
	const testScene = new Scenes.BaseScene<Scenes.SceneContext>('test');
	testScene.enter(ctx => {
		console.log('enter scene');
		ctx.reply('Hello!');
	});

	testScene.leave(ctx => {ctx.reply('Bye!')});

	const stage = new Scenes.Stage<Scenes.SceneContext>([testScene, startScene], {ttl: 10});
	bot.use(session());	
	bot.use(stage.middleware());
	bot.start((async (ctx) => {
		console.log('bot start');
		
		ctx.scene.enter('start');
		//Scenes.Stage.enter<Scenes.SceneContext>('test');
	}));
	//bot.start((async (ctx) => {ctx.scene.});
	//bot.start(async (ctx:Context) => ctx.sendMessage('Hello!'));

	bot.command("about", about());
}

async function localBot() {
	//debug("Bot is running in development mode at http://localhost:3000");
	//bot.telegram.options.webhookReply = false;

	//console.info("Server has initialized bot username: ", botInfo.username);

	//debug(`deleting webhook`);
	//await bot.telegram.deleteWebhook();

	//debug(`starting polling`);
	//await bot.launch();
}

export async function useWebhook(req: VercelRequest, res: VercelResponse) {
	try {
		if (!isDev && !VERCEL_URL) {
			throw new Error("VERCEL_URL is not set.");
		}

		const getWebhookInfo = await bot.telegram.getWebhookInfo();

		if (getWebhookInfo.url !== VERCEL_URL + "/api") {
			//debug(`deleting webhook`);
			await bot.telegram.deleteWebhook();
			//debug(`setting webhook to ${VERCEL_URL}/api`);
			await bot.telegram.setWebhook(`${VERCEL_URL}/api`);
		}

		// call bot commands and middlware
		botUtils();

		// console.log("webhook already defined");
		// console.log("request method: ", req.method);
		// console.log("req.body", req.body);

		if (req.method === "POST") {
			await bot.handleUpdate(req.body, res);
		} else {
			ok(res, "Listening to bot events...");
		}
	} catch (error) {
		console.error(error);
		return error.message;
	}
}

// export function toArgs(ctx: TelegrafContext) {
// 	const regex = /^\/([^@\s]+)@?(?:(\S+)|)\s?([\s\S]+)?$/i;
// 	const parts = regex.exec(ctx.message!.text!.trim());
// 	if (!parts) {
// 		return [];
// 	}
// 	return !parts[3] ? [] : parts[3].split(/\s+/).filter(arg => arg.length);
// }

//export const MARKDOWN = Extra.markdown(true) as ExtraReplyMessage;

//export const NO_PREVIEW = Extra.markdown(true).webPreview(false) as ExtraReplyMessage;

export const hiddenCharacter = "\u200b";

export const logger = async (_: TelegrafContext, next): Promise<void> => {
	const start = new Date();
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	await next();
	const ms = new Date().getTime() - start.getTime();
	console.log("Response time: %sms", ms);
};

if (isDev) {
	console.log("isDev", isDev);

	localBot().then(() => {
		// call bot commands and middlware
		botUtils();

		// launch bot
		bot.launch();
	});
}
