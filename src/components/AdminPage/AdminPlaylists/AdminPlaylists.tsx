import React, {useCallback, useEffect, useState} from "react";
import {Button, Popconfirm, Skeleton} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";

import "./AdminPlaylists.scss"
import PlaylistApi from "../../../API/PlaylistAPI";
import {PlaylistType} from "../../../config/types";
import PlaylistCard from "../../PlaylistCard/PlaylistCard";
import {RootState} from "../../../redux/Reducers/rootReducer";
import {thunkUserPlaylists} from "../../../redux/Actions/thunkUserActions";

const AdminPlaylists: React.FC = () => {
    const [playlists, setPlaylists] = useState<PlaylistType[]>([])
    const [isLoading, setIsLoading] = useState(true);

    const user = useSelector((state: RootState) => state.user.currentUser)
    const dispatch = useDispatch()

    const deletePlaylist = useCallback((id: string) => {
        PlaylistApi.deletePlaylist(id)
            .then((data) => {
                console.log(data.message)
                setPlaylists(playlists.filter(playlist => playlist._id !== id));
                if(user.userId === data.deletedPlaylist.user.id) dispatch(thunkUserPlaylists(user.userId))
            })
    }, [playlists])

    useEffect(() => {
        PlaylistApi.getAllPlaylists().then(data => {
            setPlaylists(data.playlists)
            setIsLoading(false)
        })
    }, [])

    return (
        <div className="admin admin_playlists">
            {isLoading ? <Skeleton active/> :
                playlists && playlists.map((playlist) => {
                    return <div className="admin_playlist__wrap">
                        <PlaylistCard playlist={playlist}/>
                        <div className="admin_playlist__delete">
                            <Popconfirm
                                title="Вы действительно хотите удалить данный плейлист?"
                                onConfirm={() => deletePlaylist(playlist._id)}
                                okText="Да"
                                cancelText="Нет"
                            >
                                <Button className="admin_playlist__button" icon={<DeleteOutlined/>}/>
                            </Popconfirm>
                        </div>
                    </div>
                })}
        </div>
    )
}

export default AdminPlaylists