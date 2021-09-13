import React, { memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Routes } from "configs";
import FinancialAssessmentQuestionnaire from "container/FinancialAssessment/FinancialAssessmentQuestionnaire";
import FinancialAssessmentReport from "container/FinancialAssessment/FinancialAssessmentReport";

const Stack = createStackNavigator();

const FinancialAssessmentStack = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.FinancialAssessmentReport}
        component={FinancialAssessmentReport}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.FinancialAssessmentQuestionnaire}
        component={FinancialAssessmentQuestionnaire}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
});

export default FinancialAssessmentStack;
