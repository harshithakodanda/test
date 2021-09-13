import React, { memo, useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Colors, Routes } from "configs";
import Greeting from "components/Home/Greeting";
import SearchBox from "components/Home/SearchBox";
import MainControl from "components/Home/MainControl";
import ToolsAndVideoList from "components/Home/ToolsAndVideoList";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import IconNotification from "components/Home/IconNotification";
import Logo from "components/Home/Logo";
import Container from "components/Layout/Container";
import { useTheme } from "configs/Theme";
import scale from "utils/scale";
import { useNavigation } from "@react-navigation/native";
import { getData, storeData } from "storage/store";
import axios from "axios";
import { Icon } from "react-native-elements";
import { HeaderBackButton } from "@react-navigation/stack";
import { initializeDropdown } from "storage/dropdown";

interface HomeProps {}

const Home = memo((props: HomeProps) => {

  const { navigate } = useNavigation();
  const onTodayTask = useCallback(() => {
    navigate(Routes.TodayTasks);
  }, [navigate]);

  
  useEffect(() => {
    //initializeDropdown()
  }, []);

  return (
    <Container style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      >
         {/* <Icon
                      color="#02b4b8"
                      name="home"
                      type="font-awesome"
                      size={22}
                      style={{ position:"absolute",}}
                    /> */}
             
        <Logo style={styles.Logo} />
        <Greeting />
      
        <ToolsAndVideoList
          step={5}
          style={styles.todayTask}
          onPress={onTodayTask}
        />
        {/* <MainControl /> */}
      </ScrollView>
    </Container>
  );
});

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: 16,
    paddingHorizontal: 24,
    paddingTop: getStatusBarHeight() + 16,
  },
  todayTask: {
    marginTop: scale(32),
  },
  Logo: {
    position: "absolute",
    top: getStatusBarHeight(),
    right: 24,
    zIndex: 10,
  },
  notification: {
    position: "absolute",
    top: getStatusBarHeight() + 16,
    right: 100,
    zIndex: 10,
  },
});
function key(key: any, arg1: (index: any) => void) {
  throw new Error("Function not implemented.");
}

