import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import {ClipLoader} from "react-spinners";
import {PlaylistType} from "../../../../config/types";
import {RootState} from "../../../../redux/Reducers/rootReducer";
import {thunkToggleLikePlaylist} from "../../../../redux/Actions/thunkUserActions";

type PropsType = {
    playlist: PlaylistType
}

const Like: React.FC<PropsType> = (props) => {
    const user = useSelector((state: RootState) => state.user.currentUser)
    const likePlaylistLoading = useSelector((state: RootState) => state.user.currentUser.likePlaylistLoading)
    const dispatch = useDispatch();

    const toggleLike = () => {
        dispatch(thunkToggleLikePlaylist(props.playlist));
    }
    const likePlaylistStatus = user.likedPlaylists.find(playlist => playlist._id === props.playlist._id)

    return (
        <div>
            {likePlaylistLoading.status && likePlaylistLoading.playlistId === props.playlist._id
                ? <ClipLoader color='white' css={'display: block; width: 18px; height: 18px'}/>
                : user && likePlaylistStatus
                    ? <HeartFilled style={{fontSize: '40px', color: "#1db954", marginLeft: 10}} onClick={toggleLike}/>
                    : <HeartOutlined style={{fontSize: '40px', color: "white", marginLeft: 10}} onClick={toggleLike}/>
            }
        </div>
    );
};

export default Like;
