import React from 'react';
import './artictCard.scss';
import {ArtistType} from "../../config/types";
import {Link} from "react-router-dom";
import artistDefault from "../../assets/imgs/avatar.svg";

type PropsType = {
    artist: ArtistType
}

const ArtistCard: React.FC<PropsType> = (props) => {
    return (
        <Link to={`/artist/${props.artist._id}`}>
            <div className="artist">
                <img
                    src={props.artist.image || artistDefault}
                    alt="" className="artist__img"/>
                <h1 className="artist__name">{props.artist.name}</h1>
                <h4 className="artist__role">исполнитель</h4>
            </div>
        </Link>
    );
};

export default ArtistCard;
