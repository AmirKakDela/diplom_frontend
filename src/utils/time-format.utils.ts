import {AlbumType, SongType} from "../config/types";

export function formattedTime(time: number) {
    return new Date((time + new Date().getTimezoneOffset() * 60) * 1000)
        .toLocaleTimeString()
        .replace(/^00:/, "");
}

export function getTimesOfTracks (songs: SongType[]) {
    let time: number;
    let allSec = songs.map(song => time += song.duration, time = 0).reverse()[0];
    let hour = Math.floor(allSec / 3600);
    let min = Math.floor(allSec % 3600 / 60);
    let sec = Math.floor(allSec % 3600 % 60);

    let hourDis = hour > 0 ?  `${hour} ч. ` : "";
    let minDis = min > 0 ? `${min} мин. ` : "";
    let secDis = sec > 0 ? `${sec} сек.` : "";

    return hourDis + minDis + secDis;
}

export function getTimesOfPlaylistTracks (songs: SongType[]) {
    let time: number;
    let allSec = songs.map(song => time += song.duration, time = 0).reverse()[0];
    let hour = Math.floor(allSec / 3600);
    let min = Math.floor(allSec % 3600 / 60);
    let sec = Math.floor(allSec % 3600 % 60);

    let hourDis = hour > 0 ?  `${hour} ч. ` : "";
    let minDis = min > 0 ? `${min} мин. ` : "";
    let secDis = sec > 0 ? `${sec} сек.` : "";

    return hourDis + minDis + secDis;
}
