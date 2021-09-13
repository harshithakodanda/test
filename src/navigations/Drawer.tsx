import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { memo } from "react";
import DrawerItems from "./DrawerItems";
import MainTab from "./MainTab";
import AccountStack from "./AccountStack";
import { Icon } from "react-native-elements";
import HomeStack from "./HomeStack";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={MainTab}
        options={{
          drawerLabel: "Home",
          drawerIcon: () => (
            <Icon
              color="#02b4b8"
              name="home"
              type="font-awesome"
              size={22}
              style={{ alignSelf: "center" }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Account"
        component={AccountStack}
        options={{
          drawerLabel: "Account",
          drawerIcon: () => (
            <Icon
              color="#02b4b8"
              name="user"
              type="font-awesome"
              size={22}
              style={{ alignSelf: "center" }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
