import {SearchActionType, setSearchResult} from "./searchActions";
import {Dispatch} from "redux";
import axios from "axios";
import {url} from "../../config/config";
import {ErrorType} from "../../config/types";
import {ErrorActionType, setError} from "./errorAction";

export const getSearchResult = (queryValue: string) => {
    return async (dispatch: Dispatch<SearchActionType | ErrorActionType>) => {
        try {
            const response = await axios.get(`${url}/api/search/?query=${queryValue.trim()}`, {
                headers: {
                    Authorization: '' + localStorage.getItem('token')
                }
            });
            if (!Object.keys(response.data).length) {
                return dispatch(setSearchResult({songs: [], artists: [], playlists: []}));
            }
            dispatch(setSearchResult(response.data));
        } catch (e) {
            const u = e as ErrorType
            dispatch(setError(u.response.data.message))
        }
    }
}
