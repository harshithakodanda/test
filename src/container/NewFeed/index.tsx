import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import Text from "components/Text";

interface NewFeedProps {}

const NewFeed = memo((props: NewFeedProps) => {
  return (
    <View style={styles.container}>
      <Text>NewFeed</Text>
    </View>
  );
});

export default NewFeed;

const styles = StyleSheet.create({
  container: {},
});
