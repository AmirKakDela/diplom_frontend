import React from 'react';
import './appLoading.scss'
import {BarLoader} from "react-spinners";

const AppLoading = () => {
    return (
        <div className="app-loading">
            <h1 className="app-loading__title">Spotify</h1>
            <BarLoader css={'background-color: #8a8585'}/>
        </div>
    );
};

export default AppLoading;