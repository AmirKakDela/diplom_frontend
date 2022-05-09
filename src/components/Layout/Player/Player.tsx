import {
    LoadingOutlined,
    PauseCircleOutlined,
    PlayCircleOutlined,
    SoundOutlined,
    StepBackwardOutlined,
    StepForwardOutlined
} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {RootState} from "../../../redux/Reducers/rootReducer";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useActions} from "../../../hooks/useActions";
import SongProgress from "./SongProgress";
import {formattedTime} from "../../../utils/time-format.utils";
import Like from "../../Song/Like";
import {PopoverPlayerList} from "./PopoverPlayerList";
import songDefault from "../../../assets/imgs/song_default.jpg";
import "./Player.scss";

let audio: HTMLAudioElement = new Audio();

export function Player() {
    const { track, volume, pause, duration, playerList } = useTypedSelector((state: RootState) => state.player);
    const { playSong, setDurationSong, setVolumeSong, pauseSong, setPlayingSong } = useActions();
    const [playerTime, setPlayerTime] = useState(0);
    let [songCover, setSongCover] = useState(track?.cover);
    const isReady = audio.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA
        || audio.readyState === HTMLMediaElement.HAVE_FUTURE_DATA;

    useEffect(() => {
        if (pause) {
            audio.pause();
        } else if (isReady && !pause) {
            audio.play();
        }
    }, [pause, isReady]);

    useEffect(() => {
        // setSongCover(track.cover)
        setSongParams();
    }, [track]);

    function onImageError() {
        setSongCover(songDefault);
    }

    function setSongParams() {
        if (track) {
            audio.src = track?.song;
            audio.autoplay = false;
            audio.volume = volume / 100;
            audio.onloadedmetadata = () => {
                setDurationSong(audio.duration);
            };
            audio.oncanplay = () => {
                if (!pause) {
                    audio.play();
                } else {
                    audio.pause();
                }
            };
            audio.ontimeupdate = () => {
                setPlayerTime(audio.currentTime);
                if(audio.ended){
                    setPlayerTime(0);
                }
            };
            audio.onended = () => {
                if (playerList?.length) {
                    onNextClick();
                } else {
                    pauseSong();
                    setSongParams();
                }
            };
        }
    }

    function onPrevClick() {
        if (track && playerList?.length) {
            const index = playerList.findIndex(it => it._id === track._id);
            if (index >= 0) {
                setPlayingSong(playerList[(playerList.length + index - 1) % playerList.length]);
            }
        } else {
            setSongParams();
        }
    }

    function onNextClick() {
        if (track && playerList?.length) {
            const index = playerList.findIndex(it => it._id === track._id);
            if (index >= 0) {
                setPlayingSong(playerList[(index + 1) % playerList.length]);
            }
        }
    }

    function onSwitchPlay() {
        if (pause) {
            playSong();
        } else {
            pauseSong();
        }
    }

    function changeVolume(value: number) {
        audio.volume = value / 100;
        setVolumeSong(value);
    }

    function changeCurrentTime(value: number) {
        audio.currentTime = value;
        setPlayerTime(value);
    }

    return (
        <div className="player">
            {track
                ? <div className="player__now-playing">
                    <div className="player__now-playing__cover">
                        <img src={songCover || track?.cover}
                             alt="Song"
                             className="song__img"
                             aria-hidden="false"
                             draggable="false"
                             onError={onImageError}
                        />
                    </div>
                    <div className="player__now-playing__info">
                        <div className="player__now-playing__track-name">{track.name}</div>
                        <div className="player__now-playing__track-artist">{track.artist}</div>
                    </div>
                    <div className="player__now-playing__song-like">
                        <Like song={track}/>
                    </div>
                </div>
                : <div className="player__now-playing"/>
            }

            <div className="player__controls">
                <div className="player__controls__icons">
                    <StepBackwardOutlined
                        style={{ fontSize: "16px" }}
                        onClick={onPrevClick}
                    />
                    <div onClick={onSwitchPlay} className="player__controls__playpause">
                        {!pause  && !audio.ended
                            ? isReady
                                ? <PauseCircleOutlined style={{ fontSize: "32px" }}/>
                                : <LoadingOutlined style={{ fontSize: "32px" }} spin/>
                            : <PlayCircleOutlined style={{ fontSize: "32px" }}/>
                        }
                    </div>
                    <StepForwardOutlined
                        style={{ fontSize: "16px" }}
                        onClick={onNextClick}
                    />
                </div>
                <div className="player__controls__timeline">
                    <SongProgress
                        begin={playerTime}
                        end={duration}
                        current={formattedTime(playerTime)}
                        finish={formattedTime(duration)}
                        onChange={changeCurrentTime}
                    />
                </div>
            </div>
            <div className="player__control-button-bar">
                <PopoverPlayerList playerList={playerList}/>
                <SoundOutlined style={{ fontSize: "16px" }}/>
                <div className="player__control-button-bar__volume">
                    <SongProgress
                        begin={volume}
                        end={100}
                        onChange={changeVolume}
                    />
                </div>
            </div>
        </div>
    );
}
