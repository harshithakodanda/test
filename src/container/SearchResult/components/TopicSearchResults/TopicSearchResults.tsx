import React, { memo } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { width } from "configs/Const";
import { Colors, Routes } from "configs";
import { SOURCE_IMAGE } from "images/MyWorkTopic";
import TopicItem from "components/TopicItem";
import { useNavigation } from "@react-navigation/native";
import keyExtractor from "utils/keyExtractor";
import { getBottomSpace } from "react-native-iphone-x-helper";

interface TopicSearchResultsProps {}

const TopicSearchResults = memo(({}: TopicSearchResultsProps) => {
  const { navigate } = useNavigation();

  const onTopicItem = React.useCallback((item: any) => {
    navigate(Routes.TopicDetails, item);
  }, []);

  const renderTopicItem = React.useCallback(({ item }) => {
    return <TopicItem onPress={() => onTopicItem(item)} {...item} />;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={TOPICS_SEARCH_EXAMPLE_DATA}
        renderItem={renderTopicItem}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
});

export default TopicSearchResults;

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

const TOPICS_SEARCH_EXAMPLE_DATA = [
  {
    id: 0,
    image: SOURCE_IMAGE.chickenpox,
    title: "Chickenpox (Condition)",
    name: "Dr.Martin Wallace",
    faculty: "Allergy & Immunology",
    subDescription:
      "Chickenpox is an illness caused by a virus known as varicella zoster.",
    description:
      "Caused by the varicella-zoster virus, chicken pox results in a blister rash that starts on the stomach, back, and face and spreads throughout the entire body. These small itchy blisters eventually scab over. Associated symptoms include itching, fatigue, malaise, and a fever. The most effective method to prevent spreading of the varicella virus is to get the vaccination.",
  },
  {
    id: 1,
    image: SOURCE_IMAGE.cardiology,
    title: "Cardiology (Topic)",
    name: "Dr.Martin Wallace",
    faculty: "Integrative Medicine",
    subDescription: "Topic description.",
    description:
      "Caused by the varicella-zoster virus, chicken pox results in a blister rash that starts on the stomach, back, and face and spreads throughout the entire body. These small itchy blisters eventually scab over. Associated symptoms include itching, fatigue, malaise, and a fever. The most effective method to prevent spreading of the varicella virus is to get the vaccination.",
  },
];
