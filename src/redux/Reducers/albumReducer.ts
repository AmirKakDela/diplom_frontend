import {AlbumType} from "../../config/types";
import {AlbumAction, AlbumActionsType} from "../Actions/albumAction";

type State = {
    albums: AlbumType[],
}

const initialState: State = {
    albums: [],
};

const albumReducer = (state = initialState, action: AlbumAction): State => {
    switch (action.type) {
        case AlbumActionsType.SET_ALBUMS:
            return {
                ...state,
                albums: action.payload as AlbumType[] || initialState.albums,
            };
        case AlbumActionsType.SET_ALBUM:
            const album = action.payload as AlbumType;
            const filteredAlbums = state.albums.filter(value => value._id !== album._id);
            return {
                ...state,
                albums: [...filteredAlbums, album] || initialState.albums,
            };
        case AlbumActionsType.DELETE_ALBUM:
            const id = action.payload as string;
            return {
                ...state,
                albums: state.albums.filter(value => value._id !== id),
            };
        default:
            return state;
    }
};

export default albumReducer;
