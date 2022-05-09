import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {AlbumType} from "../../../config/types";
import {RootState} from "../../../redux/Reducers/rootReducer";
import {useActions} from "../../../hooks/useActions";
import {Skeleton} from "antd";
import {Link} from "react-router-dom";
import AlbumAPI from "../../../API/AlbumAPI";
import {ScrollComponent} from "../../ScrollComponent/ScrollComponent";
import AlbumCard from "../../AlbumCard/AlbumCard";
import {formWordAlbum} from "../../../utils/declension.utils";

const LibraryAlbums: React.FC = () => {
    const [albums, setAlbums] = useState<AlbumType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const user = useSelector((state: RootState) => state.user.currentUser);
    const { setPlayingSong, setPlayingSongList } = useActions();

    const onClickPlayIcon = (albumId: string) => {
        AlbumAPI.getAlbumById(albumId)
            .then(data => {
                setPlayingSongList(data.songs);
                setPlayingSong(data.songs[0]);
            });
    };

    useEffect(() => {
        AlbumAPI.getLikedAlbumsOfUser()
            .then(data => {
                setAlbums(data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="library">
            {isLoading ? <Skeleton active/> :
                <div className="library__info">
                    <h1 className="library__title">Альбомы</h1>
                    <h2 className="library__subtitle">
                        <span>{user.userName}  &bull; </span> {user.likedAlbums.length} {formWordAlbum(user.likedAlbums.length)}
                    </h2>
                    <div className="library__songs-wrap">
                        {albums.length > 0
                            ? <ScrollComponent titleName="Мои альбомы" data={
                                albums.map(album => {
                                    return <AlbumCard key={album._id}
                                                      album={album}
                                                      onClickPlayIcon={() => onClickPlayIcon(album._id)}
                                    />;
                                })
                            }/>
                            : <h1 className="library__notsongs">
                                Альбомов пока нет. Но их можно <Link to="/search">добавить</Link>!
                            </h1>
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default LibraryAlbums;
