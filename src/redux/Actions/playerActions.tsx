import {SongType} from "../../config/types";

export enum PlayerActionsType {
    PLAY = "PLAY",
    PAUSE = "PAUSE",
    SET_TRACK = "SET_TRACK",
    SET_PLAYER_LIST = "SET_PLAYER_LIST",
    SET_VOLUME = "SET_VOLUME",
    SET_DURATION = "SET_DURATION",
}

type PlayAction = {
    type: PlayerActionsType.PLAY
}
type PauseAction = {
    type: PlayerActionsType.PAUSE
}
type SetTrackAction = {
    type: PlayerActionsType.SET_TRACK,
    payload: SongType;
}
type SetTrackListAction = {
    type: PlayerActionsType.SET_PLAYER_LIST,
    payload: SongType[];
}
type SetDurationAction = {
    type: PlayerActionsType.SET_DURATION,
    payload: number;
}
type SetVolumeAction = {
    type: PlayerActionsType.SET_VOLUME,
    payload: number;
}

export type PlayerAction =
    PlayAction
    | PauseAction
    | SetTrackAction
    | SetTrackListAction
    | SetDurationAction
    | SetVolumeAction;
