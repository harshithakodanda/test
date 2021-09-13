import React, { memo, useCallback } from "react";
import { StyleSheet, ScrollView, FlatList, View } from "react-native";
import { width } from "configs/Const";
import { Colors } from "configs";
import { getBottomSpace } from "react-native-iphone-x-helper";
import keyExtractor from "utils/keyExtractor";
import FreeConsultsItem from "components/FreeConsultsItem";

interface AnswerSearchResultsProps {}

const AnswerSearchResults = memo(({}: AnswerSearchResultsProps) => {
  const _renderItem = useCallback(({ item }) => {
    return <FreeConsultsItem {...item} />;
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={answerData}
        renderItem={_renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={keyExtractor}
      />
    </View>
  );
});

export default AnswerSearchResults;

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

const answerData = [
  {
    id: 0,
    question: `Please provide some do's and don'ts for people who are sick with the flu or a cold.`,
    numberOfAnswers: 12,
    doctor: {
      name: "Sandra Klevins",
      avatar: require("images/avatar/sarah.png"),
    },
    image: require("images/down.png"),
    answer: `Always use your own pen at the doctor's office and not the pen 100's of infected patients touched.`,
  },
  {
    id: 1,
    question: `What does a tender abdomen after painful stomach flu mean?`,
    numberOfAnswers: 5,
    doctor: {
      name: "Francisco Webster",
      avatar: require("images/avatar/sarah.png"),
    },
    image: require("images/down.png"),
    answer: `Always use your own pen at the doctor's office and not the pen 100's of infected patients touched...`,
  },
];
