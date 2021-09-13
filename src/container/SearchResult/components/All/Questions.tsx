import React, { memo } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import { Colors } from "configs";
import ButtonIcon from "components/ButtonIcon";
import { SOURCE_ICON } from "images";
import QuestionItem from "components/QuestionItem";
import Layout from "components/Layout/Layout";

interface QuestionsProps {}

const Questions = memo(({}: QuestionsProps) => {
  return (
    <Layout style={styles.container}>
      <View
        style={{
          ...Theme.flexRow,
          paddingHorizontal: 24,
          borderBottomWidth: 1,
          borderBottomColor: Colors.WhiteSmoke,
          paddingBottom: 16,
        }}
      >
        <ButtonIcon
          icon={SOURCE_ICON.help}
          size={32}
          borderRadius={8}
          color={Colors.TealBlue20}
          disabled
        />
        <Text size={15} lineHeight={18} bold marginLeft={16}>
          Questions
        </Text>
      </View>
      {dataQuestions.map((item) => (
        <QuestionItem {...item} key={item.id.toString()} />
      ))}
      <TouchableOpacity
        style={{
          padding: 12,
          ...Theme.center,
          borderTopColor: Colors.WhiteSmoke,
          borderTopWidth: 1,
          ...Theme.flexDirection,
        }}
      >
        <Text size={13} lineHeight={22} color={Colors.DodgerBlue}>
          See All
        </Text>
        <Image
          source={SOURCE_ICON.arrowRight}
          style={{ width: 16, height: 16, marginLeft: 4 }}
        />
      </TouchableOpacity>
    </Layout>
  );
});

export default Questions;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 16,
  },
});

const dataQuestions = [
  {
    id: 0,
    question: `Please provide some do's and don't for people who are sick with the flu or a cold.`,
    numberAnswered: 5,
  },
  {
    id: 1,
    question: `Can the flu shot give my baby the flu?`,
    numberAnswered: 2,
  },
  {
    id: 2,
    question: `What are bird flu symptoms, treatment?`,
    numberAnswered: 2,
  },
  {
    id: 3,
    question: `What are the differences between hay fever and flu?`,
    numberAnswered: 12,
  },
  {
    id: 4,
    question: `What does a tender abdomen after painful stomach flu mean?`,
    numberAnswered: 4,
  },
];
