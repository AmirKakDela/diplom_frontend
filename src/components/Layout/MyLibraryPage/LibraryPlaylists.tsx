import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Skeleton} from "antd";

import {RootState} from "../../../redux/Reducers/rootReducer";
import {
    thunkUserLikedPlaylists,
    thunkUserPlaylists
} from "../../../redux/Actions/thunkUserActions";
import {ScrollComponent} from "../../ScrollComponent/ScrollComponent";
import PlaylistCard from "../../PlaylistCard/PlaylistCard";

const LibraryPlaylists: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.currentUser);
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        if (isLoading) {
            if (user.likedPlaylists.length === 0) {
                dispatch(thunkUserLikedPlaylists(user.userId));
            }
            if (user.playlists.length === 0) {
                dispatch(thunkUserPlaylists(user.userId));
            }
            setIsLoading(false)
        }
    }, [user.likedPlaylists, user.playlists, isLoading, dispatch])

    return (
        <>
            {isLoading ? <Skeleton active/> :
                <div className="library__info">
                    <h1 className="library__title">Плейлисты</h1>
                    <h2 className="library__subtitle">
                        <span>{user.userName}  &bull; </span> {user.playlists.length + user.likedPlaylists.length} плейлистов
                    </h2>
                    <div className="library__songs-wrap">
                        {user.playlists.length > 0 ? <ScrollComponent titleName="Мои плейлисты" data={
                                user.playlists.map(playlist => {
                                    return <PlaylistCard key={playlist._id} playlist={playlist}/>;
                                })
                            }/>
                            :
                            <span className="library__notsongs">
                                Ты пока не создал ни одного плейлиста.
                            </span>
                        }
                    </div>
                    <div className="library__songs-wrap">
                        {user.likedPlaylists.length > 0
                            ?
                            <ScrollComponent titleName="Любимые плейлисты" data={
                                user.likedPlaylists.map(playlist => {
                                    return <PlaylistCard key={playlist._id} playlist={playlist}/>;
                                })
                            }/>
                            :
                            <span className="library__notsongs">Любимых плейлистов пока нет. Но их можно <Link
                                to='/search'>добавить</Link>!
                            </span>
                        }
                    </div>
                </div>
            }
        </>
    );
};

export default LibraryPlaylists;
