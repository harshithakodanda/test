import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { memo, useMemo } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Routes, Colors } from "configs";
import HomeStack from "./HomeStack";
import MyWorkStack from "./MyWorkStack";
import AccountStack from "./AccountStack";
import EducationStack from "./EducationStack";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { SOURCE_ICON } from "images";
import Theme from "style/Theme";
import HealthFeedStack from "./HealthFeedStack";
import FinancialAssessmentStack from "./FinancialAssessmentStack";
import Container from "components/Layout/Container";
import { useTheme } from "configs/Theme";
import Layout from "components/Layout/Layout";
import { Icon } from "react-native-elements";
import Home from "container/Home";

const Tab = createBottomTabNavigator();
const MainTab = memo(() => {
  return (
    <Container style={{ flex: 1}}>
      <Tab.Navigator  tabBar={(props) => <MyTabBar {...props} />} lazy={true}>
        <Tab.Screen name={Routes.HomeStack} component={HomeStack} />
        <Tab.Screen
          name={Routes.FinancialAssessmentStack}
          component={FinancialAssessmentStack}
        />
        <Tab.Screen name={Routes.HealthFeedStack} component={HealthFeedStack} />
        <Tab.Screen name={Routes.MyWorkStack} component={MyWorkStack} />
        <Tab.Screen name={Routes.FinancialEducation} component={EducationStack} />
        <Tab.Screen name={Routes.AccountStack} component={AccountStack}  />
      </Tab.Navigator>
    </Container>
  );
});

const MyTabBar = ({
  state,
  descriptors,
  navigation,
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return useMemo(() => {
    return (
      <Layout style={styles.container}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
         //   if(route.name == Routes.AccountStack)console.log("pop")
            return navigation.navigate(route.name);
          };

          const getNameIcon = (): string => {
            switch (index) {
              case 0:
                return isFocused ? "home" : "home";
              case 1:
                return isFocused ? "dashboard" : "dashboard";
              case 2:
                return isFocused ? "rupee" : "rupee";
              case 3:
                return isFocused ? "calculator" : "calculator";
              case 4:
                return isFocused ? "play-circle" : "play-circle";
              case 5:
               // return isFocused ? "ellipsis-h" : "ellipsis-h";
               return isFocused ? "user" : "user";
              default:
                return "home";
            }
          };
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={styles.btn}
              key={index}
              activeOpacity={1}
            >
              <View
                style={[styles.borderButton, isFocused && styles.borderActive]}
              >
                 <Icon
                      color="#02b4b8"
                      name={getNameIcon()}
                      type="font-awesome"
                      size={22}
                      style={{ alignSelf: "center" }}
                    />
               
              </View>
            </TouchableOpacity>
          );
        })}
      </Layout>
    );
  }, [state, descriptors, navigation]);
};

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 52 + getBottomSpace(),
    paddingBottom: getBottomSpace(),
  },
  container: {
    flexDirection: "row",
    // backgroundColor: "rgba(247, 247, 247, 0.9)",
  },
  borderButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    ...Theme.center,
  },
  borderActive: {
    backgroundColor: Colors.TealBlue20,
  },
});

export default MainTab;
