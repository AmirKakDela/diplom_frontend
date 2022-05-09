import React, {useEffect, useState} from 'react';
import './genrePage.scss';
import {useParams} from "react-router-dom";
import API from "../../../API/GenreAPI";
import {GenreType, SongType} from "../../../config/types";
import MoonLoader from "react-spinners/MoonLoader";
import {Song} from "../../Song/Song";


const GenrePage: React.FC = () => {
    const urlParams = useParams();
    const [genre, setGenre] = useState<GenreType>({
        _id: '',
        color: 'black',
        name: ''
    })
    const [songs, setSongs] = useState<SongType[]>([]);
    const [playlists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (urlParams.id) {
            API.getGenre(urlParams.id).then(data => {
                setGenre(data.genre);
                setSongs(data.songs);
            })
        }
        setLoading(false);
    }, [urlParams.id])

    return (

        <>
            {loading ? <MoonLoader/> :
                <div className="info genre-page">
                    <div className="info__header genre-page__header"
                         style={{backgroundColor: genre.color}}
                    >
                        <h1 className="desc__name genre-page__name">{genre.name}</h1>
                    </div>
                    <div className="info__main">
                        <h2 className="main__title">Плейлисты</h2>
                        <div className="main__slider">
                            {!!playlists.length ? playlists.map(playlist => (
                                ''
                            )) : (<p className="genre-page__subtitle">У
                                жанра {genre.name && genre.name.toUpperCase()} пока нет плейлистов. Скоро мы это
                                исправим.</p>)}
                        </div>
                        <h2 className="main__title">Песни</h2>
                        <div className="main__songs">
                            {!!songs.length ? songs.map((song, idx) => (
                                <Song key={song._id} song={song} order={idx + 1}/>
                            )) : (<p className="genre-page__subtitle">У
                                жанра {genre.name && genre.name.toUpperCase()} пока нет песен. Скоро мы это
                                исправим.</p>)}
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default GenrePage;
