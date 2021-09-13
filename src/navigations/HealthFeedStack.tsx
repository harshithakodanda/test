import React, { memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Routes } from "configs";
import HealthFeed from "container/HealthFeed/HealthFeed";
import IncomeReport from "container/MyWorkFinanceReport/IncomeReport";

const Stack = createStackNavigator();

const HealthFeedStack = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Routes.HealthFeedStack} component={HealthFeed} options={{ headerShown: false }} />
    
     <Stack.Screen name={Routes.DaybookReport} component={IncomeReport} options={{ headerShown: true }}/>
   </Stack.Navigator>
  );
});

export default HealthFeedStack;
