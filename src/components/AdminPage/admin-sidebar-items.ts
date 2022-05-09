import {SidebarItemType} from "../../config/types";

export const adminSidebarItems: SidebarItemType[] = [
    {
        path: '/admin',
        itemId: 'admin-home',
        text: 'Главная'
    },
    {
        path: '/admin/songs',
        itemId: 'admin-songs',
        text: 'Все песни'
    },
    {
        path: '/admin/playlists',
        itemId: 'admin-playlists',
        text: 'Все плейлисты'
    },
    {
        path: '/admin/albums',
        itemId: 'admin-albums',
        text: 'Все альбомы'
    },
    {
        path: '/admin/artists',
        itemId: 'admin-artists',
        text: 'Все исполнители'
    },
    {
        path: '/admin/genres',
        itemId: 'admin-genres',
        text: 'Все жанры'
    }
]
