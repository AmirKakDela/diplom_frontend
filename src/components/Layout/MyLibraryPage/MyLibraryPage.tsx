import React from 'react';
import './myLibraryPage.scss'
import {NavLink, Outlet} from "react-router-dom";

const CN = (isActive: any) => ('library__link ' + (isActive.isActive ? ' library__link_active' : ''))

const MyLibraryPage = () => {
    return (
        <>
            <div className="library__sections">
                <NavLink to='songs'
                         className={CN}>Треки</NavLink>
                <NavLink to='playlists'
                         className={CN}>Плейлисты</NavLink>
                <NavLink to='albums'
                         className={CN}>Альбомы</NavLink>
            </div>
            <div className='library__main'>
                <Outlet/>
            </div>
        </>
    );
};

export default MyLibraryPage;