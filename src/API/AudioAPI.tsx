import axios from "axios";
import {AuthorizationHeaderConfig, url} from "../config/config";

class AudioAPI {
    async uploadAudioFile(audioFile: FileList | null) {
        return await axios.post(`${url}/api/files/audio-upload`, audioFile, AuthorizationHeaderConfig)
            .then(res => {
            return res.data;
        }).catch(err => {
            console.log(err);
        })
    }
}
export default new AudioAPI();
