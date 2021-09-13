import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import Text from "components/Text";

interface ChatProps {}

const Chat = memo((props: ChatProps) => {
  return (
    <View style={styles.container}>
      <Text>Chat</Text>
    </View>
  );
});

export default Chat;

const styles = StyleSheet.create({
  container: {},
});
