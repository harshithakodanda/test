import React, { SetStateAction, Dispatch } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  ColorValue,
} from "react-native";
import { Colors } from "configs";
import Theme from "style/Theme";
import { useTheme } from "configs/Theme";
import Text from "../Text";

interface Props {
  value: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onChangeText?: (text: string) => void | Dispatch<SetStateAction<string>>;
  onSubmitEditing?: () => void;
  onEndEditing?: () => void;
  onSelectionChange?: () => void;
  placeholder?: string;
  isShowIcon?: boolean;
  icon?: any;
  secureTextEntry?: boolean;
  style?: ViewStyle;
  iconStyle?: ViewStyle;
  borderColor?: string;
  iconPress?: () => void;
  autoFocus?: boolean;
  backgroundColor?: ColorValue | string;
  iconLeft?: any;
  isShowIconLeft?: boolean;
  iconPressLeft?: () => void;
  multiline?: boolean;
  editable?: boolean;
  color?: ColorValue;
}

export default ({
  value,
  placeholder,
  onChangeText,
  onSubmitEditing,
  onEndEditing,
  onSelectionChange,
  isShowIcon,
  icon,
  iconStyle,
  secureTextEntry,
  style,
  borderColor,
  backgroundColor,
  iconPress,
  isShowIconLeft,
  iconLeft,
  iconPressLeft,
  autoFocus,
  onFocus,
  onBlur,
  color,
  ...props
}: Props) => {
  const { theme } = useTheme();

  let lineHeight;
  if (props.multiline) {
    lineHeight = 24;
  }
  let height;
  return (
    <View
      style={[
        styles.container,
        style,
        {
          borderWidth: 1,
          borderColor: theme.placeholder,
          backgroundColor: backgroundColor || theme.backgroundItem,
        },
        props.multiline && styles.muli,
      ]}
    >
      {isShowIconLeft && !!iconLeft && (
        <TouchableOpacity
          style={styles.iconLeftView}
          onPress={iconPressLeft}
          disabled={!iconPressLeft}
        >
          {iconLeft}
        </TouchableOpacity>
      )}
      {props.editable ? (
        <TextInput
          numberOfLines={1}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          onSubmitEditing={onSubmitEditing}
          onEndEditing={onEndEditing}
          onSelectionChange={onSelectionChange}
          style={[
            styles.textInput,
            {
              lineHeight: lineHeight,
              color: theme.text,
            },
          ]}
          secureTextEntry={secureTextEntry}
          editable={props.editable}
          placeholderTextColor={Colors.GrayBlue}
          autoFocus={autoFocus}
          {...props}
        />
      ) : (
        <Text size={15} lineHeight={24} semiBold style={{ flex: 1 }}>
          {value}
        </Text>
      )}
      {isShowIcon && !!icon && (
        <TouchableOpacity
          style={[styles.iconView, iconStyle]}
          onPress={iconPress}
          disabled={!iconPress}
        >
          {icon}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 48,
    justifyContent: "center",
    paddingHorizontal: 16,
    borderRadius: 8,
    ...Theme.flexRow,
  },
  iconView: {
    width: 24,
    height: 24,
    position: "absolute",
    right: 12,
    ...Theme.center,
  },
  iconLeftView: {
    width: 24,
    height: 24,
    ...Theme.center,
    marginRight: 16,
  },
  muli: {
    paddingBottom: 11,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    height: "100%",
    color: Colors.DarkJungleGreen,
    fontFamily: "Mulish-SemiBold",
  },
});
