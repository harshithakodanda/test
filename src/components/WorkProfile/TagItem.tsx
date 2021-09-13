import React, { memo } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Text from "components/Text";
import { Colors } from "configs";
import Theme from "style/Theme";

interface TagItemProps {
  title: string;
}

const TagItem = memo((props: TagItemProps) => {
  return (
    <View style={styles.container}>
      <Text white size={12} lineHeight={14} bold color={Colors.White}>
        {props.title}
      </Text>
      <TouchableOpacity style={styles.touch}>
        <Image source={require("images/ic_close_16.png")} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
});

export default TagItem;

const styles = StyleSheet.create({
  container: {
    height: 30,
    paddingLeft: 12,
    paddingRight: 22,
    justifyContent: "center",
    backgroundColor: Colors.DodgerBlue,
    borderRadius: 4,
    ...Theme.flexRow,
    marginRight: 8,
    marginTop: 8,
  },
  touch: {
    width: 16,
    height: 16,
    position: "absolute",
    right: 4,
  },
  icon: {
    width: 16,
    height: 16,
  },
});
