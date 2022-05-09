import {SharedAction, SharedActionsType} from "../Actions/sharedActions";
import {AppTheme} from "../../config/types";

type StateType = {
    appTheme: AppTheme,
}

const initialState: StateType = {
    appTheme: AppTheme.DARK,
}

const sharedReducer = (state = initialState, action: SharedAction): StateType => {
    switch (action.type) {
        case SharedActionsType.SET_APP_THEME:
            return {
                ...state,
                appTheme: action.payload?.appTheme || initialState.appTheme,
            }
        default:
            return state;
    }
}

export default sharedReducer;
