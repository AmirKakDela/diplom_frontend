import {HeartFilled, HeartOutlined, LoadingOutlined} from "@ant-design/icons";
import React, {useCallback, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/Reducers/rootReducer";
import {thunkToggleLikeAlbum} from "../../../redux/Actions/thunkUserActions";
import {Spin} from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin/>;

type PropsType = {
    albumId: string;
}

const AlbumLike: React.FC<PropsType> = (props) => {
    const likedAlbums = useSelector((state: RootState) => state.user.currentUser?.likedAlbums);
    const likeAlbumLoading = useSelector((state: RootState) => state.user.currentUser?.likeAlbumLoading);
    const dispatch = useDispatch();
    const toggleLikeAlbum = useCallback(() => {
        dispatch(thunkToggleLikeAlbum(props.albumId));
    }, [props.albumId, dispatch]);
    const isAlbumLiked = useMemo(() => {
        return likedAlbums?.length && likedAlbums.includes(props.albumId);
    }, [likedAlbums, props.albumId]);

    const likeView = isAlbumLiked
        ? <HeartFilled style={{fontSize: '40px', color: "#1db954", marginLeft: 10}} onClick={toggleLikeAlbum}/>
        : <HeartOutlined style={{fontSize: '40px', color: "white", marginLeft: 10}} onClick={toggleLikeAlbum}/>;

    const isLikeAlbumLoading = likeAlbumLoading.status;
    const view = isLikeAlbumLoading
        ? <Spin indicator={antIcon} className="clip-loader" style={{fontSize: '40px'}}/>
        : likeView;
    return (view);
};

export default AlbumLike;
