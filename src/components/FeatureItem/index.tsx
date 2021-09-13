import React, { memo, useCallback } from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import { Colors, Constants } from "configs";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "configs/Theme";

interface ItemProps {
  img: ImageSourcePropType;
  title: string;
  numberNew?: number;
  route?: any;
  style?: ViewStyle;
}

export default memo((props: ItemProps) => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();
  const onPress = useCallback(() => {
    props.route && navigate(props.route);
  }, [props.route, navigate]);
  return (
    <TouchableOpacity
      style={[
        styles.container,
        props.style,
        { backgroundColor: theme.backgroundItem },
      ]}
      onPress={onPress}
    >
      <View style={{ width: `${(88 / 156) * 100}%` }}></View>
      <Image source={props.img} />
      <Text marginTop={16} size={13} lineHeight={18} center>
        {props.title}
      </Text>
      {props.numberNew && (
        <Text size={13} lineHeight={18} center color={Colors.GrayBlue}>
          {props.numberNew > 150 ? "150+" : props.numberNew} new
        </Text>
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    width: (Constants.width - 64) / 2,
    height: (Constants.width - 64) / 2,
    ...Theme.center,
    marginBottom: 16,
    borderRadius: 16,
    ...Theme.shadow,
  },
});
