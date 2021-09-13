import React, { memo } from "react";
import Text from "@components/Text";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Colors } from "configs";
import Theme from "style/Theme";
import { SOURCE_ICON } from "images";

interface Props {
  title?: string;
  date?: string;
  time?: string;
}

const LiveChatConsult = memo(({ title, date, time }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text bold size={15} lineHeight={18}>
          Live Chat Consult
        </Text>
        <Text size={13} lineHeight={16} marginTop={8}>
          {date}
        </Text>
        <Text size={13} lineHeight={16} marginTop={8}>
          {time}
        </Text>
        <TouchableOpacity activeOpacity={0.54} style={styles.iconView}>
          <Image source={SOURCE_ICON.addtional} />
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default LiveChatConsult;

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    paddingHorizontal: 24,
  },
  bubble: {
    flex: 1,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: Colors.White,
  },
  iconView: {
    width: 24,
    height: 24,
    position: "absolute",
    top: 24,
    right: 24,
    backgroundColor: Colors.DodgerBlue,
    borderRadius: 8,
    ...Theme.center,
  },
});
