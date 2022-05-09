import React, {useEffect, useState} from "react";
import {CaretRightOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {Link, useLocation} from "react-router-dom";

import "./PlaylistCard.scss";
import {formWordTrack} from "../../utils/declension.utils";
import defaultCover from "../../assets/imgs/song_default.jpg";
import {PlaylistType} from "../../config/types";

type PropsType = {
    playlist: PlaylistType
}

function PlaylistCard(props: PropsType) {
    const {playlist} = props
    const location = useLocation()
    const [playlistCover, setPlaylistCover] = useState(defaultCover);

    const onImageError = () => {
        setPlaylistCover(defaultCover);
    };

    useEffect(()=>{
        if(playlist.cover) setPlaylistCover(playlist.cover)
    }, [playlist])

    if (location.pathname === "/admin/playlists") {

        return (
            <Link to={`/admin/playlist/${playlist._id}`}>
                <div className="playlist__card">
                    <img
                        src={playlistCover}
                        alt="cover"
                        className="card__img"
                        onError={onImageError}/>
                    <h2 className="card__name">
                        {playlist.name}
                    </h2>
                    <h3 className="card__artist">
                        {playlist.user.name}
                    </h3>
                    <span className="card__tracks">
                        {playlist.songs.length} {formWordTrack(playlist.songs.length)}
                    </span>
                </div>
            </Link>
        )
    }

    return (
        <Link to={`/playlist/${playlist._id}`}>
            <div className="playlist__card">
                <img
                    src={playlistCover}
                    alt="cover"
                    className="card__img"
                    onError={onImageError}/>
                <h2 className="card__name">
                    {playlist.name}
                </h2>
                <h3 className="card__artist">
                    {playlist.user.name}
                </h3>
                <span className="card__tracks">
                    {playlist.songs.length} {formWordTrack(playlist.songs.length)}
                </span>
                <Button shape="circle" icon={<CaretRightOutlined/>} className="card__btn"/>
            </div>
        </Link>
    );
}

export default PlaylistCard;
