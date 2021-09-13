import { useTheme } from "configs/Theme";
import React from "react";
import {
  TouchableOpacity as DefaultTouchableOpacity,
  ViewStyle,
  PressableStateCallbackType,
  ColorValue,
  TouchableOpacityProps,
} from "react-native";
interface Props extends TouchableOpacityProps {
  children?:
    | React.ReactNode
    | ((state: PressableStateCallbackType) => React.ReactNode);
  style?: ViewStyle;
  backgroundColor?: ColorValue | string;
  activeOpacity?: number;
}

const Touchable = (props: Props) => {
  const { theme } = useTheme();
  return (
    <DefaultTouchableOpacity
      activeOpacity={0.54}
      style={[
        { backgroundColor: props.backgroundColor || theme.backgroundItem },
        props.style,
      ]}
    >
      {props.children}
    </DefaultTouchableOpacity>
  );
};
export default Touchable;
