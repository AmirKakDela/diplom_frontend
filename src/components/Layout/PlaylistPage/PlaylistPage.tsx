import React, {useCallback, useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Button, Menu, Popconfirm, Popover, Tooltip} from "antd";
import {CaretRightFilled as PlayIcon, DeleteOutlined, PauseOutlined as PauseIcon} from "@ant-design/icons";
import MoonLoader from "react-spinners/MoonLoader";

import "./playlistPage.scss";
import {EditPlaylistType, PlaylistType, SongType} from "../../../config/types";
import {useActions} from "../../../hooks/useActions";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {PlayerReducerState} from "../../../redux/Reducers/playerReducer";
import {RootState} from "../../../redux/Reducers/rootReducer";
import {thunkUserPlaylists} from "../../../redux/Actions/thunkUserActions";
import PlaylistAPI from "../../../API/PlaylistAPI";
import SongsAPI from "../../../API/SongsAPI";
import {Song} from "../../Song/Song";
import EditPlaylistModal from "./EditPlaylistModal/EditPlaylistModal";
import {NotAddedSong} from "./NotAddedSong/NotAddedSong";
import PlaylistLike from "./PlaylistLike/PlaylistLike";
import {formWordTrack} from "../../../utils/declension.utils";
import {getTimesOfPlaylistTracks} from "../../../utils/time-format.utils";
import {ThemeContext} from "../theme-context/constants";
import defaultCover from "../../../assets/imgs/song_default.jpg";

