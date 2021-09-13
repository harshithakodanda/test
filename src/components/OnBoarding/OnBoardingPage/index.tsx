import React, { memo } from "react";
import { View, StyleSheet, Image, ImageSourcePropType } from "react-native";
import Text from "components/Text";
import { Colors, Constants } from "configs";
interface OnboardingPageProps {
  image: ImageSourcePropType;
  desc: string;
  isFirstItem?: boolean;
  isLastItem?: boolean;
}

const OnboardingPage = memo(
  ({ image, desc, isFirstItem, isLastItem }: OnboardingPageProps) => {
    return (
      <View style={styles.page}>
        <View
          style={[
            styles.container,
            isFirstItem && styles.isFirstItem,
            isLastItem && styles.isLastItem,
          ]}
        >
          <Image source={image} style={styles.image} />
          <Text type="H3" bold style={styles.desc} darkJungGreen>
            {desc}
          </Text>
        </View>
      </View>
    );
  }
);

export default OnboardingPage;

const styles = StyleSheet.create({
  page: {
    width: Constants.width,
  },
  container: {
    paddingBottom: 8,
    overflow: "hidden",
    backgroundColor: Colors.White,
  },
  image: {
    width: Constants.width,
    height: (Constants.height / 812) * 539,
  },
  desc: {
    position: "absolute",
    bottom: 32,
    left: 32,
    right: 32,
  },
  isFirstItem: {
    borderBottomLeftRadius: 0,
  },
  isLastItem: {
    borderBottomRightRadius: 0,
  },
});