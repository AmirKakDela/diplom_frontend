import React, {useCallback, useEffect, useState} from "react";
import {AlbumType, SongType} from "../../../config/types";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {Popconfirm, Skeleton} from "antd";
import AlbumCard from "../../AlbumCard/AlbumCard";
import AlbumAPI from "../../../API/AlbumAPI";
import "./AdminAlbums.scss";
import {useActions} from "../../../hooks/useActions";

const AdminAlbums: React.FC = () => {
    const [albums, setAlbums] = useState<AlbumType<SongType>[]>([{ _id: "", name: "", artist: "", songs: [], cover: "" }]);
    const [isLoading, setIsLoading] = useState(true);
    const { setPlayingSong, setPlayingSongList } = useActions();
    const onClickPlayIcon = (albumId: string) => {
        if(albums?.length) {
            const songs = albums.find(it => it._id === albumId).songs || [];
            setPlayingSongList(songs);
            setPlayingSong(songs[0]);
        }
    };
    const deleteAlbum = useCallback((id: string) => {
        AlbumAPI.deleteAlbum(id)
            .then(() => {
                setAlbums(albums.filter(album => album._id !== id));
            });
    }, [albums]);

    useEffect(() => {
        AlbumAPI.getAllAlbumsWithSongs().then(data => {
            setAlbums(data);
            setIsLoading(false);
        });
    }, []);

    return (
        <div className="admin">
            {isLoading ? <Skeleton active/> :
                <>
                    <Link to="/admin/album/create">
                        <button className="form__button admin__button">Создать новый альбом</button>
                    </Link>
                    {albums && albums.map((album) => {
                        return <div className="admin-song__wrap admin-album__wrap" key={album._id}>
                            <AlbumCard key={album._id}
                                       album={album}
                                       onClickPlayIcon={() => onClickPlayIcon(album._id)}/>
                            <div className="songs-container">
                                <h3 className="song__name">Список песен: </h3>
                                <div className="admin-album__wrap song-list">
                                    {album.songs.map((song, index) =>
                                        <h4 className="song__name _item">{index + 1}. {song.name}</h4>
                                    )}
                                </div>
                            </div>
                            <div className="group-form__button">
                                <Popconfirm
                                    title="Вы действительно хотите удалить данный альбом?"
                                    onConfirm={() => deleteAlbum(album._id)}
                                    okText="Да"
                                    cancelText="Нет"
                                >
                                    <button className="form__button admin-song__action admin-album__action">
                                        <DeleteOutlined style={{ fontSize: 20, color: "white", cursor: "pointer" }}/>
                                    </button>
                                </Popconfirm>
                                <Link to={`/admin/album/update/${album._id}`}>
                                    <button className="form__button admin-song__action admin-album__action">
                                        <EditOutlined style={{ fontSize: 20, color: "white", cursor: "pointer" }}/>
                                    </button>
                                </Link>
                            </div>
                        </div>;
                    })}
                </>
            }
        </div>
    );
};

export default AdminAlbums;
