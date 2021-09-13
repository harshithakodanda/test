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
import { useTheme } from "configs/Theme";
import Line from "components/Layout/Line";

interface HealthGuideProps {
  id?: number;
  image?: any;
  title?: string;
  avatar?: any;
  name?: string;
  action?: string;
  quantity?: string;
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
    action,
    quantity,
    onPress,
    onPressOption,
  }: HealthGuideProps) => {
    const { theme } = useTheme();
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.54}
        style={[
          styles.container,
          Theme.shadow,
          { backgroundColor: theme.backgroundItem },
        ]}
      >
        <View style={styles.titleView}>
          <Text style={styles.title} bold size={20} lineHeight={25}>
            {title}
          </Text>
        </View>
        <Line />
        <View style={styles.setRow}>
          <View style={Theme.flexRow}>
            <Image style={styles.avatar} source={avatar} />
            <Text bold size={15} lineHeight={18} color={Colors.DodgerBlue}>
              {name}
              <Text marginLeft={4} regular size={11} lineHeight={18}>
                {action}
              </Text>
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.54} onPress={onPressOption}>
            <Image style={styles.icon} source={SOURCE_ICON.greyOption} />
          </TouchableOpacity>
        </View>
        <Line />
        <Image style={styles.image} source={image} />
        <Text marginHorizontal={16} marginTop={12} size={13} lineHeight={22}>
          {quantity}
        </Text>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: Colors.boxShadow,
    shadowOpacity: 1,
    overflow: "hidden",
    marginBottom: 16,
    paddingBottom: 16,
  },
  image: {
    width: "100%",
    height: 176,
  },
  title: {
    position: "absolute",
    bottom: 12,
    left: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    marginRight: 16,
  },
  setRow: {
    paddingHorizontal: 16,
    paddingVertical: 16,

    ...Theme.flexRowSpace,
    flex: 1,
  },
  titleView: {
    paddingTop: 35,
    paddingVertical: 20,

    ...Theme.flexRow,
  },
  icon: {
    tintColor: Colors.GrayBlue,
    width: 24,
    height: 24,
  },
});
