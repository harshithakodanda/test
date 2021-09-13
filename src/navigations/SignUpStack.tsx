
import React, { memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Routes } from "configs";
import Home from "container/Home";
import VideoPlayer from "components/Video/VideoPlayer";
import HealthFeedStack from "./HealthFeedStack";
import IncomeReport from "container/MyWorkFinanceReport/IncomeReport";
import BasicInformation from "container/UpdateProfile/BasicInformation";
import SignUpSuccessful from "container/LoginAndSignUp/SignUpSuccessful";
import WorkProfile from "container/UpdateProfile/WorkProfile";
import MainTab from "./MainTab";
import SentVerifySuccessful from "container/UpdateProfile/SentVerifySuccessful";
import FinancialAssessmentStack from "./FinancialAssessmentStack";
import LogoutMainTab from "./LogoutMainTab";

const Stack = createStackNavigator();

const SignUpStack = memo(() => {
  return (
    <Stack.Navigator initialRouteName={Routes.SignUpSuccessful}>
      <Stack.Screen
        name={Routes.Home}
        component={Home}
        options={{ headerShown: false }}
      />
    
<Stack.Screen
name={Routes.SignUpSuccessful}
component={SignUpSuccessful}
options={{ headerShown: false }}
/>
<Stack.Screen
name={Routes.SentVerifySuccessful}
component={SentVerifySuccessful}
options={{ headerShown: false }}
/>
<Stack.Screen
name={Routes.BasicInformation}
component={BasicInformation}
options={{ headerShown: false }}
/>
<Stack.Screen
name={Routes.WorkProfile}
component={WorkProfile}
options={{ headerShown: false }}
/>
<Stack.Screen
name={Routes.MainTab}
component={LogoutMainTab}
options={{ headerShown: false }}
/>
<Stack.Screen
name={Routes.FinancialAssessmentStack}
component={FinancialAssessmentStack}
options={{ headerShown: false }}
/>

     
     
    </Stack.Navigator>
  );
});

export default SignUpStack;
