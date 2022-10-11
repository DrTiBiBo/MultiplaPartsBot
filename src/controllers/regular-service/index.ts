import { Scenes } from "telegraf";
import { strings } from "../../strings/strings";
import { getRegularServiceKeyboard } from "../../utils/keyboards";

const regularService = new Scenes.BaseScene<Scenes.SceneContext>('regularService');

regularService.enter(async (ctx) =>{
    const {regularServiceKeyboard} = getRegularServiceKeyboard();
    await ctx.reply(strings.shared_whatNext, regularServiceKeyboard);
});