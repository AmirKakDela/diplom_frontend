import axios from "axios";
import {AuthorizationHeaderConfig, url} from "../config/config";

export type AlbumTypeRequestData = {
    name: string,
    artist: string,
    songs: string[],
    cover: any
}

class AlbumAPI {
    async createAlbum(album: AlbumTypeRequestData) {
        return await axios.post(`${url}/api/album/create`, album, {
            headers: {
                Authorization: "" + localStorage.getItem("token"),
                "content-type": "application/json"
            }
        }).then(res => {
            return res;
        }).catch(res => {
            console.log(res);
            return res;
        });
    }

    async getAlbumById(albumId: string) {
        return await axios.get(`${url}/api/album/${albumId}`, AuthorizationHeaderConfig)
            .then(res => {
                return res.data;
            }).catch(err => {
                console.log(err);
            });
    }

    async getAllAlbums() {
        return await axios.get(`${url}/api/album/allAlbums`, AuthorizationHeaderConfig)
            .then(response => {
                return response.data;
            }).catch(err => {
                console.log(err);
            });
    }

    async getAllAlbumsWithSongs() {
        return await axios.get(`${url}/api/album/albumsWithSongs`, AuthorizationHeaderConfig)
            .then(response => {
                return response.data;
            }).catch(err => {
                console.log(err);
            });
    }

    async getArtistAlbums(artistId: string) {
        return await axios.get(`${url}/api/album/artist/${artistId}`, AuthorizationHeaderConfig)
            .then(res => {
                return res.data;
            }).catch(err => {
                console.log(err);
            });
    }

    async deleteAlbum(id: string) {
        return await axios.delete(`${url}/api/album/delete/${id}`, AuthorizationHeaderConfig)
            .then(res => {
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            });
    }

    async editAlbum(id: string, album: AlbumTypeRequestData) {
        return await axios.put(`${url}/api/album/update/${id}`, album, AuthorizationHeaderConfig)
            .then(res => {
                return res;
            }).catch(err => {
                console.log(err);
                return err;
            });
    }

    async getLikedAlbumsOfUser() {
        return await axios.get(`${url}/api/album/user/liked-albums`, AuthorizationHeaderConfig)
            .then(res => {
                return res.data;
            });
    }
}

export default new AlbumAPI();