const PlaylistPage = () => {
    const theme = useContext(ThemeContext)
    const urlParams = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()
    const user = useSelector((state: RootState) => state.user.currentUser)
    const [playlist, setPlaylist] = useState<PlaylistType>({
        _id: "",
        name: "",
        user: {
            id: "",
            name: ""
        },
        songs: []
    })
    const [songs, setSongs] = useState<SongType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [isAddBlockVisible, setIsAddBlockVisible] = useState<boolean>(false)
    const [allSongs, setAllSongs] = useState<SongType[]>([])

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const {setPlayingSong, setPlayingSongList} = useActions();

    const {pause} = useTypedSelector<PlayerReducerState>((state: RootState) => state.player);
    const isPlayed = !pause;

    const [isPlaylistByUser, setIsPlaylistByUser] = useState<boolean>(false)
    const [playlistCover, setPlaylistCover] = useState(defaultCover);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const onPlaylistEdit = useCallback((data: EditPlaylistType) => {
        if (urlParams.id) {
            const formData = new FormData();
            for (let key in data) {
                // @ts-ignore
                formData.append(key, data[key])
            }

            PlaylistAPI.editPlaylist(urlParams.id, formData)
                .then((data) => {
                        setPlaylist(data)
                    }
                )

            dispatch(thunkUserPlaylists(user.userId))
        }
        setIsModalVisible(false);
    }, [playlist])

    const deletePlaylist = useCallback(() => {
        if (urlParams.id) {
            PlaylistAPI.deletePlaylist(urlParams.id)
                .then(data => {
                        console.log(data.message)
                    }
                )
            dispatch(thunkUserPlaylists(user.userId))
            navigate("/")
        }
    }, [user.playlists])

    function onPlay(song: SongType) {
        setPlayingSongList(songs!);
        setPlayingSong(song);
    }

    const openAddBlock = useCallback(() => {
        SongsAPI.getAllSongs()
            .then((data: SongType[]) => {
                if (songs.length > 0) data = data.filter(s => playlist.songs.indexOf(s._id) === -1)
                setAllSongs(data)
            })
        setIsAddBlockVisible(true)
    }, [allSongs, songs])

    const closeAddBlock = useCallback(() => {
        setIsAddBlockVisible(false)
        setAllSongs([])
    }, [allSongs])

    const addHandler = useCallback((item: SongType, index: number) => {
        if (urlParams.id) {
            PlaylistAPI.addSongToPlaylist(urlParams.id, item._id)
                .then((data) => {
                        setPlaylist(data.updatedPlaylist)
                        setSongs(data.songs)
                    }
                )
            allSongs.splice(index, 1)
            setAllSongs(allSongs)
        }
    }, [songs, allSongs, playlist])


    const deleteSong = useCallback((item: SongType) => {
        if (urlParams.id) {
            PlaylistAPI.deleteSongFromPlaylist(urlParams.id, item._id)
                .then(data => {
                    setPlaylist(data.updatedPlaylist)
                    setSongs(data.songs)
                })
            if (allSongs.length > 0) setAllSongs([...allSongs, item])
        }
    }, [songs, allSongs, playlist])

    const onImageError = () => {
        setPlaylistCover(defaultCover);
    };

    useEffect(() => {
        if (urlParams.id && !isModalVisible) {
            PlaylistAPI.getPlaylistById(urlParams.id).then(data => {
                setPlaylist(data.playlist);
                setSongs(data.songs);
                if (data.playlist.cover) setPlaylistCover(data.playlist.cover)
                setIsLoading(false);
            })
        }
    }, [urlParams.id, isModalVisible])

    useEffect(() => {
        user.userId === playlist.user.id ? setIsPlaylistByUser(true) : setIsPlaylistByUser(false)
    }, [playlist])


    const playlistOptions = () => {
        const optionsHandler = (option: string) => {
            switch (option) {
                case "edit": {
                    showModal();
                    break;
                }
                case "delete": {
                    deletePlaylist();
                    break;
                }
                case "share": {
                    navigator.clipboard.writeText(window.location.href);
                    break;
                }
            }
        }

        return (
            <Menu>
                <Menu.Item onClick={() => optionsHandler("edit")}>
                    Изменить сведения
                </Menu.Item>
                <Menu.Item onClick={() => optionsHandler("delete")}>
                    Удалить
                </Menu.Item>
                <Menu.Item onClick={() => optionsHandler("share")}>
                    Поделиться
                </Menu.Item>
            </Menu>
        )
    }

    const PlaylistActions = () => {
        if (location.pathname.includes("/admin")) return (
            <div className="info__actions">
                {playlist.songs.length > 0
                    &&
                    <div className="actions__play"
                         onClick={() => onPlay(songs[0])}>
                        {isPlayed
                            ? <PauseIcon/>
                            : <PlayIcon/>
                        }
                    </div>}
                <Popover
                    placement="bottomLeft"
                    content={playlistOptions}
                    trigger="click"
                >
                    <Button className="actions__options">&#8943;</Button>
                </Popover>
            </div>
        )

        return (
            <div className="info__actions">
                {playlist.songs.length > 0
                    &&
                    <div className="actions__play"
                         onClick={() => onPlay(songs[0])}>
                        {isPlayed
                            ? <PauseIcon/>
                            : <PlayIcon/>
                        }
                    </div>}
                {!isPlaylistByUser ?
                    <PlaylistLike playlist={playlist}/>
                    :
                    <Popover
                        placement="bottomLeft"
                        content={playlistOptions}
                        trigger="click"
                    >
                        <Button className="actions__options">&#8943;</Button>
                    </Popover>}
            </div>
        )
    }

    return (
        <>
            {!playlist || isLoading ? (
                <MoonLoader color={"white"} css={"margin: 0 auto"}/>
            ) : (
                <div className="playlist">
                    <div className="playlist__info">
                        <div className="info__header">
                            <div className="info__cover" onClick={showModal}>
                                <img src={playlistCover} alt="Обложка плейлиста" onError={onImageError}/>
                            </div>
                            <div className="info__desc">
                                <h2 className="desc__category">Плейлист</h2>
                                <h1 className="desc__name" onClick={showModal}>
                                    {playlist.name}
                                </h1>
                                {playlist.description &&
                                    <span className={"desc__description"}>{playlist.description}</span>}
                                <h2 className="desc__text">
                                    {playlist.user.name} &bull; {playlist.songs.length} {formWordTrack(playlist.songs.length)}, {getTimesOfPlaylistTracks(songs)}
                                </h2>
                            </div>
                        </div>
                        {isPlaylistByUser && <EditPlaylistModal
                            visible={isModalVisible}
                            onEdit={onPlaylistEdit}
                            onCancel={closeModal}
                            playlist={playlist}
                            theme={theme}
                        />}
                        <PlaylistActions/>
                        <div className="info__main">
                            <h2 className="main__title">Песни</h2>

                            <div className="main__songs">
                                {songs.length > 0
                                    ?
                                    songs.map((s, index) => (
                                        <div className="songs__song">
                                            <Song song={s} order={index + 1} key={s._id} onPlay={() => onPlay(s)}/>
                                            {(isPlaylistByUser || user.isAdmin)
                                                &&
                                                <Tooltip placement="topLeft" title={"Удалить из плейлиста"}>
                                                    <Popconfirm
                                                        title="Вы действительно хотите удалить данную песню?"
                                                        onConfirm={() => deleteSong(s)}
                                                        okText="Да"
                                                        cancelText="Нет"
                                                    >
                                                        <span className="admin-song__action">
                                                            <DeleteOutlined className="song__delete"/>
                                                        </span>
                                                    </Popconfirm>
                                                </Tooltip>
                                            }
                                        </div>
                                    ))
                                    :
                                    <span className="songs__notsongs">Треков пока нет.</span>
                                }
                            </div>
                        </div>
                    </div>
                    {!location.pathname.includes("/admin")
                        &&
                        isPlaylistByUser
                        &&
                        <div className="playlist__addblock">
                            {!isAddBlockVisible ? (
                                    <Button className="addblock__open" onClick={openAddBlock}>Добавить
                                        песни?</Button>)
                                :
                                (<div className="addblock__container">
                                    <div className="addblock__header">
                                        <h2 className="addblock__title">Добавить песни</h2>
                                        <Button className="addblock__close"
                                                onClick={closeAddBlock}>&times;</Button>
                                    </div>
                                    <div className="addblock__list">
                                        {allSongs.map((song, index) => (
                                            <NotAddedSong song={song} key={song._id}
                                                          onAdd={() => addHandler(song, index)}
                                                          onPlay={() => onPlay(song)}/>))
                                        }
                                    </div>
                                </div>)}
                        </div>
                    }
                </div>
            )}
        </>
    );
};

export default PlaylistPage;
