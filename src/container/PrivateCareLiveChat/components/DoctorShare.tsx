import React, { memo } from "react";
import Text from "@components/Text";
import { View, StyleSheet, Image } from "react-native";
import { Colors } from "configs";
import Theme from "style/Theme";
import { SOURCE_ICON } from "images";

interface Props {
  name?: string;
  faculty?: string;
  rate?: number;
  review?: number;
  avatar?: any;
  online?: boolean;
}

const DoctorShare = memo(
  ({ name, faculty, rate, review, avatar, online }: Props) => {
    return (
      <View style={styles.container}>
        <View style={styles.bubble}>
          <Text lineHeight={15} color={Colors.DodgerBlue} size={15} bold>
            {name}
          </Text>
          <Text size={13} lineHeight={16} marginTop={8}>
            {faculty}
          </Text>
          <View style={[{ marginTop: 8 }, Theme.flexDirection]}>
            <View style={[Theme.center, Theme.flexDirection]}>
              <Image source={SOURCE_ICON.rateFull} />
              <Text marginLeft={5} marginRight={4} semibold size={13}>
                {rate}
              </Text>
            </View>
            <Text size={13} color={Colors.GrayBlue}>
              ({review} review)
            </Text>
          </View>
          <View
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              ...Theme.flexDirection,
            }}
          >
            <Image style={styles.avatar} source={avatar} />
            <View style={styles.avatarView}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  backgroundColor: online
                    ? Colors.Malachite
                    : Colors.RedNeonFuchsia,
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
);

export default DoctorShare;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    marginTop: 4,
    paddingLeft: 24,
  },
  bubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 4,
    backgroundColor: Colors.White,
    paddingLeft: 104,
    maxWidth: 297,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 20,
  },
  avatarView: {
    width: 14,
    height: 14,
    borderRadius: 14,
    backgroundColor: Colors.White,
    ...Theme.center,
    left: -10,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowColor: Colors.Malachite,
    shadowOpacity: 0.5,
  },
});
