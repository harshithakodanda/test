import React, { memo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "components/Text";
import { Colors } from "configs";
import NumberAnswered from "components/NumberAnswered";

interface QuestionItemProps {
  question: string;
  numberAnswered: number;
  questionColor?: string;
  numberColor?: string;
}

const QuestionItem = memo(
  ({
    question,
    numberAnswered,
    questionColor,
    numberColor,
  }: QuestionItemProps) => {
    return (
      <TouchableOpacity style={styles.container}>
        <Text size={15} lineHeight={24} medium color={questionColor}>
          {question}
        </Text>
        <NumberAnswered numberOfAnswers={numberAnswered} />
      </TouchableOpacity>
    );
  }
);

export default QuestionItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.WhiteSmoke,
  },
});
