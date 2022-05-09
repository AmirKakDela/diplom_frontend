import React, {useEffect, useState} from "react";
import "./artistPage.scss";
import {useParams} from "react-router-dom";
import {Song} from "../../Song/Song";
import MoonLoader from "react-spinners/MoonLoader";
import AlbumCard from "../../AlbumCard/AlbumCard";
import {AlbumType, ArtistType, SongType} from "../../../config/types";
import ArtistAPI from "../../../API/ArtistAPI";
import {formWordAlbum, formWordTrack} from "../../../utils/declension.utils";
import {useActions} from "../../../hooks/useActions";
import AlbumAPI from "../../../API/AlbumAPI";

const ArtistPage = () => {
    const urlParams = useParams();
    const [artist, setArtist] = useState<ArtistType>({image: '', _id: '', name: ''});
    const [songs, setSongs] = useState<SongType[]>([]);
    const [albums, setAlbums] = useState<AlbumType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { setPlayingSong, setPlayingSongList } = useActions();

    const onClickPlayIcon = (albumId: string) => {
        AlbumAPI.getAlbumById(albumId)
            .then(data => {
                setPlayingSongList(data.songs);
                setPlayingSong(data.songs[0]);
            });
    };

    useEffect(() => {
        if (urlParams.id) {
            ArtistAPI.getArtistById(urlParams.id).then(data => {
                setArtist(data.artist);
                setSongs(data.songs);
                setAlbums(data.albums);
                setIsLoading(false);
            })
        }
    }, [urlParams.id]);

    const onPlay = (song: SongType) => {
        setPlayingSongList(songs);
        setPlayingSong(song);
    }

    return (
        <>
            {
                isLoading
                    ? <MoonLoader color={"white"} css={"margin: 0 auto"}/>
                    : <div className="info">
                        <div className="info__header">
                            <div className="info__cover">
                                <img
                                    src={artist.image}
                                    alt="Изображение артиста"/>
                            </div>
                            <div className="info__desc">
                                <h2 className="desc__category">Исполнитель</h2>
                                <h1 className="desc__name">{artist.name}</h1>
                                <p className="desc__text">{songs.length} {formWordTrack(songs.length)}
                                    , {albums.length} {formWordAlbum(albums.length)}</p>
                            </div>
                        </div>
                        <div className="info__main">
                            <h2 className="main__title">Альбомы</h2>
                            <div className="main__slider">
                                {albums.map(album => <AlbumCard
                                    key={album._id}
                                    onClickPlayIcon={() => onClickPlayIcon(album._id)}
                                    album={album}/>)}
                            </div>
                            <h2 className="main__title">Песни</h2>
                            <div className="main__songs">
                                {songs.map((s, index) => (
                                    <Song song={s} order={index + 1} key={s._id} onPlay={onPlay.bind(this, s)}/>
                                ))}
                            </div>
                        </div>
                    </div>
            }
        </>
    );
};

export default ArtistPage;
