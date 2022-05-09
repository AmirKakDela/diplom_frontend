import {AppTheme} from "../../config/types";

export enum SharedActionsType {
    SET_APP_THEME = 'SET_APP_THEME',
}

export type SharedAction = {
    type: SharedActionsType,
    payload: {
        appTheme: AppTheme,
    }
}
