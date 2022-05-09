import axios from "axios";
import {AuthorizationHeaderConfig, url} from "../config/config";
import {GenreTypeWithoutId} from "../components/AdminPage/AdminGenreForm/AdminGenreForm";

class GenreAPI {
    async getGenre(id: string) {
        return await axios.get(`${url}/api/genre/genre/${id}`, AuthorizationHeaderConfig).then(res => {
            return res.data
        }).catch(err => {
            console.log(err)
        })
    }

    async getAllGenre() {
        return await axios.get(`${url}/api/genre/all-genres`, AuthorizationHeaderConfig).then(res => {
            return res.data
        }).catch(err => {
            console.log(err)
        })
    }

    async createGenre(genre: GenreTypeWithoutId) {
        return await axios.post(`${url}/api/genre/create-genre`, genre, AuthorizationHeaderConfig).then(res => {
            return res.data
        }).catch(err => {
            console.log(err.data)
            return err.data
        })
    }
}

export default new GenreAPI();
