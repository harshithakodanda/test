import React, { memo } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import ButtonIcon from "components/Buttons/ButtonIcon";
import { Colors } from "configs";

interface RowInfoProps {
  icon: string;
  value: string;
  style?: ViewStyle;
  titleColor?: string;
  bold?: boolean;
}

const RowInfo = memo(
  ({ icon, value, style, titleColor, bold }: RowInfoProps) => {
    return (
      <View style={[Theme.flexRow, style]}>
        <ButtonIcon
          icon={icon}
          style={{
            width: 32,
            height: 32,
            backgroundColor: Colors.TealBlue20,
          }}
          tintColor={Colors.TealBlue}
          disabled
        />
        <Text
          size={15}
          lineHeight={18}
          marginLeft={16}
          bold={bold}
          color={titleColor}
        >
          {value}
        </Text>
      </View>
    );
  }
);

export default RowInfo;

const styles = StyleSheet.create({
  container: {},
});
