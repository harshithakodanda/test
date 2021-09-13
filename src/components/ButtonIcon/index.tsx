import React, { memo } from "react";
import {
  ColorValue,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import { Colors } from "configs";
import { useTheme } from "configs/Theme";

interface ButtonIconProps {
  size: number;
  borderRadius?: number;
  style?: ViewStyle;
  icon: ImageSourcePropType;
  color?: ColorValue | string;
  onPress?: () => void;
  tintColor?: string;
  disabled?: boolean;
}

const ButtonIcon = memo(
  ({
    size,
    borderRadius,
    style,
    icon,
    color,
    onPress,
    tintColor,
    disabled,
  }: ButtonIconProps) => {
    const { theme } = useTheme();
    return (
      <TouchableOpacity
        activeOpacity={0.54}
        style={[
          styles.container,
          style,
          {
            width: size,
            height: size,
            borderRadius: borderRadius,
            backgroundColor: color ? color : Colors.White20,
          },
        ]}
        {...{ onPress }}
        disabled={disabled}
      >
        <Image
          source={icon}
          style={{ tintColor: tintColor || theme.activeTincolor }}
        />
      </TouchableOpacity>
    );
  }
);

export default ButtonIcon;

const styles = StyleSheet.create({
  container: {
    ...Theme.center,
  },
});
