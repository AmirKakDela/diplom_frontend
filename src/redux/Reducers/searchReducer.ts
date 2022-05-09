import {SearchResultType} from "../../config/types"
import {SearchActionsTypeTypes, SearchActionType} from "../Actions/searchActions";

type StateType = {
    isLoading: boolean,
    searchResult: SearchResultType
}

const initialState: StateType = {
    isLoading: false,
    searchResult: {songs: [], artists: [], playlists: []}
}

const searchReducer = (state = initialState, action: SearchActionType): StateType => {
    switch (action.type) {
        case SearchActionsTypeTypes.SET_SEARCH_RESULT:
            return {
                ...state, isLoading: false, searchResult: action.payload
            }
        case SearchActionsTypeTypes.SEARCH_LOADING:
            return {
                ...state, isLoading: true
            }
        default:
            return state;
    }
}

export default searchReducer;
