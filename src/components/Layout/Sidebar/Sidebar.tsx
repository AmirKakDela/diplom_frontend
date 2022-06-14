import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Menu, MenuTheme} from "antd";

import {PlaylistType, SidebarItemType} from "../../../config/types";
import {RootState} from "../../../redux/Reducers/rootReducer";
import {thunkUserPlaylists} from "../../../redux/Actions/thunkUserActions";
import {MenuInfo} from "rc-menu/lib/interface";
import PlaylistAPI from "../../../API/PlaylistAPI";
import SpotifyLogo from "../../../assets/icons/Spotify-Logo.wine.svg";
import "./Sidebar.scss";

type PropsType = {
    items: SidebarItemType[],
    currentTheme?: MenuTheme,
}

const Sidebar: React.FC<PropsType> = (props) => {
    const navigate = useNavigate();
    let location = useLocation();
    // let current = props.items?.find(item => item?.path.includes(location.pathname))?.path || "/";
    // const handleClick = useCallback((e: MenuInfo) => current = e.key, []);
    const [current, setCurrent] = useState('home');
    const handleClick = (e: MenuInfo) => setCurrent(e.key);
    const dispatch = useDispatch();
    const currentTheme = useSelector((state: RootState) => state.shared.appTheme);
    const user = useSelector((state: RootState) => state.user.currentUser);
    const [playlists, setPlaylists] = useState<PlaylistType[]>([]);

    const menuItemHandler = (itemPath: string) => {
        itemPath === "/create-playlist" ? createPlaylist() : navigate(itemPath);
    };

    const createPlaylist = useCallback(() => {
        const playlistsByCurrentUser = playlists.filter(el => el.user.id === user.userId);
        let newPlaylistNumber = playlistsByCurrentUser.length + 1;
        while (playlistsByCurrentUser.find(p => p.name === `Мой плейлист №${newPlaylistNumber}`)) {
            newPlaylistNumber++;
        }

        const newPlaylist = {
            name: `Мой плейлист №${newPlaylistNumber}`,
            user: {
                id: user.userId,
                name: user.userName
            },
            songs: []
        };

        PlaylistAPI.createPlaylist(newPlaylist)
            .then(data => {
                dispatch(thunkUserPlaylists(user.userId));
                if (data.playlist) {
                    navigate(`/playlist/${data.playlist._id}`);
                }
            });
    }, [playlists, dispatch, navigate, user.userId, user.userName]);

    useEffect(() => {
        setPlaylists([...user.playlists, ...user.likedPlaylists])
    }, [dispatch, user.playlists, user.likedPlaylists]);

    return (
        <div className="sidebar">
            <div className="home-logo">
                <Link to="/">
                    AMIR MUSIC
                </Link>
            </div>
            <Menu className="menu"
                  onClick={handleClick}
                  selectedKeys={[current]}
                  theme={currentTheme}
            >
                <Menu.ItemGroup className="menu__items">
                    {props.items.map((item) => {
                        return (
                            <Menu.Item
                                key={item.itemId}
                                onClick={() => menuItemHandler(item.path)}
                                icon={item.icon && React.createElement(item.icon)}
                                id={item.itemId}
                            >
                                {item.text}
                            </Menu.Item>
                        );
                    })}
                </Menu.ItemGroup>
                {!location.pathname.includes("/admin")
                    &&
                    playlists.length > 0
                    &&
                    <Menu.ItemGroup className="menu__playlists">
                        {playlists.map((item, index) => {
                            return (
                                <Menu.Item
                                    className="menu__playlist"
                                    key={5 + index}
                                    onClick={() => navigate(`/playlist/${item._id}`)}
                                    id={item._id}>
                                        <span className="playlist__name">{item.name}</span>
                                        {user.userId != item.user.id && <span className="playlist__author">{item.user.name}</span>}
                                </Menu.Item>
                            );
                        })}
                    </Menu.ItemGroup>}
            </Menu>
        </div>
    );
}

export default Sidebar;
