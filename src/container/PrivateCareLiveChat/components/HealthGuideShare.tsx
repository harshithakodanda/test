import React, { memo } from "react";
import Text from "@components/Text";
import { View, StyleSheet, Image } from "react-native";
import { Colors } from "configs";

interface Props {
  title?: string;
  enroll?: string;
  name?: string;
  avatar?: any;
}

const HealthGuideShare = memo(({ title, enroll, avatar, name }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text
          size={17}
          lineHeight={25}
          semibold
          marginLeft={16}
          color={Colors.DodgerBlue}
          style={styles.title}
        >
          {title}
        </Text>
        <Text marginLeft={16} size={13} lineHeight={22} marginTop={4}>
          {enroll} enrolled
        </Text>
        <View style={styles.box}>
          <Image style={styles.avatar} source={avatar} />
          <Text marginLeft={12} semibold size={13} color={Colors.DodgerBlue}>
            {name}
            <Text> shared</Text>
          </Text>
        </View>
      </View>
    </View>
  );
});

export default HealthGuideShare;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    marginTop: 4,
    paddingLeft: 24,
  },
  bubble: {
    paddingVertical: 12,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 4,
    backgroundColor: Colors.White,
    maxWidth: 297,
  },
  title: {
    width: 247,
  },
  avatar: {
    width: 40,
    height: 40,
  },
  box: {
    borderTopWidth: 1,
    borderTopColor: Colors.WhiteSmoke,
    paddingTop: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
});
