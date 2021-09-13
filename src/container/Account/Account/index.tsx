import React, { memo, useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, NativeModules} from "react-native";
import Text from "components/Text";
import { Colors, Routes } from "configs";
import Theme from "style/Theme";
import { SOURCE_ICON } from "images";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AccountItem from "components/AccountItem/Index";
import { useTheme } from "configs/Theme";
import Container from "components/Layout/Container";
import Layout from "components/Layout/Layout";
import { Icon } from "react-native-elements";
import { clearAll, getData } from "storage/store";

import { dateFormat, dateTimeFormat, db, queries } from "storage/sqlite";




const Account = memo(() => {
  const { navigate } = useNavigation();
  const [account, setAccount] = useState<any>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();
  const [name, setName] = useState("");
  const [businessname, setBusinessname] = useState("");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toggleTheme();
  };

  useFocusEffect(
    useCallback(() => {
     
    }, [])
  );

  const onProfileClick = () => {
    navigate(Routes.BasicInformation);
  };

  const onOrganizationClick = () => {
    navigate(Routes.WorkProfile);
  };

  const onAboutUs =() =>{
    // navigate(Routes.BankDepositAddNew);
    navigate(Routes.AboutUs)
  }

  const onHelp =()=>{
    navigate(Routes.Help)
  }
  const onPrivacy =()=>{
    navigate(Routes.Privacy)
  }

  const logout = ()=>{
    clearAll();
    db.transaction((tx) => {
        tx.executeSql(queries.drop,undefined,(_, res) => console.log(res)) //drop table
    })
  //  NativeModules.DevSettings.reload();

    navigate(Routes.RootStack)
  }
  useEffect(() =>{
    getData("userProfileData").then(user=>setName(user.firstName));
    getData("userOrganizationProfileData").then((org) =>setBusinessname(org.businessName));
  }, [logout])
  
  return (
    <Container style={styles.container}>
      <Text
        marginTop={getStatusBarHeight()}
        marginHorizontal={24}
        bold
        size={24}
        lineHeight={28}>
        User Profile Details
      </Text>
   
      <View style={{marginLeft:30, marginTop:24}}>
          <View style={Theme.flexRow}>
              <Icon
              color={Colors.ForestGreen}
              name="user"
              type="font-awesome"
              size={30}
              style={{ alignSelf: "center", marginRight:10 }}
            />
            <View>
            <Text size={20} marginLeft={16}>
            {name}
            </Text>
            <Text size={15} marginLeft={16}>
            {businessname}
            </Text>
            </View>
          </View>
        
      </View>
      <ScrollView>
    
      <Layout style={styles.content}>
        <AccountItem
          onPress={onProfileClick}
          style={styles.firstView}
          icon={SOURCE_ICON.payment}
          name="Profile"
          lineBottom
        />
        <AccountItem
          onPress={onOrganizationClick}
          style={styles.firstView}
          icon={SOURCE_ICON.payment}
          name="Organization"
          lineBottom
        />
        {/* <AccountItem
          style={styles.middleView}
          icon={SOURCE_ICON.setting}
          name="Setting"
          lineBottom
        /> */}
        <AccountItem
          style={styles.lastView}
          icon={SOURCE_ICON.themeMode}
          name="Dark Mode"
          isToggle={true}
          switchValue={darkMode}
          onPress={toggleDarkMode}
          onValueChange={toggleDarkMode}
        />
        <AccountItem
          style={styles.lastView}
          icon={SOURCE_ICON.close}
          name="Logout"
          onPress={logout}
        />
      </Layout>
      <Layout style={styles.content}>
        <AccountItem
        onPress={onAboutUs}
          style={styles.firstView}
          icon={SOURCE_ICON.home}
          name="About My Finance Wellness"
          lineBottom
        />
        <AccountItem
        onPress={onHelp}
          style={styles.middleView}
          icon={SOURCE_ICON.help}
          lineBottom
          name="Help & Support"
        />
        <AccountItem
        onPress={onPrivacy}
          style={styles.middleView}
          lineBottom
          icon={SOURCE_ICON.term}
          name="Privacy and Policy"
        />
        
      </Layout>
      </ScrollView>
    </Container>
  );
});

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoView: {
    ...Theme.flexRowSpace,
    marginHorizontal: 24,
    marginBottom: 32,
  },
  avatar: {
    width: 64,
    height: 64,
    marginRight: 16,
  },
  icon: {
    tintColor: Colors.White,
    alignSelf: "center",
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    fontSize: 13,
    marginBottom: 8,
  },
  type: {
    fontSize: 13,
    color: Colors.GrayBlue,
  },
  content: {
    marginHorizontal: 24,
    marginVertical: 24,
    borderRadius: 16,
    
  },
  firstView: {
    ...Theme.flexRowSpace,

    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  middleView: {
    ...Theme.flexRowSpace,

    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  lastView: {
    ...Theme.flexRowSpace,
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingRight: 16,
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
  },
  lastItem: {
    ...Theme.flexRowSpace,
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingRight: 16,
    borderBottomEndRadius: 16,
    marginBottom: getBottomSpace(),
    borderBottomStartRadius: 16,
    paddingBottom: 40,
  },
  button: {
    width: 90,
    height: 30,
    borderRadius: 8,
    backgroundColor: Colors.DodgerBlue,
  },
  text: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 200,
    lineHeight: 25,
  },
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 100,
    ...Theme.shadow,
  },
  imageInvite: {
    marginRight: 18,
  }, contentIcon: {
    width: 40,
    height: 40,
    backgroundColor: Colors.DodgerBlue,
    borderRadius: 8,
    justifyContent: "center",
  }, 
});
