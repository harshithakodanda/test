import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import Theme from "style/Theme";
import { Colors } from "configs";
import ButtonBorder from "../ButtonBorder";
import LinearColors from "components/LinearColors";
import Text from "components/Text";
interface ButtonLinearProps {
  title: string;
  style?: ViewStyle;
  onPress?: () => void;
  children?: any;
  leftChildren?: any;
  styleButton?: ViewStyle;
  disabled?: boolean;
  colors?: string[];
  width?: number;
  height?: number;
  marginTop?: number;
  marginBottom?: number;
  white?: boolean;
}

const ButtonLinear = ({
  title,
  style,
  onPress,
  children,
  styleButton,
  leftChildren,
  disabled,
  colors,
  width,
  marginBottom,
  marginTop,
  height,
  white,
}: ButtonLinearProps) => {
  if (disabled) {
    return (
      <ButtonBorder
        title={title}
        style={styleButton}
        backgroundColor={Colors.Isabelline}
        borderColor={Colors.Isabelline}
      />
    );
  }
  return (
    <TouchableOpacity
      style={styleButton}
      activeOpacity={0.54}
      onPress={onPress}
    >
      <LinearColors
        style={{ ...styles.container, ...style }}
        vertical
        locations={[0, 0.75]}
        colors={colors || ['#02b4b8', '#67d2d4']}
      >
        {leftChildren}
        <Text marginLeft={8} white={white} type="H5" bold>
          {title}
        </Text>
        {children}
      </LinearColors>
    </TouchableOpacity>
  );
};

export default ButtonLinear;

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 12,
    ...Theme.flexRowCenter,
  },
});
