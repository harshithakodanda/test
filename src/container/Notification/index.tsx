import React, { memo, useLayoutEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import Text from "components/Text";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "configs";
import Theme from "style/Theme";
import ButtonIconHeader from "components/ButtonIconHeader";
import NotificationItem, {
  NotificationEnum,
} from "components/Notification/NotificationItem";
import keyExtractor from "utils/keyExtractor";
import Container from "components/Layout/Container";
import Layout from "components/Layout/Layout";
import { useTheme } from "configs/Theme";

interface NotificationProps {}

const notificationFakeData = [
  {
    id: 0,
    type: NotificationEnum.SCHEDULE,
    content: "You have appointment with Financial Advisor at 08:00 PM today.",
    createdTime: "Just now",
    notRead: true,
  },
  {
    id: 1,
    type: NotificationEnum.ACCOUNT,
    content:
      "Please update your profile to help us understand your needs better.",
    notRead: true,
  },
];

const Notification = memo((props: NotificationProps) => {
  const { setOptions, goBack } = useNavigation();
  const onEye = useCallback(() => {}, []);
  const onSetting = useCallback(() => {}, []);
  const { theme } = useTheme();
  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerStyle: {
        shadowColor: "transparent",
        backgroundColor: theme.backgroundHeader,
      },
      headerLeft: () => <ButtonIconHeader marginLeft={24} />,
      headerRight: () => (
        <View style={Theme.flexRow}>
          
         
        </View>
      ),
    });
  }, [setOptions]);

  const renderItem = useCallback(
    ({ item }) => <NotificationItem {...item} />,
    []
  );

  return (
    <Layout style={styles.container}>
      <Text size={24} lineHeight={28} bold marginLeft={24} marginBottom={22}>
        Notifications
      </Text>
      
      <FlatList
        data={notificationFakeData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </Layout>
  );
});

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
  },
});
