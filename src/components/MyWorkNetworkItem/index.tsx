import { Colors } from "configs";
import { SOURCE_ICON } from "images";
import React, { memo } from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "configs/Theme";

interface NetWorkItemProps {
  style?: any;
  id?: number;
  avatar?: any;
  name?: string;
  faculty?: string;
  rating?: number;
  review?: number;
  address?: string;
  online?: boolean;
  onPress?: () => void;
}

export default memo(
  ({
    style,
    avatar,
    name,
    faculty,
    rating,
    review,
    address,
    online,
    onPress,
  }: NetWorkItemProps) => {
    const { theme } = useTheme();
    return (
      <TouchableOpacity
        style={[
          styles.container,
          style,
          { backgroundColor: theme.backgroundItem },
        ]}
        onPress={onPress}
        activeOpacity={0.54}
      >
        <Text bold marginTop={24} color={Colors.DodgerBlue}>
          {name}
        </Text>
        <Text marginVertical={8}>{faculty}</Text>
        <View style={Theme.flexRow}>
          <Image source={SOURCE_ICON.rateFull} />
          <Text marginHorizontal={5}>{rating}</Text>
          <Text color={Colors.GrayBlue}>({review} reviews)</Text>
        </View>
        <Text marginTop={8} marginBottom={24}>
          {address}
        </Text>
        <View style={styles.avatarView}>
          <Image style={styles.avatar} source={avatar} />
          <View style={styles.statusView}>
            <View
              style={[
                styles.circle,
                {
                  backgroundColor: online
                    ? Colors.Malachite
                    : Colors.RedNeonFuchsia,
                },
              ]}
            />
          </View>
          <View style={styles.myNetwork}>
            <Image source={SOURCE_ICON.myNetwork} />
            <Text
              white
              size={8}
              lineHeight={12}
              marginLeft={4}
              bold
              color={Colors.White}
            >
              MY NETWORK 1
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowColor: Colors.boxShadow,
    shadowOpacity: 1,
    paddingLeft: "30%",
  },
  avatar: {
    height: 64,
    width: 64,
    borderRadius: 24,
    alignSelf: "center",
  },
  myNetwork: {
    backgroundColor: Colors.Orange,
    marginTop: 8,
    borderRadius: 2,
    paddingHorizontal: 4,
    paddingVertical: 2,
    ...Theme.center,
    ...Theme.flexRow,
  },
  statusView: {
    width: 14,
    height: 14,
    borderRadius: 14,
    backgroundColor: Colors.White,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    position: "absolute",
    right: 8,
    ...Theme.center,
  },
  avatarView: {
    position: "absolute",
    top: 24,
    left: 24,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
});
