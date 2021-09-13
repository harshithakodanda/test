import "react-native-gesture-handler";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import ModalDisconnect from "components/ModalDisconnect";
import { StatusBar, View } from "react-native";
import Theme from "style/Theme";
import { store } from "redux/reducer";
import { useFonts } from "expo-font";
import RootStack from "navigations";
import { TMode, themes, ThemeContext } from "configs/Theme";
import HomeStack from "navigations/HomeStack";
import EducationStack from "navigations/EducationStack";
import PrivateChatStack from "navigations/FinancialAssessmentStack";
import { getData } from "storage/store";
import MainTab from "navigations/MainTab";
import SignUpStack from "navigations/SignUpStack";
import LogoutMainTab from "navigations/LogoutMainTab";
import DrawerNavigation from "navigations/Drawer";

export default function App() {
  const [mode, setMode] = useState<TMode>("dark");
  const [registered,setRegistered] = useState(false)
  const [loading,setLoading] = useState(true)
  const [verified,setVerified] = useState(false)

  const toggleTheme = useCallback(() => {
    setMode((prevMode: string) => (prevMode === "light" ? "dark" : "light"));
  }, []);

  const theme = useMemo(() => (mode === "light" ? themes.dark : themes.light), [
    mode,
  ]);
  const [loaded] = useFonts({
    "Mulish-Bold": require("./assets/fonts/Mulish-Bold.ttf"),
    "Mulish-Medium": require("./assets/fonts/Mulish-Medium.ttf"),
    "Mulish-Regular": require("./assets/fonts/Mulish-Regular.ttf"),
    "Mulish-SemiBold": require("./assets/fonts/Mulish-SemiBold.ttf"),
    "Oswald-Bold": require("./assets/fonts/Oswald-Bold.ttf"),
    "Oswald-Medium": require("./assets/fonts/Oswald-Medium.ttf"),
    "Oswald-Regular": require("./assets/fonts/Oswald-Regular.ttf"),
    "Oswald-SemiBold": require("./assets/fonts/Oswald-SemiBold.ttf"),
  });
  
  useEffect(()=>{
    getData("registered").then(res=>res?setRegistered(true):setRegistered(false))
    getData("verified").then(res=>res?setVerified(true):setVerified(false))

  },[])

  if (!loaded) {
    return null;
  }

  const isDisconnect = false;

  return (
    <View style={[Theme.flexOne, { backgroundColor: theme.background }]}>
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <StatusBar
            barStyle={mode === "light" ? "light-content" : "dark-content"}
          />
          <NavigationContainer>
            {!verified && !registered && <RootStack />}
            {verified && !registered && <SignUpStack/> }
           
            {registered && <LogoutMainTab/>}
{/* <DrawerNavigation/> */}
          </NavigationContainer>
          {isDisconnect && <ModalDisconnect />}
        </ThemeContext.Provider>
      </Provider>
    </View>
  );
}
