import { author, name, version } from "../../package.json";

//const debug = require("debug")("bot:about_command");

const about = () => (ctx: any) => {
	const message = `*${name} ${version}*\n${author}`;
	//debug(`Triggered "about" command with message \n${message}`);

	return ctx.replyWithMarkdown(message+" changed");
};

export { about };
