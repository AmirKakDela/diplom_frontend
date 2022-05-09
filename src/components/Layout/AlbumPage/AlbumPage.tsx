import {useParams} from "react-router-dom";
import React, {MouseEvent, MouseEventHandler, useEffect, useState} from "react";
import {Song} from "../../Song/Song";
import {formWordTrack} from "../../../utils/declension.utils";
import {getTimesOfTracks} from "../../../utils/time-format.utils";
import {AlbumType, SongType} from "../../../config/types";
import {useActions} from "../../../hooks/useActions";
import AlbumAPI from "../../../API/AlbumAPI";
import AlbumLike from "./AlbumLike";
import {CaretRightFilled as PlayIcon, PauseOutlined as PauseIcon} from "@ant-design/icons/lib/icons/index";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {PlayerReducerState} from "../../../redux/Reducers/playerReducer";
import {RootState} from "../../../redux/Reducers/rootReducer";
import "./AlbumPage.scss";

export function AlbumPage() {
    const urlParams = useParams();
    const { setPlayingSong, setPlayingSongList, playSong, pauseSong } = useActions();
    const [songs, setSongs] = useState<SongType[]>([]);
    const [album, setAlbum] = useState<AlbumType<SongType>>({ artist: "", _id: "", name: "", songs: [], cover: "" });
    const { pause } = useTypedSelector<PlayerReducerState>((state: RootState) => state.player);
    const isPlayed = !pause;
    const icon = isPlayed ? <PauseIcon/> : <PlayIcon/>;

    const onSwitchPlay: MouseEventHandler<HTMLElement> = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        onClickPlayIcon();
        if (isPlayed) {
            pauseSong();
        } else {
            playSong();
        }
    };

    const onClickPlayIcon = () => {
        setPlayingSongList(songs);
        setPlayingSong(songs[0]);
    };

    useEffect(() => {
        if (urlParams.id) {
            AlbumAPI.getAlbumById(urlParams.id).then(data => {
                setAlbum(data.album);
                setSongs(data.songs);
            });
        }
    }, [urlParams.id]);

    const numOfSongsInAlbum = songs.length;

    function onPlay(song: SongType) {
        setPlayingSongList(songs);
        setPlayingSong(song);
    }

    return (
        !album
            ? <div>Ошибка при получении альбома</div>
            : <div className="info">
                <div className="info__header info__header_album">
                    <div className="info__cover">
                        <img src={album.cover}
                             alt="Изображение обложки"/>
                    </div>
                    <div className="info__desc">
                        <h2 className="desc__category">Альбом</h2>
                        <h1 className="desc__name desc__name_album">{album.name}</h1>
                        <span className="desc__text">
                            {album.artist} &bull; {numOfSongsInAlbum} {formWordTrack(numOfSongsInAlbum)}, {getTimesOfTracks(songs)}
                        </span>
                    </div>
                </div>
                <div className="info__main">
                    <div className="info__actions">
                        <div className="actions__play"
                             onClick={onSwitchPlay}>
                            {icon}
                        </div>
                        <div className="album__like">
                            <AlbumLike albumId={album._id}/>
                        </div>
                    </div>
                    <h2 className="main__title">Песни</h2>
                    <div className="main__songs">
                        {songs.map((song, index) => {
                            return <Song song={song} order={index + 1} key={song._id} onPlay={() => onPlay(song)}/>;
                        })
                        }
                    </div>
                </div>
            </div>
    );
}
