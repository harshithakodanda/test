import React, { memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Routes } from "configs";
import Account from "container/Account/Account";
import BasicInformation from "container/UpdateProfile/BasicInformation";
import WorkProfile from "container/UpdateProfile/WorkProfile";
import AboutUs from "container/UserProfileDetails/AboutUs";
import PrivacyPolicy from "container/UserProfileDetails/PrivacyPolicy";
import Help from "container/UserProfileDetails/Help";
import RootStack from "navigations";

const Stack = createStackNavigator();

const AccountStack = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.Account}
        component={Account}
        options={{ headerShown: false ,}}
        
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
        name={Routes.AboutUs}
        component={AboutUs}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name={Routes.Help}
        component={Help}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name={Routes.Privacy}
        component={PrivacyPolicy}
        options={{ headerShown: true }}
      />
      
    </Stack.Navigator>
  );
});

export default AccountStack;
