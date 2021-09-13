import React, { memo } from "react";
import {
  ColorValue,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Text from "components/Text";
import { Colors } from "configs";
import Theme from "style/Theme";
import { useTheme } from "configs/Theme";

interface ButtonBorderProps {
  title?: string;
  style?: ViewStyle;
  onPress?: () => void;
  borderColor?: ColorValue | string;
  backgroundColor?: ColorValue | string;
  color?: ColorValue | string;
  white?: boolean;
  hilight?: boolean;
  placeholder?: boolean;
}

const ButtonBorder = memo(
  ({
    title,
    style,
    onPress,
    borderColor = Colors.Platinum,
    backgroundColor,
    color = Colors.GrayBlue,
    white,
    placeholder,
    hilight,
  }: ButtonBorderProps) => {
    const { theme } = useTheme();
    return (
      <TouchableOpacity
        activeOpacity={0.54}
        style={[
          styles.container,
          {
            borderColor: theme.innearColor || borderColor,
            backgroundColor: backgroundColor,
          },
          style,
        ]}
        onPress={onPress}
      >
        <Text
          size={15}
          lineHeight={18}
          color={color ? color : theme.text}
          bold
          white={white}
          hilight={hilight}
          placeholder={placeholder}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
);

export default ButtonBorder;

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    ...Theme.center,
  },
});
