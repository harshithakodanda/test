import React, { memo } from "react";
import Text from "@components/Text";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { Colors } from "configs";
import Theme from "style/Theme";
import { SOURCE_ICON } from "images";

export interface Props {
  icon?: string;
  color?: string;
  title?: string;
  onPress?: () => void;
}

const ButtonShare = memo(({ icon, color, title, ...props }: Props) => {
  return (
    <TouchableOpacity {...props} activeOpacity={0.54} style={styles.container}>
      <View style={[styles.button, color && { backgroundColor: color }]}>
        <Image source={SOURCE_ICON[`${icon}`]} />
      </View>
      <Text size={11} lineHeight={14} marginTop={8}>
        {title}
      </Text>
    </TouchableOpacity>
  );
});

export default ButtonShare;

const styles = StyleSheet.create({
  container: {
    ...Theme.center,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.TealBlue,
    ...Theme.center,
  },
});
