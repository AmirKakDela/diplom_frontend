import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/Reducers/rootReducer";
import {Song} from "../../Song/Song";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useActions} from "../../../hooks/useActions";
import {SongType} from "../../../config/types";
import SongsAPI from "../../../API/SongsAPI";
import {Skeleton} from "antd";
import {formWordTrack} from "../../../utils/declension.utils";

const LibrarySong: React.FC = () => {
    const dispatch = useDispatch();
    const [songs, setSongs] = useState<SongType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const user = useSelector((state: RootState) => state.user.currentUser);
    const {setPlayingSong, setPlayingSongList} = useActions();

    useEffect(() => {
        SongsAPI.getFullLikedSongsOfUser().then(data => {
            setSongs(data)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [dispatch]);

    function onPlay(song: SongType) {
        setPlayingSongList(songs);
        setPlayingSong(song);
    }

    return (
        <div className="library">
            {isLoading ? <Skeleton active/> :
                <div className="library__info">
                    <h1 className="library__title">Любимые треки</h1>
                    <h2 className="library__subtitle">
                        <span>{user.userName}  &bull; </span> {songs.length} {formWordTrack(songs.length)}
                    </h2>
                    <div className="library__songs-wrap">
                        {songs.length > 0
                            ? songs.map((song, index) => {
                                return <Song key={song._id} song={song} order={index + 1}
                                             onPlay={onPlay.bind(this, song)}/>;
                            })
                            : <h1 className="library__notsongs">
                                Треков пока нет. Но их можно
                                <Link to="/search">добавить</Link>!
                            </h1>
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default LibrarySong;
