import axios from "axios";
import {AuthorizationHeaderConfig, url} from "../config/config";

class PlaylistAPI {
    async createPlaylist(newPlaylist: any) {
        return await axios.post(`${url}/api/playlist/create`, newPlaylist, AuthorizationHeaderConfig)
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }

    async getAllPlaylists() {
        return await axios.get(`${url}/api/playlist/all`, AuthorizationHeaderConfig)
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }

    async getUserPlaylists(userId: string) {
        return await axios.get(`${url}/api/playlist/user/${userId}`, AuthorizationHeaderConfig)
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }

    async getPlaylistById(id: string) {
        return await axios.get(`${url}/api/playlist/${id}`, AuthorizationHeaderConfig)
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }

    async addSongToPlaylist(id: string, songId: string) {
        return await axios.put(`${url}/api/playlist/addSong/${id}`, {song: songId}, AuthorizationHeaderConfig)
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }

    async deleteSongFromPlaylist(id: string, songId: string) {
        return await axios.put(`${url}/api/playlist/deleteSong/${id}`, {song: songId}, AuthorizationHeaderConfig)
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }

    async editPlaylist(id: string, data: any) {
        return await axios.put(`${url}/api/playlist/edit/${id}`, data, {
            headers: {
                Authorization: '' + localStorage.getItem('token'),
                'content-type': 'multipart/form-data'
            }
        })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }

    async deletePlaylist(id: string) {
        return await axios.delete(`${url}/api/playlist/delete/${id}`, AuthorizationHeaderConfig)
            .then(res => {
                return res.data
            })
    }
}

export default new PlaylistAPI();