import {AppTheme} from "../../../config/types";
import React from "react";

export const lightTheme = AppTheme.LIGHT;
export const darkTheme = AppTheme.DARK;
export const defaultTheme = darkTheme;
export const themes = [lightTheme, darkTheme];

export const ThemeContext = React.createContext(
    defaultTheme
);
