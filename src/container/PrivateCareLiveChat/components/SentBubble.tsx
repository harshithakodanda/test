import React, { memo } from "react";
import Text from "@components/Text";
import { View, StyleSheet } from "react-native";
import { Colors } from "configs";

export interface User {
  id: string | number;
  name: string;
  avatar: string;
}

interface Props {
  id: string | number;
  text?: string;
  user: User;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
}

const SentBubble = memo(({ text }: Props) => {
  return (
    <View style={styles.container}>
      {text && (
        <View style={styles.bubble}>
          <Text darkJungGreen size={15}>
            {text}
          </Text>
        </View>
      )}
    </View>
  );
});

export default SentBubble;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    marginTop: 4,
    paddingLeft: 24,
  },
  bubble: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 4,
    backgroundColor: Colors.Isabelline,
    maxWidth: 297,
  },
});
