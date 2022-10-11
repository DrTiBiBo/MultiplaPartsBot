import {Markup} from 'telegraf';
import { strings } from '../strings/strings';

export const getBackKeyboard = () =>{
    const backKeyboardBack = strings.keyboards_backKeyboard_back;
    let backKeyboard: any = Markup.keyboard([backKeyboardBack]);

    backKeyboard = backKeyboard.resize().extra();
    return {
        backKeyboard,
        backKeyboardBack
    }
};

export const getMainKeyboard = () => {
    const mainKeyboardRegularService = strings.keyboards_mainKeyboard_regularService;

    let mainKeyboard : any = Markup.keyboard([mainKeyboardRegularService]).resize().oneTime();
    //mainKeyboard = mainKeyboard.resize().extra();
    return {
        mainKeyboard,
        mainKeyboardRegularService
    }
};

export const getRegularServiceKeyboard = () =>{
    const regularServiceKeyboardAirFilter = strings.keyboards_regularServiceKeyboard_airFilter;

    let regularServiceKeyboard : any = Markup.keyboard([regularServiceKeyboardAirFilter]).resize().oneTime();

    return {
        regularServiceKeyboard,
        regularServiceKeyboardAirFilter
    }
}