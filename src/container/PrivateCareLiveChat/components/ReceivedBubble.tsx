import React, { memo } from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "@components/Text";
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

const ReceivedBubble = memo(({ text, user }: Props) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      {text && (
        <View style={styles.bubble}>
          <Text size={15} color={Colors.White}>
            {text}
          </Text>
        </View>
      )}
    </View>
  );
});

export default ReceivedBubble;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingLeft: 16,
    marginTop: 4,
  },
  bubble: {
    flexDirection: "row",
    backgroundColor: Colors.BlueCrayola,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 4,
    maxWidth: 297,
    marginTop: 4,
  },
  avatar: {
    alignSelf: "flex-end",
    width: 24,
    height: 24,
    borderRadius: 8,
    marginRight: 12,
  },
});
