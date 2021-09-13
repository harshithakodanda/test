import React, { memo, useCallback } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { width } from "configs/Const";
import { Colors } from "configs";
import { getBottomSpace } from "react-native-iphone-x-helper";
import keyExtractor from "utils/keyExtractor";
import HealthFeedItem from "components/HealthFeed/HealthFeedItem";

interface TipsSearchResultsProps {}

const TipsSearchResults = memo(({}: TipsSearchResultsProps) => {
  const _renderItem = useCallback(({ item }) => {
    return <HealthFeedItem {...item} />;
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA_TIPS}
        renderItem={_renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={keyExtractor}
      />
    </View>
  );
});

export default TipsSearchResults;

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: Colors.WhiteSmoke,
  },
  contentContainerStyle: {
    paddingTop: 40,
    paddingBottom: getBottomSpace(),
    paddingHorizontal: 24,
  },
});

const DATA_TIPS = [
  {
    id: 0,
    title: "Flu & Cold",
    name: "Dr.Jonathan Peters",
    avatar: require("images/avatar/sarah.png"),
    image: require("images/down.png"),
    action: "shared",
    thanks: 12500,
    shares: 1200,
    quantity: "Integrative Medicine",
    shareOn: "Air Pollotion",
    subDescription:
      "Do's And Don'ts: Flu / cold tip: boil freshly sliced, ginger root in water until tea is tan. Add 3 tbsp of honey. Sip.",
    description:
      "Quitting smoking is the process of discontinuing the use of inhaled tobacco products.\n\nInteresting Fact: Smoking is the number one cause of preventable death in the United States.",
  },
  {
    id: 1,
    title: "Caring for Your Baby",
    name: "Dr.Maurice Watson",
    avatar: require("images/avatar/sarah.png"),
    image: require("images/down.png"),
    action: "shared",
    thanks: 125,
    shares: 13,
    quantity: "Integrative Medicine",
    shareOn: "Air Pollotion",
    subDescription:
      "Interesting Fact: Flu season is just around the corner. Ask doc/pharmacist when the vaccine will be available.",
    description:
      "Quitting smoking is the process of discontinuing the use of inhaled tobacco products.\n\nInteresting Fact: Smoking is the number one cause of preventable death in the United States.",
  },
];
