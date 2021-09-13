import React, { memo } from "react";
import {
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  ColorValue,
} from "react-native";
import Text, { TextProps } from "components/Text";
import { Colors } from "configs";
import Theme from "style/Theme";
import { themes, useTheme } from "configs/Theme";

interface ButtonTextProps {
  title?: string;
  style?: ViewStyle;
  titleColor?: string;
  textProps?: TextProps;
  onPress?: () => void;
  bold?: boolean;
  hilight?: boolean;
  white?: boolean;
  blueLight?: boolean;
  marginRight?: number;
  borderWidth?: number;
  marginTop?: number;
  borderColor?: ColorValue | string;
}

const ButtonText = memo(
  ({
    title,
    style,
    titleColor = Colors.TealBlue,
    onPress,
    bold,
    hilight,
    marginTop,
    white,
    marginRight,
    borderColor,
    borderWidth,
    blueLight,
    ...textProps
  }: ButtonTextProps) => {
    const { theme } = useTheme();
    return (
      <TouchableOpacity
        style={[
          styles.container,
          style,
          {
            marginRight: marginRight,
            marginTop: marginTop,
            borderColor: borderColor || theme.innearColor,
            borderWidth: borderWidth || borderColor ? 1 : 0,
          },
        ]}
        onPress={onPress}
        activeOpacity={0.54}
      >
        <Text
          blueLight={blueLight}
          type="H5"
          color={titleColor}
          hilight={hilight}
          white={white}
          {...textProps}
          bold
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
);

export default ButtonText;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.White,
    ...Theme.center,
    ...Theme.flexRow,
  },
});
