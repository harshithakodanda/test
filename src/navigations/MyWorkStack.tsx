import React, { memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Routes } from "configs";
import MyWork from "container/MyWorkFinanceReport/MyWork";
import FinanceReport from "container/MyWorkFinanceReport/FinanceReport";
import MyWorkTopics from "container/MyWorkTopics/MyWorkTopics";
import HealthGuide from "container/MyWorkHealthGuideTips/HealthGuide";
import HealthTips from "container/MyWorkHealthGuideTips/HealthTips";
import MyWorkNetwork from "container/MyWork/MyWorkNetwork";
import ServicesManagement from "container/MyWork/ServicesManagement/ServicesManagement";

const Stack = createStackNavigator();

const MyWorkStack = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.MyWork}
        component={MyWork}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.FinanceReport}
        component={FinanceReport}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name={ Routes.HealthGuide}
        component={HealthGuide}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name={Routes.HealthTips}
        component={HealthTips}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name={Routes.MyWorkNetwork}
        component={MyWorkNetwork}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name={Routes.ServicesManagement}
        component={ServicesManagement}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name={Routes.MyWorkTopics}
        component={MyWorkTopics}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
});

export default MyWorkStack;
