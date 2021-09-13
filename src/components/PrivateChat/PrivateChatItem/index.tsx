import React, { memo } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Text from "components/Text";
import { Colors } from "configs";
import Theme from "style/Theme";

interface Props {
  nameGroup?: string;
  members?: any[];
  message?: string;
  name?: string;
  avatar?: any;
  online?: boolean;
  read?: boolean;
  time?: string;
  onPress?: () => void;
}

export default memo(
  ({
    nameGroup,
    members,
    message,
    name,
    avatar,
    online,
    read,
    time,
    onPress,
  }: Props) => {
    return (
      <TouchableOpacity
        activeOpacity={0.54}
        onPress={onPress}
        style={styles.container}
      >
        <View>
          {members ? (
            members.map((item, index) => {})
          ) : (
            <Image style={styles.avatar} source={avatar} />
          )}
          {online && (
            <View style={styles.statusView}>
              <View style={styles.circle} />
            </View>
          )}
        </View>
        <View>
          {nameGroup ? (
            <Text bold={!read} size={15} lineHeight={18}>
              {nameGroup}
            </Text>
          ) : (
            <Text bold={!read} size={15} lineHeight={18}>
              {name}
            </Text>
          )}
          <Text
            color={read ? Colors.GrayBlue : Colors.DarkJungleGreen}
            marginTop={4}
            bold={!read}
            size={13}
            lineHeight={16}
          >
            {message}
            <Text color={read ? Colors.GrayBlue : Colors.DarkJungleGreen}>
              {" . "}
              {time}
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    ...Theme.flexRow,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginBottom: 2,
    minHeight: 80,
  },
  avatar: {
    marginRight: 16,
    width: 56,
    height: 56,
    borderRadius: 12,
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
  circle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: Colors.Malachite,
  },
  avatar1: {
    width: 40,
    height: 40,
  },
});
