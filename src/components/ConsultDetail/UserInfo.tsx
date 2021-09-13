import React, { memo } from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageSourcePropType,
  ViewStyle,
} from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import Layout from "components/Layout/Layout";
import Container from "components/Layout/Container";
import LayoutItem from "components/Layout/LayoutItem";
import { useTheme } from "configs/Theme";

interface UserInfoProps {
  user: {
    name: string;
    gender: string;
    age: number;
    phone: string;
    img: ImageSourcePropType;
  };
  style?: ViewStyle;
  dark?: boolean;
}

const UserInfo = memo((props: UserInfoProps) => {
  const { theme } = useTheme();
  return (
    <Layout
      style={[
        styles.container,
        props.style,
        {
          borderColor: theme.lineColor,
          backgroundColor: props.dark ? theme.userInfo : theme.backgroundItem,
        },
      ]}
    >
      <Image
        source={props.user.img}
        style={{ width: 64, height: 64, marginRight: 24 }}
      />
      <View>
        <Text size={15} lineHeight={18} bold marginBottom={8}>
          {props.user.name}
        </Text>
        <View style={{ ...Theme.flexRow, marginBottom: 8 }}>
          <Text size={13} lineHeight={16} semiBold marginRight={18}>
            {props.user.gender}
          </Text>
          <Text size={13} lineHeight={16}>
            {props.user.age} years old
          </Text>
        </View>
        <View style={{ ...Theme.flexRow }}>
          <Image source={require("images/ic_call.png")} style={Theme.icons16} />
          <Text size={13} lineHeight={16} marginLeft={8}>
            {props.user.phone}
          </Text>
        </View>
      </View>
    </Layout>
  );
});

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    borderRadius: 16,
    ...Theme.shadow,
    ...Theme.flexRow,
  },
});
