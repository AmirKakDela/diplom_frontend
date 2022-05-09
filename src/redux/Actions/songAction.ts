import {SongType} from "../../config/types";

export enum SongActionTypes {
    FETCH_SONGS = 'FETCH_SONGS',
}

type FetchTracksAction = {
    type: SongActionTypes.FETCH_SONGS;
    payload: SongType[];
}

export type SongAction = FetchTracksAction;
