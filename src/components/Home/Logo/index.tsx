import React, { memo, useCallback } from "react";
import {
  View,
  StyleSheet,
  Image,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import { Colors, Routes } from "configs";
import { useNavigation } from "@react-navigation/native";
import { themes, useTheme } from "configs/Theme";

interface IconNotificationProps {
  style?: ViewStyle;
}

const Logo = memo((props: IconNotificationProps) => {
  const { theme } = useTheme();
  return (
    
    <TouchableOpacity
      style={[
        styles.container,
        props.style,
      ]}
      activeOpacity={0.54}
    >
      <Image
        source={require("images/smallLogo.png")}
       style={{height:40,width:40}}
      />
    </TouchableOpacity>
  );
});

export default Logo;

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 60,
    ...Theme.center,
    minWidth: 16,
    
  },
});
