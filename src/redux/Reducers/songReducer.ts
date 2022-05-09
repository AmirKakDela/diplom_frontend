import {SongType} from "../../config/types";
import {SongAction, SongActionTypes} from "../Actions/songAction";

type State = {
    tracks: SongType[],
}

const initialState: State = {
    tracks: [],
}

const songReducer = (state = initialState, action: SongAction): State => {
    switch (action.type) {
        case SongActionTypes.FETCH_SONGS:
            return {tracks: action.payload}
        default:
            return state;
    }
}

export default songReducer;
