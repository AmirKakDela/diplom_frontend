import React from "react";
import {Outlet} from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import {Player} from "./Player/Player";
import "./Layout.scss";
import {items} from "./Sidebar/items";
import cx from "classnames";
import {darkTheme, lightTheme} from "./theme-context/constants";
import {ThemeContext} from "./theme-context/constants";
import {MenuTheme} from "antd";

const Layout = (props: any) => {

    const layout = (theme: MenuTheme | undefined) => {
        const themeClassName = cx({
            "_dark": theme === darkTheme,
            "_light": theme === lightTheme
        });
        return (
            <div className={`layout ${themeClassName}`}>
                <Sidebar items={items} currentTheme={theme} />
                <Header currentTheme={theme} changeTheme={props.changeTheme}/>
                <div className={`main-content`}>
                    <Outlet/>
                </div>
                <Player/>
            </div>
        );
    };
    return <ThemeContext.Consumer>{(theme: MenuTheme | undefined) => layout(theme)}</ThemeContext.Consumer>;
};

export default Layout;
