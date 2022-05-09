import React from 'react';
import './genre.scss'
import {Link} from "react-router-dom";
import {GenreType} from "../../config/types";

type PropsType = {
    genre: GenreType
}

const Genre: React.FC<PropsType> = (props) => {
    const {genre} = props;
    return (
        <Link to={`/genre/${genre._id}`}>
            <div className="genre" style={{backgroundColor: genre.color}}>
                <span>{genre.name}</span>
            </div>
        </Link>
    );
};

export default Genre;
