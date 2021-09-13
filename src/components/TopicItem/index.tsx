import React, { memo } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Text from "components/Text";
import { Colors } from "configs";
import Theme from "style/Theme";
import { useTheme } from "configs/Theme";
import Line from "components/Layout/Line";

interface TopicProps {
  id?: number;
  image?: any;
  title?: string;
  avatar?: any;
  name?: string;
  faculty?: string;
  subDescription?: string;
  style?: ViewStyle;
  onPress?: () => void;
}

export default memo(
  ({
    image,
    title,
    avatar,
    name,
    faculty,
    subDescription,
    onPress,
  }: TopicProps) => {
    const { theme } = useTheme();
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.54}
        style={[styles.container, { backgroundColor: theme.backgroundItem }]}
      >
        <ImageBackground style={styles.image} source={image}>
          <Text style={styles.title} white bold size={17} lineHeight={25}>
            {title}
          </Text>
        </ImageBackground>
        <View style={styles.setRow}>
          <Image style={styles.avatar} source={avatar} />
          <View>
            <Text bold size={15} lineHeight={18} color={Colors.DodgerBlue}>
              {name}
            </Text>
            <Text size={13} lineHeight={16}>
              {faculty}
            </Text>
          </View>
        </View>
        <Line />
        <Text marginHorizontal={16} marginTop={16} size={13} lineHeight={22}>
          {subDescription}
        </Text>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  container: {
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
    bottom: 16,
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

    ...Theme.flexRow,
  },
});
