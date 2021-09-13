import LinearColors from "components/LinearColors";
import { Colors } from "configs";
import React, { memo } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Theme from "style/Theme";
import Text from "components/Text";
import { SOURCE_ICON } from "images";
import { Switch } from "react-native-gesture-handler";
import Layout from "components/Layout/Layout";
import { useTheme } from "configs/Theme";
import Line from "components/Layout/Line";

interface AccountItemProps {
  icon?: any;
  name?: string;
  isToggle?: boolean;
  style?: ViewStyle;
  onPress?: () => void;
  switchValue?: boolean;
  onValueChange?: () => void;
  lineBottom?: boolean;
}

const AccountItem = memo(
  ({
    icon,
    name,
    isToggle,
    style,
    onPress,
    switchValue,
    onValueChange,
    lineBottom,
  }: AccountItemProps) => {
    const { theme } = useTheme();
    return (
      <View>
        <TouchableOpacity
          style={{ ...style, backgroundColor: theme.backgroundItem }}
          onPress={onPress}
        >
          <View style={Theme.flexRow}>
            <LinearColors
              colors={[Colors.TealBlue, Colors.TurquoiseBlue]}
              style={styles.contentIcon}
            >
              <Image source={icon} style={styles.icon} />
            </LinearColors>
            <Text size={15} marginLeft={16}>
              {name}
            </Text>
          </View>
          <View>
            {isToggle === true ? (
              <Switch value={switchValue} onValueChange={onValueChange} />
            ) : (
              <Image source={SOURCE_ICON.arrowRight} />
            )}
          </View>
        </TouchableOpacity>
        {lineBottom ? <Line /> : null}
      </View>
    );
  }
);

export default AccountItem;

const styles = StyleSheet.create({
  icon: {
    tintColor: Colors.White,
    alignSelf: "center",
  },
  contentIcon: {
    width: 40,
    height: 40,
    backgroundColor: Colors.DodgerBlue,
    borderRadius: 8,
    justifyContent: "center",
  },
});
