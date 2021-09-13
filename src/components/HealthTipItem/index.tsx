import React, { memo } from "react";
import { SOURCE_ICON } from "images";

import {
  View,
  StyleSheet,
  ViewStyle,
  Image,
  TouchableOpacity,
} from "react-native";
import Text from "components/Text";
import { Colors } from "configs";
import Theme from "style/Theme";
import Layout from "components/Layout/Layout";

interface HealthTipProps {
  id?: number;
  image?: any;
  title?: string;
  avatar?: any;
  name?: string;
  detail?: string;
  shares?: number;
  thanks?: number;
  style?: ViewStyle;
  onPress?: () => void;
  onPressOption: () => void;
}

export default memo(
  ({
    image,
    title,
    avatar,
    name,
    detail,
    shares,
    thanks,
    onPress,
    onPressOption,
  }: HealthTipProps) => {
    return (
      <Layout style={styles.content}>
        <Text style={styles.tipTitle}>{title}</Text>
        <View style={Theme.flexRow}>
          <Image style={styles.avatar} source={avatar} />
          <Text style={styles.name}>{name}</Text>
          <Text> shared</Text>
        </View>
        <Image style={styles.tipImage} source={image} />
        <Text style={styles.tipDetail}>{detail}</Text>
        <View style={Theme.flexRow}>
          <Text style={styles.tipInteract}>{thanks} thanks</Text>
          <Text style={styles.tipInteract}>{shares} shares</Text>
        </View>
      </Layout>
    );
  }
);

const styles = StyleSheet.create({
  content: {
    marginTop: 16,
    marginHorizontal: 24,
    borderRadius: 16,
  },
  tipTitle: {
    padding: 16,
    fontSize: 17,
    borderBottomWidth: 1,
    borderBottomColor: Colors.WhiteSmoke,
    paddingBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    margin: 12,
  },
  name: {
    color: Colors.DodgerBlue,
    fontSize: 13,
  },
  tipImage: {
    width: "100%",
  },
  tipDetail: {
    marginVertical: 12,
    marginHorizontal: 16,
    fontSize: 13,
    lineHeight: 22,
  },
  tipInteract: {
    marginHorizontal: 16,
    marginVertical: 12,
    fontSize: 13,
    color: Colors.GrayBlue,
  },
});
