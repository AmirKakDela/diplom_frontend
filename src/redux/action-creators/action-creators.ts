import {SongType} from "../../config/types";
import {PlayerAction, PlayerActionsType} from "../Actions/playerActions";

export const playSong = (): PlayerAction => {
    return { type: PlayerActionsType.PLAY };
};
export const pauseSong = (): PlayerAction => {
    return { type: PlayerActionsType.PAUSE };
};
export const setDurationSong = (payload: number): PlayerAction => {
    return { type: PlayerActionsType.SET_DURATION, payload };
};
export const setVolumeSong = (payload: number): PlayerAction => {
    return { type: PlayerActionsType.SET_VOLUME, payload };
};
export const setPlayingSong = (payload: SongType): PlayerAction => {
    return { type: PlayerActionsType.SET_TRACK, payload };
};
export const setPlayingSongList = (payload: SongType[]): PlayerAction => {
    return { type: PlayerActionsType.SET_PLAYER_LIST, payload };
};
