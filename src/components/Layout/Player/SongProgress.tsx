import React from "react";
import {MenuTheme, Slider} from "antd";
import {ThemeContext} from "../theme-context/constants";

type SongProgressProps = {
    begin: number,
    end: number,
    onChange: (e: any) => void,
    current?: string,
    finish?: string
}

const SongProgress = ({ begin, end, onChange, current, finish }: SongProgressProps) => {
    return (
        <ThemeContext.Consumer>{(theme: MenuTheme | undefined) => (
            <div className="song-progress">
                <div>{current}</div>
                <Slider className="song-progress__slider"
                        trackStyle={{
                            color: theme === "dark" ? "#b3b3b3" : `#707070`,
                            backgroundColor: theme === "dark" ? "#535353" : `rgba(25, 20, 20, 1)`,
                            flex: "1"
                        }}
                        handleStyle={{ display: "none" }}
                        min={0}
                        value={begin}
                        max={end}
                        tooltipVisible={false}
                        onChange={onChange}/>
                <div>{finish}</div>
            </div>
        )}
        </ThemeContext.Consumer>
    );
};

export default SongProgress;
