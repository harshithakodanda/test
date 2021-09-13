import React, { Dispatch, memo, SetStateAction, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  ViewStyle,
  TouchableOpacity,
  ColorValue,
} from "react-native";
import Theme from "style/Theme";
import { Colors } from "configs";
import { SOURCE_ICON } from "images";
import { setConstantValue } from "typescript";
import { useState } from "react";
import Layout from "components/Layout/Layout";
import { useTheme } from "configs/Theme";

interface SearchBoxProps {
  value?: string;
  onChangeText?: Dispatch<SetStateAction<string>>;
  placeholder: string;
  borderColor?: ColorValue | string;
  backgroundColor?: ColorValue | string;
  style?: ViewStyle;
  onSubmitEditing?: () => void;
  shadow?: boolean;
  onFocus?: () => void;
  autoFocus?: boolean;
}

const SearchBox = memo(
  ({
    value,
    onChangeText,
    onSubmitEditing,
    placeholder,
    borderColor,
    style,
    backgroundColor,
    shadow = true,
    onFocus,
    autoFocus,
    ...props
  }: SearchBoxProps) => {
    const ref = useRef<any>();
    const { theme } = useTheme();
    return (
      <Layout>
        <Image source={require("images/ic_search_normal.png")} />
        <TextInput
          {...props}
          placeholder={placeholder}
          placeholderTextColor={Colors.GrayBlue}
          style={{
            fontSize: 13,
            lineHeight: 16,
            flex: 1,
            marginLeft: 16,
            color: theme.text,
          }}
          onFocus={onFocus}
          value={value}
          returnKeyType={"search"}
          onSubmitEditing={() => {
            if (value && value.length > 0) {
              onSubmitEditing && onSubmitEditing();
            }
          }}
          onChangeText={onChangeText}
          autoFocus={autoFocus}
          ref={ref}
        />
        {!!value && value.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              ref.current.clear();
            }}
          >
            <Image source={SOURCE_ICON["reset-search"]} />
          </TouchableOpacity>
        )}
      </Layout>
    );
  }
);

export default SearchBox;

const styles = StyleSheet.create({
  container: {
    ...Theme.flexRow,
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginTop: 40,

    borderWidth: 1,
  },
});
