import React, {useState} from "react";
import "./song.scss";
import {SongType} from "../../config/types";
import songDefault from "../../assets/imgs/song_default.jpg";
import Like from "./Like";
import {CaretRightFilled as PlayIcon, PauseOutlined as PauseIcon} from "@ant-design/icons";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {RootState} from "../../redux/Reducers/rootReducer";
import {PlayerReducerState} from "../../redux/Reducers/playerReducer";
import {formattedTime} from "../../utils/time-format.utils";

type PropsType = {
    song: SongType,
    onPlay?: () => void,
    order?: number,
}

export const Song = (props: PropsType) => {
    const { song, order, onPlay } = props;
    const { pause, track } = useTypedSelector<PlayerReducerState>((state: RootState) => state.player);
    const [songCover, setSongCover] = useState(song.cover);
    const { playSong, pauseSong } = useActions();
    let isSelectedSong = false;
    if (song._id) {
        isSelectedSong = track?._id === song._id;
    }
    const isPlayed = !pause && isSelectedSong;

    function onSwitchPlay() {
        onPlay && onPlay();
        if (isPlayed) {
            pauseSong();
        } else {
            playSong();
        }
    }

    const onImageError = () => {
        song.cover = songDefault;
        setSongCover(song.cover);
    };

    return (
        <div className={`song ${isPlayed ? "_played" : ""} ${isSelectedSong ? "_active" : ""}`}>
            <div className="song__main">
                <div className="song__first">
                    {!isPlayed && <h3 className="song__number">{order}</h3>}
                    <div className="song__play"
                         onClick={onSwitchPlay}>
                        {isPlayed
                            ? <PauseIcon/>
                            : <PlayIcon onClick={onSwitchPlay}/>
                        }
                    </div>
                </div>
                <img src={songCover}
                     alt="Song"
                     className="song__img"
                     onError={onImageError}
                />
                <div className="song__name_wrap">
                    <h3 className="song__name">{song.name}</h3>
                    <h3 className="song__artist">{song.artist}</h3>
                </div>
            </div>
            <div className="song__other">
                <div className="song__like">
                    <Like song={song}/>
                </div>
                <h3 className="song__duration">
                    {formattedTime(song.duration)}
                </h3>
            </div>
        </div>
    );
};
