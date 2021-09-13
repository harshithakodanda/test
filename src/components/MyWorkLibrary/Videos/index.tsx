import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import Text from "components/Text";
import { width } from "configs/Const";
import Theme from "style/Theme";

export default memo(() => {
  return (
    <View style={styles.container}>
      <Text>Video</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    ...Theme.center,
  },
});
