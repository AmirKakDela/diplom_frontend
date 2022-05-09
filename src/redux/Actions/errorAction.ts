export enum ErrorActionTypeTypes {
    SET_ERROR = 'SET_ERROR',
    REMOVE_ERROR = 'REMOVE_ERROR'
}

export type ErrorActionType = SetErrorType | RemoveErrorType

type SetErrorType = {
    type: ErrorActionTypeTypes.SET_ERROR,
    payload: string
}

export const setError = (error: string): SetErrorType => {
    return {
        type: ErrorActionTypeTypes.SET_ERROR,
        payload: error
    }
}

type RemoveErrorType = {
    type: ErrorActionTypeTypes.REMOVE_ERROR
}

export const removeError = (): RemoveErrorType => {
    return {
        type: ErrorActionTypeTypes.REMOVE_ERROR
    }

}
