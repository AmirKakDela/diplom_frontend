import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/Reducers/rootReducer";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import {thunkToggleLikeSong} from "../../redux/Actions/thunkUserActions";
import {SongType} from "../../config/types";
import {Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

type PropsType = {
    song: SongType;
}

const Like: React.FC<PropsType> = (props) => {
    const user = useSelector((state: RootState) => state.user.currentUser);
    const likeLoading = useSelector((state: RootState) => state.user.currentUser.likeLoading);
    const dispatch = useDispatch();

    const toggleLike = () => {
        dispatch(thunkToggleLikeSong(props.song));
    };


    const likeStatus = user.likedSongs.length && user.likedSongs.includes(props.song._id)

    return (
        <div>
            {
                likeLoading.status && likeLoading.songId === props.song._id
                    ? <Spin indicator={antIcon} className='clip-loader'/>
                    : user && likeStatus
                        ? <HeartFilled className='heart-filled' onClick={toggleLike}/>
                        : <HeartOutlined onClick={toggleLike} className='heart-outlined'/>
            }
        </div>
    );
};

export default Like;
