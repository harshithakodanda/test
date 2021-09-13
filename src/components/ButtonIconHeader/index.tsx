import React, { memo, useCallback } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  ViewStyle,
} from "react-native";
import { Colors } from "configs";
import Theme from "style/Theme";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "configs/Theme";

interface ButtonIconHeaderProps {
  onPress?: () => void;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
  icon?: ImageSourcePropType;
  tintColor?: string;
  borderColor?: string;
  style?: ViewStyle;
  backgroundColor?: string;
}

const ButtonIconHeader = memo((props: ButtonIconHeaderProps) => {
  const { theme } = useTheme();
  const { goBack } = useNavigation();
  const onPress = useCallback(() => {
    if (props.onPress) {
      props.onPress();
    } else {
      goBack();
    }
  }, []);
  return (
    <TouchableOpacity
      style={[
        styles.backButton,
        props.style,
        {
          marginLeft: props.marginLeft ? props.marginLeft : 0,
          marginBottom: props.marginBottom ? props.marginBottom : 0,
          marginRight: props.marginRight ? props.marginRight : 0,
          borderColor: props.borderColor || theme.innearColor,
          backgroundColor: props.backgroundColor || theme.backgroundItem,
        },
      ]}
      onPress={onPress}
    >
      <Image
        source={props.icon || require("images/ic_back.png")}
        style={{ tintColor: props.tintColor || theme.activeTincolor }}
      />
    </TouchableOpacity>
  );
});

export default ButtonIconHeader;

const styles = StyleSheet.create({
  container: {},
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    ...Theme.center,
  },
});
