import {
    CurrentUserType,
    LikeLoadingType,
    PlaylistType,
    SongType,
    LikePlaylistLoadingType,
    AlbumType,
    LikeAlbumLoadingType
} from "../../config/types";

export enum UserActionTypeTypes {
    SET_CURRENT_USER = "SET_CURRENT_USER",
    LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER",
    SET_AUTH_ERROR = "SET_AUTH_ERROR",
    SET_USER_LIKED_SONGS = "SET_USER_LIKED_SONGS",
    TOGGLE_LIKE_SONG = "TOGGLE_LIKE_SONG",
    USER_LOADING = "USER_LOADING",
    LIKE_LOADING = "LIKE_LOADING",
    SET_USER_PLAYLISTS = "SET_USER_PLAYLISTS",
    SET_USER_LIKED_PLAYLISTS = "SET_USER_LIKED_PLAYLISTS",
    TOGGLE_LIKE_PLAYLIST = "TOGGLE_LIKE_PLAYLIST",
    LIKE_PLAYLIST_LOADING = "LIKE_PLAYLIST_LOADING",
    TOGGLE_LIKE_ALBUM = "TOGGLE_LIKE_ALBUM",
    LIKE_ALBUM_LOADING = "LIKE_ALBUM_LOADING",
    SET_USER_LIKED_ALBUMS = 'SET_USER_LIKED_ALBUMS',
}

export type UserActionTypes = SetCurrentUserType
    | LogoutCurrentUserType
    | SetAuthErrorType
    | SetUserLikedSongsType
    | UserLoadingType
    | ToggleLikeSongType
    | LikeLoadingTypeAction
    | SetUserPlaylistsType
    | LikePlaylistLoadingTypeAction
    | SetUserLikedPlaylistsType
    | ToggleLikePlaylistType
    | ToggleLikeAlbumType
    | LikeAlbumLoadingTypeAction
    | SetUserLikedAlbumsType;

type LogoutCurrentUserType = {
    type: UserActionTypeTypes.LOGOUT_CURRENT_USER
}

export const logoutCurrentUser = (): LogoutCurrentUserType => {
    localStorage.removeItem("token");
    return {
        type: UserActionTypeTypes.LOGOUT_CURRENT_USER
    };
};

export type SetCurrentUserType = {
    type: UserActionTypeTypes.SET_CURRENT_USER,
    payload: CurrentUserType
}
export const setCurrentUser = (currentUser: CurrentUserType): SetCurrentUserType => {
    return {
        type: UserActionTypeTypes.SET_CURRENT_USER,
        payload: currentUser
    };
};

export type SetAuthErrorType = {
    type: UserActionTypeTypes.SET_AUTH_ERROR,
    payload: string | null
}

export const setAuthError = (error: string | null): SetAuthErrorType => {
    return {
        type: UserActionTypeTypes.SET_AUTH_ERROR,
        payload: error
    };
};

export type UserLoadingType = {
    type: UserActionTypeTypes.USER_LOADING,
    payload: boolean
}

export const userLoading = (status: boolean): UserLoadingType => {
    return {
        type: UserActionTypeTypes.USER_LOADING,
        payload: status
    };
};

export type SetUserLikedSongsType = {
    type: UserActionTypeTypes.SET_USER_LIKED_SONGS,
    payload: Array<SongType>
}

export const setUserLikedSongs = (likedSongs: Array<SongType>): SetUserLikedSongsType => {
    return {
        type: UserActionTypeTypes.SET_USER_LIKED_SONGS,
        payload: likedSongs
    };
};

export type ToggleLikeSongType = {
    type: UserActionTypeTypes.TOGGLE_LIKE_SONG,
    payload: SongType
}

export const toggleLikeSong = (song: SongType): ToggleLikeSongType => {
    return {
        type: UserActionTypeTypes.TOGGLE_LIKE_SONG,
        payload: song
    };
};

export type LikeLoadingTypeAction = {
    type: UserActionTypeTypes.LIKE_LOADING,
    payload: LikeLoadingType
}

export const likeLoading = (likeSong: LikeLoadingType): LikeLoadingTypeAction => {
    return {
        type: UserActionTypeTypes.LIKE_LOADING,
        payload: likeSong
    };
};

export type SetUserPlaylistsType = {
    type: UserActionTypeTypes.SET_USER_PLAYLISTS,
    payload: Array<PlaylistType>
}

export const setUserPlaylists = (userPlaylists: Array<PlaylistType>): SetUserPlaylistsType => {
    return {
        type: UserActionTypeTypes.SET_USER_PLAYLISTS,
        payload: userPlaylists
    };
};

export type SetUserLikedPlaylistsType = {
    type: UserActionTypeTypes.SET_USER_LIKED_PLAYLISTS,
    payload: Array<PlaylistType>
}

export const setUserLikedPlaylists = (likedPlaylists: Array<PlaylistType>): SetUserLikedPlaylistsType => {
    return {
        type: UserActionTypeTypes.SET_USER_LIKED_PLAYLISTS,
        payload: likedPlaylists
    };
};

export type ToggleLikePlaylistType = {
    type: UserActionTypeTypes.TOGGLE_LIKE_PLAYLIST,
    payload: PlaylistType
}

export const toggleLikePlaylist = (playlist: PlaylistType): ToggleLikePlaylistType => {
    return {
        type: UserActionTypeTypes.TOGGLE_LIKE_PLAYLIST,
        payload: playlist
    };
};

export type LikePlaylistLoadingTypeAction = {
    type: UserActionTypeTypes.LIKE_PLAYLIST_LOADING,
    payload: LikePlaylistLoadingType
}

export const likePlaylistLoading = (likePlaylist: LikePlaylistLoadingType): LikePlaylistLoadingTypeAction => {
    return {
        type: UserActionTypeTypes.LIKE_PLAYLIST_LOADING,
        payload: likePlaylist
    };
};

export type SetUserLikedAlbumsType = {
    type: UserActionTypeTypes.SET_USER_LIKED_ALBUMS,
    payload: Array<AlbumType>
}

export const setUserLikedAlbums = (likedAlbums: Array<AlbumType>): SetUserLikedAlbumsType => {
    return {
        type: UserActionTypeTypes.SET_USER_LIKED_ALBUMS,
        payload: likedAlbums
    };
};

export type ToggleLikeAlbumType = {
    type: UserActionTypeTypes.TOGGLE_LIKE_ALBUM,
    payload: string
}

export const toggleLikeAlbum = (albumId: string): ToggleLikeAlbumType => {
    return {
        type: UserActionTypeTypes.TOGGLE_LIKE_ALBUM,
        payload: albumId
    };
};

export type LikeAlbumLoadingTypeAction = {
    type: UserActionTypeTypes.LIKE_ALBUM_LOADING,
    payload: LikeAlbumLoadingType
}

export const likeAlbumLoading = (likeAlbum: LikeAlbumLoadingType): LikeAlbumLoadingTypeAction => {
    return {
        type: UserActionTypeTypes.LIKE_ALBUM_LOADING,
        payload: likeAlbum
    };
};
