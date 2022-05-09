import React, {useState} from "react";
import {Popover} from "antd";
import {MenuUnfoldOutlined} from "@ant-design/icons";
import {SongType} from "../../../config/types";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/Reducers/rootReducer";

type PropsType = {
    playerList: SongType[],
}

export const PopoverPlayerList = (props: PropsType) => {
    const theme = useSelector((state: RootState) => state.shared.appTheme);
    const textColorStyle = (theme) => {
        return theme === "dark" ? "#fff" : "#191414FF";
    };

    const content = (
        <div style={{
            backgroundColor: theme === "dark" ? "#282828" : "#F1F1F1FF",
            padding: "10px"
        }}>
            {props.playerList?.map((song, index) => {
                return (
                    <div className="song__main"
                         key={index}
                    >
                        <div className="song__first song__number"
                             style={{ color: textColorStyle(theme) }}
                        >
                            {index + 1}.
                        </div>
                        <div className="song__name_wrap">
                            <div className="song__name"
                                 style={{ color: textColorStyle(theme) }}
                            >
                                {song.name}
                            </div>
                            <div className="song__artist"
                                 style={{ color: theme === "dark" ? "#C4C4C4FF" : "#121212FF" }}>
                                {song.artist}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    const [visible, setVisible] = useState(false);

    function hideOrShow() {
        if (props.playerList?.length) {
            setVisible(!visible);
        }
    }

    return (
        <Popover trigger="click"
                 content={content}
                 visible={visible}
                 style={{
                     backgroundColor: theme === "dark" ? "#282828" : "#F1F1F1FF",
                     color: textColorStyle(theme)
                 }}
        >
            <MenuUnfoldOutlined style={{
                                    fontSize: "16px",
                                    color: visible ? "#1db954" : textColorStyle(theme) }}
                                onClick={hideOrShow}/>
        </Popover>
    );
};
