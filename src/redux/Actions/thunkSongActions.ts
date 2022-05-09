import {Dispatch} from "redux";
import {SongAction, SongActionTypes} from "./songAction";
import axios from "axios";
import {url} from "../../config/config";

export const fetchSongs = () => {
    return async (dispatch: Dispatch<SongAction>) => {
        try {
            const response = await axios.get(`${url}/api/song/all`,
                {
                    headers: {
                        Authorization: "" + localStorage.getItem("token")
                    }
                }
            );
            dispatch({type: SongActionTypes.FETCH_SONGS, payload: response.data});
        } catch (e) {
            console.log(e)
        }
    };
};
