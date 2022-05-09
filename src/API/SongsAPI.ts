import axios from "axios";
import {AuthorizationHeaderConfig, url} from "../config/config";

class SongAPI {
    async getAllSongs() {
        return await axios.get(`${url}/api/song/all`, AuthorizationHeaderConfig).then(res => {
            return res.data
        }).catch(err => {
            console.log(err)
        })
    }

    async deleteSong(id: string) {
        return await axios.delete(`${url}/api/song/delete/${id}`, AuthorizationHeaderConfig).then(res => {
            console.log(res.data)
        })
    }

    async getSongById(id: string) {
        return await axios.get(`${url}/api/song/${id}`, AuthorizationHeaderConfig).then(res => {
            return res.data
        })
    }

    async createSong(song: any) {
        return await axios.post(`${url}/api/song/create`, song, {
            headers: {
                Authorization: '' + localStorage.getItem('token'),
                'content-type': 'multipart/form-data'
            }
        }).then(res => {
            return res
        }).catch(res => {
            console.log(res)
            return res
        })
    }

    async getFullLikedSongsOfUser() {
        return await axios.get(`${url}/api/song/user/liked-songs`, AuthorizationHeaderConfig).then(res => {
            return res.data
        })
    }
}

export default new SongAPI();
