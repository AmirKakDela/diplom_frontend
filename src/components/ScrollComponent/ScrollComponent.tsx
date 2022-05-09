import React from "react";
import "./ScrollComponent.scss";

export function ScrollComponent(props: any) {
    return (
        <div className="collections" >
            <div className="collections__title">
                <h2 className="collections__title__name">{props.titleName}</h2>
            </div>
            <div className="collections__playlists">
                {props.data}
            </div>
        </div>
    );
}
