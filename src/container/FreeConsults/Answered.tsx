import React, { memo, useCallback } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { width } from "configs/Const";
import { getBottomSpace } from "react-native-iphone-x-helper";
import keyExtractor from "utils/keyExtractor";
import FreeConsultsItem from "components/FreeConsultsItem";
import Container from "components/Layout/Container";
import ButtonLinear from "components/Buttons/ButtonLinear";

interface AnsweredConsultsProps {}

const AnsweredConsults = memo(({}: AnsweredConsultsProps) => {
  const _renderItem = useCallback(({ item }) => {
    return <FreeConsultsItem {...item} />;
  }, []);
  return (
    <Container style={styles.container}>
      <FlatList
        data={answeredConsultsData}
        renderItem={_renderItem}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={keyExtractor}
      />
     
    </Container>
  );
});

export default AnsweredConsults;

const styles = StyleSheet.create({
  container: {
    width: width,
    paddingHorizontal: 24,
  },
  contentContainerStyle: {
    paddingTop: 40,
    paddingBottom: getBottomSpace(),
  },
  button: {
    marginHorizontal: 24,
    marginTop: 24,
  },
});

const answeredConsultsData = [
  {
    id: 0,
    question: `Is it possible for people recover from a corona radiator stroke?`,
    numberOfAnswers: 12,
    doctor: {
      name: "Martin Wallace",
      avatar: require("images/avatar/Rounded.png"),
    },
    image: require("images/down.png"),
    answer: `People recover from strokes in many areas of the brain. The amount of recovery will...`,
  },
  
];
