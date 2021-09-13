import React, { memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Routes } from "configs";
import FinancialEducation from "container/FinancialEducation";
import VideoPlayer from "components/Video/VideoPlayer";

const Stack = createStackNavigator();

const EducationStack = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.FinancialEducation}
        component={FinancialEducation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.VideoPlayer}
        component={VideoPlayer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
});

export default EducationStack;
