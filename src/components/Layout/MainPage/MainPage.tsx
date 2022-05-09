import React, {useEffect, useState} from "react";
import AlbumCard from "../../AlbumCard/AlbumCard";
import ArtistCard from "../../ArtistCard/ArtistCard";
import {ScrollComponent} from "../../ScrollComponent/ScrollComponent";
import {AlbumType, ArtistType, PlaylistType} from "../../../config/types";
import ArtistAPI from "../../../API/ArtistAPI";
import PlaylistAPI from "../../../API/PlaylistAPI";
import PlaylistCard from "../../PlaylistCard/PlaylistCard";
import AlbumAPI from "../../../API/AlbumAPI";
import {Skeleton} from "antd";
import "./MainPage.scss";
import {useActions} from "../../../hooks/useActions";

const MainPage: React.FC = () => {
    const [artists, setArtists] = useState<ArtistType[]>([]);
    const [playlists, setPlaylists] = useState<PlaylistType[]>([]);
    const [albums, setAlbums] = useState<AlbumType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { setPlayingSong, setPlayingSongList } = useActions();

    const onClickPlayIcon = (albumId: string) => {
        AlbumAPI.getAlbumById(albumId)
            .then(data => {
                setPlayingSongList(data.songs);
                setPlayingSong(data.songs[0]);
            });
    };

    useEffect(() => {
        ArtistAPI.getAllArtists().then(data => {
            setArtists(data);
        });
        PlaylistAPI.getAllPlaylists().then(data => {
            setPlaylists(data.playlists);
        });
        AlbumAPI.getAllAlbums().then(data => {
            setAlbums(data);
        });
        setIsLoading(false);
    }, []);

    return (
        <div className="main-page-content">
            {isLoading
                ? <Skeleton active/>
                : <div>
                    <ScrollComponent titleName="Не пропусти топовые плейлисты" data={
                        playlists.map(playlist => {
                            return <PlaylistCard
                                key={playlist._id}
                                playlist={playlist}/>;
                        })
                    }/>
                    <ScrollComponent titleName="Популярные альбомы" data={
                        albums.map(album => {
                            return <AlbumCard
                                key={album._id}
                                album={album}
                                onClickPlayIcon={() => onClickPlayIcon(album._id)}
                            />;
                        })}/>
                    <ScrollComponent titleName="Популярные исполнители" data={
                        artists.map(art => {
                            return (<ArtistCard
                                key={art._id}
                                artist={art}/>);
                        })}/>
                </div>
            }
        </div>
    );
};

export default MainPage;
