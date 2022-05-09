import {ErrorActionType, ErrorActionTypeTypes} from "../Actions/errorAction";

type StateType = {
    errorText: string | null
}

const InitialState: StateType = {
    errorText: null
}

const errorReducer = (state: StateType = InitialState, action: ErrorActionType): StateType => {
    switch (action.type) {
        case ErrorActionTypeTypes.SET_ERROR:
            return {...state, errorText: action.payload}
        case ErrorActionTypeTypes.REMOVE_ERROR:
            return {...state, errorText: null}
        default:
            return state
    }
}

export default errorReducer;
