import React, { memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Routes } from "configs";
import Home from "container/Home";
import VideoPlayer from "components/Video/VideoPlayer";
import HealthFeedStack from "./HealthFeedStack";
import IncomeReport from "container/MyWorkFinanceReport/IncomeReport";
import ServicesManagement from "container/MyWork/ServicesManagement/ServicesManagement";
import MyWorkNetwork from "container/MyWork/MyWorkNetwork";
import HealthTips from "container/MyWorkHealthGuideTips/HealthTips";
import HealthGuide from "container/MyWorkHealthGuideTips/HealthGuide";
import MyWorkTopics from "container/MyWorkTopics/MyWorkTopics";
import FinanceReport from "container/MyWorkFinanceReport/FinanceReport";
import MainTab from "./MainTab";
import RootStack from "navigations";

const Stack = createStackNavigator();

const LogoutMainTab = memo(() => {
  return (
    <Stack.Navigator>

       <Stack.Screen
        name={Routes.MainTab}
        component={MainTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.RootStack}
        component={RootStack}
        options={{ headerShown: false }}
      />


     
     
    </Stack.Navigator>
  );
});

export default LogoutMainTab;
