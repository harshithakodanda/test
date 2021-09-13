import React, { memo } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import { Colors } from "configs";
import { SOURCE_ICON } from "images";
import TopicItem from "components/TopicItem";
import TrendingTopicItem from "./TrendingTopicItem";

interface TrendingTopicsProps {}

const TrendingTopics = memo(({}: TrendingTopicsProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text size={17} lineHeight={20} bold>
          Trending Topics
        </Text>
        <TouchableOpacity style={Theme.flexRow}>
          <Text
            blueLight
            size={13}
            lineHeight={20}
            color={Colors.BlueCrayola}
            medium
          >
            See All
          </Text>
          <Image source={SOURCE_ICON.arrowRight} />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingVertical: 24 }}
        contentContainerStyle={{ paddingLeft: 24 }}
      >
        {dataTrendingTopics.map((item) => (
          <TrendingTopicItem {...item} key={item.id.toString()} />
        ))}
      </ScrollView>
    </View>
  );
});

export default TrendingTopics;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  title: {
    ...Theme.flexRowSpace,
    paddingHorizontal: 24,
  },
});

const dataTrendingTopics = [
  {
    id: 0,
    image: require("images/down.png"),
    doctor: {
      name: "Madhu Kiran"
    },
    name: "Madhu Kiran",
  },
  {
    id: 1,
    image: require("images/down.png"),
    doctor: {
      name: "Vincent A"
    },
    name: "Taminflu",
  },
];
