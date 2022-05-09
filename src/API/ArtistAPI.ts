import axios from "axios";
import {AuthorizationHeaderConfig, url} from "../config/config";

export type ArtistTypeRequestData = {
    name: string,
    image: any
}

class ArtistAPI {
    async getArtistById(id: string) {
        return await axios.get(`${url}/api/artist/artist/${id}`, AuthorizationHeaderConfig).then(res => {
            return res.data
        }).catch(err => {
            console.log(err)
        })
    }

    async getAllArtists() {
        return await axios.get(`${url}/api/artist/all`, AuthorizationHeaderConfig).then(response => {
            return response.data
        }).catch(err => {
            console.log(err)
        })
    }

    async getAllArtistsSongs(artistId: string) {
        return await axios.get(`${url}/api/artist/all-songs/${artistId}`, AuthorizationHeaderConfig).then(response => {
            return response.data
        }).catch(err => {
            console.log(err)
        })
    }

    async deleteArtist(id: string) {
        return await axios.delete(`${url}/api/artist/delete/${id}`, AuthorizationHeaderConfig).then(res => {
            console.log(res.data)
        })
    }

    async createArtist(artist: FormData) {
        return await axios.post(`${url}/api/artist/create`, artist, {
            headers: {
                Authorization: '' + localStorage.getItem('token'),
                'content-type': 'multipart/form-data'
            }
        }).then(res => {
            return res;
        }).catch(res => {
            console.log(res);
            return res;
        });
    }

}

export default new ArtistAPI();
