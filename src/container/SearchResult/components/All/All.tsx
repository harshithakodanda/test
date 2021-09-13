import React, { memo } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { width } from "configs/Const";
import { Colors } from "configs";
import { getBottomSpace } from "react-native-iphone-x-helper";
import TopicMore from "./TopicMore";
import Questions from "./Questions";
import Patients from "./Patients";
import Topics from "./Topics";
import Experts from "./Experts";

interface AllSearchResultsProps {}

const AllSearchResults = memo(({}: AllSearchResultsProps) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <TopicMore />
      <Questions />
      <Patients />
      <Topics />
      <Experts />
    </ScrollView>
  );
});

export default AllSearchResults;

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: Colors.WhiteSmoke,
  },
  contentContainerStyle: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: getBottomSpace() + 16,
  },
});
