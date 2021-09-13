import React, { memo, useCallback } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Text from "components/Text";
import { width } from "configs/Const";
import keyExtractor from "utils/keyExtractor";
import ExpertsItem from "./ExpertsItem";
import { getBottomSpace } from "react-native-iphone-x-helper";
import ButtonIcon from "components/ButtonIcon";
import { SOURCE_ICON } from "images";
import { Colors } from "configs";
import Theme from "style/Theme";

interface ExpertsProps {}

const Experts = memo(({}: ExpertsProps) => {
  const renderExpert = useCallback(({ item }) => {
    return <ExpertsItem {...item} />;
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA_EXPERTS}
        renderItem={renderExpert}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      />
      <ButtonIcon
        icon={SOURCE_ICON.filter}
        style={{
          position: "absolute",
          ...Theme.shadow,
          bottom: getBottomSpace() + 16,
          alignSelf: "center",
        }}
        color={Colors.PinkOrange}
        size={56}
        borderRadius={16}
      />
    </View>
  );
});

export default Experts;

const styles = StyleSheet.create({
  container: {
    width: width,
  },
  contentContainerStyle: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: getBottomSpace(),
  },
});

const DATA_EXPERTS = [
  {
    id: 0,
    name: "Jordan Singleton",
    faculty: "Physical Medicine & Rehabilitat...",
    rate: 4.6,
    numberOfReviews: 141,
    avatar: require("images/avatar/sarah.png"),
    online: true,
    inNetwork: true,
    address: "Sun City, AZ 85351",
  },
  {
    id: 1,
    name: "Lucy Mann",
    faculty: "Anesthesiology",
    rate: 4.8,
    numberOfReviews: 753,
    avatar: require("images/avatar/sarah.png"),
    online: true,
    address: "Leominster, MA 01453",
  },
  {
    id: 2,
    name: "Janie Phillips",
    faculty: "Pediatrics",
    rate: 4.8,
    numberOfReviews: 234,
    avatar: require("images/avatar/sarah.png"),
    online: true,
    address: "Temple Hills, MD 20748",
  },
  {
    id: 3,
    name: "Donald Gregory",
    faculty: "Emergency Medicine",
    rate: 4.8,
    numberOfReviews: 141,
    avatar: require("images/avatar/sarah.png"),
    online: true,
    address: "Temple Hills, MD 20748",
  },
  {
    id: 4,
    name: "Donald Gregory",
    faculty: "Emergency Medicine",
    rate: 4.8,
    numberOfReviews: 141,
    avatar: require("images/avatar/sarah.png"),
    online: true,
    address: "Temple Hills, MD 20748",
  },
];
