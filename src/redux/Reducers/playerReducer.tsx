import {SongType} from "../../config/types";
import {PlayerAction, PlayerActionsType} from "../Actions/playerActions";

export type PlayerReducerState = {
    pause: boolean,
    track: SongType | null,
    playerList: SongType[] | null,
    duration: number,
    volume: number,
}

const initialState: PlayerReducerState = {
    pause: true,
    volume: 50,
    track: null,
    playerList: null,
    duration: 0
};

export const playerReducer = (state = initialState, action: PlayerAction): PlayerReducerState => {
    switch (action.type) {
        case PlayerActionsType.PAUSE:
            return {
                ...state,
                pause: true
            };
        case PlayerActionsType.PLAY:
            return {
                ...state,
                pause: false
            };
        case PlayerActionsType.SET_DURATION:
            return {
                ...state,
                duration: action.payload
            };
        case PlayerActionsType.SET_VOLUME:
            return {
                ...state,
                volume: action.payload
            };
        case PlayerActionsType.SET_TRACK:
            return {
                ...state,
                track: action.payload,
            };
        case PlayerActionsType.SET_PLAYER_LIST:
            return {
                ...state,
                playerList: action.payload,
            };
        default:
            return state;
    }
};
