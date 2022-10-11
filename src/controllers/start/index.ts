import  { Scenes} from 'telegraf';

//import { BaseScene, SceneContext, Stage } from 'telegraf/typings/scenes';

import { strings } from '../../strings/strings';
import { getMainKeyboard, getRegularServiceKeyboard } from '../../utils/keyboards';

//const { leave } = Stage
const start = new Scenes.BaseScene<Scenes.SceneContext>('start');

start.enter(async (ctx) => {
    const { mainKeyboard } = getMainKeyboard();
    console.log('enter');
    await ctx.reply(strings.shared_welcome, mainKeyboard);
});

start.hears(strings.keyboards_mainKeyboard_regularService, async (ctx) => {
    const { regularServiceKeyboard } = getRegularServiceKeyboard();
    await ctx.reply(strings.shared_whatNext, regularServiceKeyboard);
})

// start.leave(async (ctx) => {
//     const { mainKeyboard } = getMainKeyboard();
//     console.log('leave');
//     await ctx.reply(strings.shared_whatNext, mainKeyboard);
//   });

  export default start;