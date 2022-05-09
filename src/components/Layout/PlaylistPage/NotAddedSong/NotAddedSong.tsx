import React, {useState} from "react";
import {CaretRightFilled as PlayIcon, PauseOutlined as PauseIcon} from "@ant-design/icons";
import {PlayerReducerState} from "../../../../redux/Reducers/playerReducer";
import {useTypedSelector} from "../../../../hooks/useTypedSelector";
import {RootState} from "../../../../redux/Reducers/rootReducer";
import {useActions} from "../../../../hooks/useActions";
import {SongType} from "../../../../config/types";
import songDefault from "../../../../assets/imgs/song_default.jpg";
import "./NotAddedSong.scss";
import Like from "../../../Song/Like";
import {formattedTime} from "../../../../utils/time-format.utils";

type PropsType = {
    song: SongType,
    onAdd: () => void,
    onPlay?: () => void,
}

export const NotAddedSong = (props: PropsType) => {
    const {song, onAdd, onPlay} = props;
    const {pause, track} = useTypedSelector<PlayerReducerState>((state: RootState) => state.player);
    const [songCover, setSongCover] = useState(song.cover);
    const {playSong, pauseSong} = useActions();
    let isSelectedSong = false;
    if (song._id) {
        isSelectedSong = track?._id === song._id;
    }
    const isPlayed = !pause && isSelectedSong;

    function play() {
        onPlay && onPlay();
        // setPlayingSong(song);
        if (isPlayed) {
            pauseSong();
        } else {
            playSong();
        }
    }

    const onImageError = () => {
        setSongCover(songDefault);
    };

    return (
        <div className={`not_added_song ${isPlayed ? "_played" : ""} ${isSelectedSong ? "_active" : ""}`}>
            <div className="not_added_song__main">
                <div className="not_added_song__first">
                    <img src={songCover || songDefault}
                         alt="Song-img"
                         className="not_added_song__img"
                         onError={onImageError}
                    />
                    <div className="not_added_song__play"
                         onClick={play}>
                        {isPlayed
                            ? <PauseIcon/>
                            : <PlayIcon/>
                        }
                    </div>
                </div>
                <div className="not_added_song__name_wrap">
                    <h3 className="not_added_song__name">{song.name}</h3>
                    <h3 className="not_added_song__artist">{song.artist}</h3>
                </div>

            </div>
            <div className="not_added_song__other">
                <h3 className="not_added_song__duration">
                    {formattedTime(song.duration)}
                </h3>
                <button className="not_added_song__add" onClick={onAdd}>{"Добавить".toUpperCase()}</button>
            </div>
            {/*<div className="not_added_song__add">
                <button className="add__button" onClick={onAdd}>{"Добавить".toUpperCase()}</button>
            </div>*/}
        </div>
    );
};
