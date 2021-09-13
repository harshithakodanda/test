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

const Stack = createStackNavigator();

const HomeStack = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.Home}
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.VideoPlayer}
        component={VideoPlayer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.HealthFeedStack}
        component={HealthFeedStack}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name={Routes.FinanceReport}
        component={FinanceReport}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name={Routes.MyWorkTopics}
        component={MyWorkTopics}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name={Routes.HealthGuide}
        component={HealthGuide}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name={Routes.HealthTips}
        component={HealthTips}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name={Routes.MyWorkNetwork}
        component={MyWorkNetwork}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.ServicesManagement}
        component={ServicesManagement}
        options={{ headerShown: false }}
      />


     
     
    </Stack.Navigator>
  );
});

export default HomeStack;
