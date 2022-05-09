import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/Reducers/rootReducer";
import {logoutCurrentUser} from "../../../redux/Actions/userActions";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Dropdown, Menu, MenuTheme, Switch} from "antd";
import {CaretDownFilled, LeftOutlined, RightOutlined, UserOutlined} from "@ant-design/icons";
import {ThemeContext} from "../theme-context/constants";
import "./Header.scss";

const Header = (props: any) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isAuth = useSelector((state: RootState) => state.user.isAuth);
    const user = useSelector((state: RootState) => state.user.currentUser);
    const textColorStyle = (theme: MenuTheme | undefined) => {
        return theme === "dark" ? "#fff" : "#191414FF";
    };

    const logout = () => {
        dispatch(logoutCurrentUser());
    };


    const nav = (
        <nav className="header__navigation">
            <button className="navigation__button" onClick={() => navigate(-1)}>
                <LeftOutlined/>
            </button>
            <button className="navigation__button" onClick={() => navigate(1)}>
                <RightOutlined/>
            </button>
        </nav>
    );

    const dropdown = (theme: MenuTheme | undefined) => {
        return (
            <div className="dropdown">
                <Menu className="dropdown__menu"
                      style={{ backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF"
                }}>
                    {!location.pathname.includes("/admin")
                        ? <Menu.Item
                            className="dropdown__item"
                            key="0"
                            style={{ background: "inherit" }}
                        >
                            <Switch className="switch"
                                    checked={props.currentTheme === "dark"}
                                    onChange={props.changeTheme}
                                    checkedChildren="Dark"
                                    unCheckedChildren="Light"
                            />
                        </Menu.Item>
                        : ""}
                    <Menu.Item
                        className="dropdown__item"
                        key="1"
                        style={{ background: "inherit" }}
                    >
                        <Link to="/" style={{ color: textColorStyle(theme) }}>
                            Профиль
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                        className="dropdown__item"
                        key="2"
                        style={{ background: "inherit", color: textColorStyle(theme) }}
                        onClick={logout}
                    >
                        Выйти
                    </Menu.Item>
                    {user.isAdmin &&
                        (!location.pathname.includes("/admin") ?
                            <Menu.Item
                                className="dropdown__item"
                                key="3"
                                style={{ background: "inherit", color: textColorStyle(theme) }}
                            >
                                <Link to="/admin" style={{ color: textColorStyle(theme), fontWeight: 700 }}>
                                    ADMIN PAGE
                                </Link>
                            </Menu.Item> :
                            <Menu.Item
                                className="dropdown__item"
                                key="4"
                                style={{ background: "inherit", color: textColorStyle(theme) }}
                            >
                                <Link to="/" style={{ color: textColorStyle(theme), fontWeight: 700 }}>
                                    DEFAULT PAGE
                                </Link>
                            </Menu.Item>)
                    }
                </Menu>
            </div>
        );
    };

    return (
        <div className="header">
            {location.pathname === "/welcome" ? (
                <div className="header__logo">Crackerfy</div>
            ) : (
                nav
            )}

            {isAuth ? (
                <div>
                    <Dropdown
                        overlay={
                        <ThemeContext.Consumer>
                            {(theme: MenuTheme | undefined) => dropdown(theme)}
                        </ThemeContext.Consumer>}
                        trigger={["click"]}>
                        <button className="header__user">
                            <UserOutlined className="header__user_icon"/>
                            {user.userName || "user"}
                            <CaretDownFilled/>
                        </button>
                    </Dropdown>
                </div>
            ) : (
                <div className="header__auth">
                    <button className="auth__button-registry auth__button">
                        <Link to="/auth/signup" style={{ color: "#fff" }}>
                            ЗАРЕГИСТРИРОВАТЬСЯ
                        </Link>
                    </button>
                    <button className="auth__button-login auth__button">
                        <Link to="/auth" style={{ color: "#000" }}>
                            ВОЙТИ
                        </Link>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
