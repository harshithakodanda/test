import React, { Dispatch, SetStateAction, memo } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  ColorValue,
} from "react-native";
import Text from "components/Text";
import TextInput from "components/TextInput";
import { Colors } from "configs";

interface InputAppProps {
  value: string;
  onChangeText?: (text: string) => void | Dispatch<SetStateAction<string>>;
  placeholder?: string;
  isShowIcon?: boolean;
  icon?: any;
  secureTextEntry?: boolean;
  style?: ViewStyle;
  styleView?: ViewStyle;
  title: string;
  borderColor?: string;
  iconPress?: () => void;
  autoFocus?: boolean;
  isShowIconLeft?: boolean;
  iconLeft?: any;
  iconPressLeft?: () => void;
  marginTop?: number;
  multiline?: boolean;
  editable?: boolean;
  onPress?: () => void;
  styleInput?: ViewStyle;
  backgroundColor?: ColorValue | string;
  keyboardType?: KeyboardTypeOptions;
}

export type KeyboardType = 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad' | 'decimal-pad';
export type KeyboardTypeIOS =
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'name-phone-pad'
    | 'twitter'
    | 'web-search';
export type KeyboardTypeAndroid = 'visible-password';
export type KeyboardTypeOptions = KeyboardType | KeyboardTypeAndroid | KeyboardTypeIOS;


const InputApp = memo(
  ({
    value,
    placeholder,
    onChangeText,
    isShowIcon,
    icon,
    secureTextEntry,
    style,
    styleView,
    title,
    borderColor = Colors.Isabelline,
    iconPress,
    autoFocus,
    isShowIconLeft,
    iconLeft,
    iconPressLeft,
    marginTop,
    multiline,
    editable = true,
    backgroundColor,
    onPress,
    styleInput,
    keyboardType,
  }: InputAppProps) => {
    return (
      <TouchableOpacity
        style={[styleView, { marginTop: marginTop }]}
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={0.7}
      >
        <Text type="H5" semiBold>
          {title}
        </Text>
        <TextInput
          {...{
            value,
            placeholder,
            onChangeText,
            isShowIcon,
            icon,
            secureTextEntry,
            borderColor,
            iconPress,
            autoFocus,
            isShowIconLeft,
            iconLeft,
            iconPressLeft,
            multiline,
            editable,
            backgroundColor: backgroundColor,
            keyboardType,
          }}
          style={{ ...style }}
        />
      </TouchableOpacity>
    );
  }
);

export default InputApp;

const styles = StyleSheet.create({
  container: {},
});
