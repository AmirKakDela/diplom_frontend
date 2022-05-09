import {AlbumType} from "../../config/types";

export enum AlbumActionsType {
    SET_ALBUM = 'SET_ALBUM',
    SET_ALBUMS = 'SET_ALBUMS',
    DELETE_ALBUM = 'DELETE_ALBUM',
}

export type AlbumAction = {
    type: AlbumActionsType,
    payload: AlbumType[] | AlbumType | string | null | Promise<any>,
}
