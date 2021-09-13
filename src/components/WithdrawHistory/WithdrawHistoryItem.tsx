import React, { memo } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import Text from "components/Text";
import { Colors } from "configs";
import Theme from "style/Theme";
import { formatNumber } from "utils/formatNumber";

interface Props {
  id?: number;
  title?: string;
  time?: string;
  amount: number;
  style: ViewStyle;
}

export default memo(({ title, time, amount, style }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <View style={Theme.flexRowSpace}>
        <Text bold size={15}>
          {title}
        </Text>
        <Text bold size={17}>
          {formatNumber(amount)}
        </Text>
      </View>
      <Text marginTop={8} color={Colors.GrayBlue} size={13}>
        {time}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
});
