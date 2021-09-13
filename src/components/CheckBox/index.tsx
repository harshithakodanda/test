import React, { memo } from "react";
import {
  View,
  StyleSheet,
  Image,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";

interface CheckBoxProps {
  isCheck?: boolean | number;
  style?: ViewStyle;
  onPress?: () => void;
}

const CheckBox = memo(({ isCheck, style, onPress }: CheckBoxProps) => {
  return (
    <TouchableOpacity
      style={{ ...Theme.icons, ...Theme.center, ...style }}
      onPress={onPress}
      activeOpacity={0.54}
    >
      {isCheck ? (
        <Image source={require("images/ic_checkbox_active.png")} />
      ) : (
        <View
          style={{
            width: 20,
            height: 20,
            borderColor: "#979797",
            borderRadius: 3,
            borderWidth: 1,
          }}
        />
      )}
    </TouchableOpacity>
  );
});

export default CheckBox;

const styles = StyleSheet.create({
  container: {},
});
