import React, { memo } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ColorValue,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Theme from "style/Theme";
import { Colors } from "configs";
import { useTheme } from "configs/Theme";

interface HeaderButtonProps {
  tintColor?: ColorValue | string;
}

const HeaderButton = memo(({ tintColor }: HeaderButtonProps) => {
  const { theme } = useTheme();
  const { goBack } = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Image
          source={require("images/ic_back.png")}
          style={{ tintColor: tintColor ? tintColor : theme.activeTincolor }}
        />
      </TouchableOpacity>

      <TouchableOpacity  onPress={goBack}>
        <Image 
          source={require("images/smallLogo.png")}
          style={{  height:40, width:40
           }}
        />
      </TouchableOpacity>

    </View>
  );
});

export default HeaderButton;

const styles = StyleSheet.create({
  container: {
    ...Theme.flexRowSpace,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.Platinum,
    ...Theme.center,
  },
});
