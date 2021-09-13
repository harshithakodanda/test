import React, { memo, useCallback } from "react";
import { StyleSheet, TouchableOpacity, ViewStyle, Image } from "react-native";
import { Colors } from "configs";
import Theme from "style/Theme";
import { SOURCE_ICON } from "images";

interface ButtonIconProps {
  icon?: any;
  style?: ViewStyle;
  onPress?: () => void;
  disabled?: boolean;
  tintColor?: string;
}

const ButtonIcon = memo(
  ({ icon, style, onPress, ...props }: ButtonIconProps) => {
    const _onPress = useCallback(() => {
      onPress && onPress();
    }, [onPress]);

    return (
      <TouchableOpacity
        {...props}
        activeOpacity={0.54}
        style={[styles.container, style]}
        onPress={_onPress}
        disabled={props.disabled}
      >
        <Image
          source={SOURCE_ICON[`${icon}`]}
          style={{ tintColor: props.tintColor }}
        />
      </TouchableOpacity>
    );
  }
);

export default ButtonIcon;

const styles = StyleSheet.create({
  container: {
    height: 32,
    width: 32,
    backgroundColor: Colors.DodgerBlue,
    borderRadius: 8,
    ...Theme.center,
  },
});
