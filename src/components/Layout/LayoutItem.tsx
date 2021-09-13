import { useTheme } from "configs/Theme";
import React from "react";
import {
  View as DefaultView,
  ViewProps,
  ViewStyle,
  PressableStateCallbackType,
} from "react-native";
interface Props extends ViewProps {
  children?:
    | React.ReactNode
    | ((state: PressableStateCallbackType) => React.ReactNode);
  style?: ViewStyle;
}

const LayoutItem = ({ children, style }: Props) => {
  const { theme } = useTheme();
  return (
    <DefaultView style={[{ backgroundColor: theme.modalColor }, style]}>
      {children}
    </DefaultView>
  );
};
export default LayoutItem;
