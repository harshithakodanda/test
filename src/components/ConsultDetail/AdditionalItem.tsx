import React, { memo } from "react";
import { View, StyleSheet, Image, ViewStyle } from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import { Colors } from "configs";

interface AdditionalItemProps {
  title: string;
  value?: string | null;
  time?: string;
  isLast?: boolean;
}

const AdditionalItem = memo((props: AdditionalItemProps) => {
  return (
    <View style={!props.isLast && { marginBottom: 28 }}>
      <Text size={15} lineHeight={18} bold>
        {props.title}
      </Text>
      <Text
        size={15}
        lineHeight={18}
        marginTop={12}
        color={
          props.value && props.value.length > 0
            ? Colors.DarkJungleGreen
            : Colors.GrayBlue
        }
      >
        {props.value && props.value.length > 0 ? props.value : "None"}
        {props.time && (
          <Text size={13} lineHeight={16} color={Colors.GrayBlue}>
            {" "}
            ({props.time})
          </Text>
        )}
      </Text>
    </View>
  );
});

export default AdditionalItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    borderRadius: 16,
    paddingTop: 16,
    paddingBottom: 24,
    ...Theme.shadow,
  },
});
