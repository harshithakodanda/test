import React, { memo } from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "components/Text";
import { Colors } from "configs";
import Theme from "style/Theme";
import scale from "utils/scale";

interface AttachedFilesProps {
  information: any;
}

const AttachedFiles = memo(({ information }: AttachedFilesProps) => {
  return (
    <View style={Theme.flexDirection}>
      <Image
        source={require("images/down.png")}
        style={{
          width: scale(100),
          height: scale(72),
          borderRadius: 4,
          marginRight: 16,
        }}
      />
      <View
        style={{
          flex: 1,
          marginRight: 16,
          justifyContent: "space-between",
        }}
      >
        <Text size={13} lineHeight={16}>
          Condition sample: {"\n"}redness on the back of the neck
        </Text>
        <Text size={13} lineHeight={16} color={Colors.GrayBlue}>
          Uploaded Jan, 05 2020
        </Text>
      </View>
    </View>
  );
});

export default AttachedFiles;

const styles = StyleSheet.create({
  container: {},
});
