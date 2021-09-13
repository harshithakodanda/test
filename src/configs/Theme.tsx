import Colors from "./Colors";
import React, { useContext } from "react";
import { ColorValue } from "react-native";

export type TMode = "dark" | "light";

export interface ITheme {
  placeholder: string | ColorValue | undefined;
  background: ColorValue | string;
  backgroundItem: ColorValue | string;
  text: ColorValue | string;
  activeBackgroundColor: ColorValue | string;
  inactiveBackgroundColor: ColorValue | string;
  activeTincolor: ColorValue | string;
  backgroundHeader: ColorValue | string;
  textCalender: ColorValue | string;
  lineColor: ColorValue | string;
  innearColor: ColorValue | string;
  modalColor: ColorValue | string;
  userInfo: ColorValue | string;
  searchBox: ColorValue | string;
}
export interface IThemeContext {
  theme: ITheme;
  toggleTheme: () => void;
}

export const themes = {
  dark: {
    background: Colors.DarkLicorice,
    backgroundItem: Colors.DarkJungleGreen,
    text: Colors.White,
    placeholder: Colors.WhiteOpacity,
    activeBackgroundColor: Colors.TealBlue,
    activeTincolor: Colors.WhiteSmoke,
    inactiveBackgroundColor: Colors.Platinum,
    backgroundHeader: Colors.Dark,
    textCalender: Colors.White,
    lineColor: Colors.RaisinBlack,
    innearColor: Colors.InnearColor,
    userInfo: Colors.RaisinBlack,
    modalColor: Colors.Dark,
    searchBox: Colors.RaisinBlack,
  },
  light: {
    background: Colors.Snow,
    backgroundItem: Colors.White,
    text: Colors.DarkJungleGreen,
    placeholder: Colors.Isabelline,
    activeTincolor: Colors.RaisinBlack,
    inactiveBackgroundColor: Colors.DarkJungleGreen,
    activeBackgroundColor: Colors.TealBlue,
    backgroundHeader: Colors.White,
    textCalender: Colors.RaisinBlack,
    lineColor: Colors.Snow,
    innearColor: Colors.Platinum,
    userInfo: Colors.WhiteSmoke,
    searchBox: Colors.Isabelline,
    modalColor: Colors.White,
  },
};

export const ThemeContext = React.createContext({
  theme: themes.light,
  toggleTheme: () => {},
});

export const useTheme = (): IThemeContext => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return {
    theme,
    toggleTheme,
  };
};
