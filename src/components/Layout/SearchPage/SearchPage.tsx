import Input from 'antd/lib/input';
import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import './searchPage.scss';
import {SearchOutlined} from '@ant-design/icons';
import Genre from "../../Genre/Genre";
import AlbumCard from "../../AlbumCard/AlbumCard";
import {getSearchResult} from "../../../redux/Actions/thunkSearchAction";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from '../../../redux/Reducers/rootReducer';
import debounce from 'lodash.debounce';
import ArtistCard from "../../ArtistCard/ArtistCard";
import {useSearchParams} from 'react-router-dom';
import {getAlbumsByRequest} from "../../../redux/Actions/thunkAlbumActions";
import {Song} from "../../Song/Song";
import GenreAPI from "../../../API/GenreAPI";
import {GenreType, SongType} from "../../../config/types";
import {ScrollComponent} from "../../ScrollComponent/ScrollComponent";
import {useActions} from "../../../hooks/useActions";
import PlaylistCard from "../../PlaylistCard/PlaylistCard";
import AlbumAPI from "../../../API/AlbumAPI";

const SearchPage = () => {
    const dispatch = useDispatch();
    const searchResult = useSelector((state: RootState) => state.search.searchResult);
    const popularAlbums = useSelector((state: RootState) => state.album.albums); //здесь нужно получать популярные альбомы, пока получаем все из бд
    const [genres, setGenres] = useState<GenreType[]>([])
    const [searchQuery, setSearchQuery] = useSearchParams();
    const searchString = searchQuery.get('query');
    const [queryValue, setQueryValue] = useState(searchString || '');
    const debouncedGetSearch = useMemo(() =>
        debounce(queryValue => {
            dispatch(getSearchResult(queryValue))
            setSearchQuery({query: queryValue})
        }, 250), [dispatch, setSearchQuery]
    );

    const { setPlayingSong, setPlayingSongList } = useActions();

    const onClickPlayIcon = (albumId: string) => {
        AlbumAPI.getAlbumById(albumId)
            .then(data => {
                setPlayingSongList(data.songs);
                setPlayingSong(data.songs[0]);
            });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQueryValue(e.target.value);
        debouncedGetSearch(e.target.value);
    }

    function onPlay(song: SongType) {
        setPlayingSongList(searchResult.songs);
        setPlayingSong(song);
    }

    useEffect(() => {
        if (genres.length === 0) {
            GenreAPI.getAllGenre().then(data => {
                setGenres(data);
            })
        }
    }, [genres.length]);

    useEffect(() => {
        dispatch(getAlbumsByRequest());
    }, [dispatch])

    useEffect(() => {
        if (searchString !== null && queryValue.trim()) {
            dispatch(getSearchResult(queryValue));
        }
    }, []);

    return (
        <div className="search">
            <Input placeholder="Исполнитель, трек или плейлист" allowClear
                   prefix={<SearchOutlined style={{fontSize: '22px', marginRight: 5}}/>}
                   className="search__input"
                   value={queryValue}
                   onChange={handleChange}
            />
            {!queryValue ? <div className="search__content">
                    <ScrollComponent className="search__genres-row" titleName="Топ жанров" data={
                        genres && genres.map(genre => (
                            <Genre key={genre._id} genre={genre}/>
                        ))}/>
                    <h2 className="search__title">Популярные плейлисты и альбомы</h2>
                    <div className="search__other">
                        {popularAlbums.map(album => {
                            return <AlbumCard key={album._id}
                                              album={album}
                                              onClickPlayIcon={() => onClickPlayIcon(album._id)}/>
                        })}
                    </div>
                </div>
                :
                <div className="search__content">
                    <h2 className="search__title">Треки</h2>
                    <div className="search__songs">
                        {searchResult.songs && searchResult.songs.map((song, index) => {
                            return <Song key={song._id}
                                         song={song}
                                         order={index + 1}
                                         onPlay={onPlay.bind(this, song)}/>
                        })}
                    </div>
                    <h2 className="search__title">Исполнители</h2>
                    {searchResult.artists.length ? <div className="search__genres-row">
                        {searchResult.artists.map(art => {
                            return (<ArtistCard key={art._id} artist={art}/>)
                        })}
                    </div> : null}
                    <ScrollComponent className="search__genres-row" titleName="Плейлисты" data={
                        searchResult.playlists.length && searchResult.playlists.map(playlist => {
                            return (<PlaylistCard key={playlist._id} playlist={playlist}/>)
                        })
                    }/>
                    <div className="search__other">
                    </div>
                </div>
            }
        </div>
    );
};

export default SearchPage;
