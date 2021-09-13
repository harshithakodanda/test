import React, { memo, useCallback, useRef } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Text from "components/Text";
import ButtonLinear from "components/Buttons/ButtonLinear";
import { Colors } from "configs";
import ButtonIcon from "components/ButtonIcon";
import Theme from "style/Theme";
import DropList from "components/DropList";
import QuestionItem from "components/QuestionItem";
import { Transition, Transitioning } from "react-native-reanimated";

interface FooterProps {}

const Footer = memo(({}: FooterProps) => {
  const renderRelatedTopic = useCallback((item) => {
    return (
      <TouchableOpacity
        key={item.id.toString()}
        style={{
          padding: 24,
          borderBottomWidth: 1,
          borderBottomColor: Colors.WhiteSmoke,
        }}
      >
        <Text size={15} lineHeight={24} color={Colors.BlueCrayola} medium>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  }, []);

  const renderRelatedQuestion = useCallback((item) => {
    return (
      <QuestionItem
        key={item.id.toString()}
        question={item.question}
        numberAnswered={item.numberAnswered}
        questionColor={Colors.BlueCrayola}
      />
    );
  }, []);

  const transition = (
    <Transition.Sequence>
      <Transition.Out type="fade" />
      <Transition.Change interpolation="linear" />
      <Transition.In type="fade" />
    </Transition.Sequence>
  );
  const transRef: any = useRef<any>();

  return (
    <Transitioning.View
      style={styles.container}
      transition={transition}
      ref={transRef}
    >
      <ButtonLinear
        white
        title="More Answers"
        style={{ marginTop: 14 }}
        leftChildren={
          <Image
            source={require("images/ic_arr_down.png")}
            style={{ marginRight: 8 }}
          />
        }
      />
      <DropList
        data={dataRelatedTopic}
        renderItem={renderRelatedTopic}
        numberShow={4}
        title={"Related Topics"}
        icon={require("images/ic_topic.png")}
        refWrap={transRef}
      />
      <DropList
        data={dataRelatedQuestions}
        renderItem={renderRelatedQuestion}
        numberShow={3}
        title={"Related Questions"}
        icon={require("images/ic_help_white.png")}
        refWrap={transRef}
      />
    </Transitioning.View>
  );
});

export default Footer;

const styles = StyleSheet.create({
  container: {},
});

const dataRelatedTopic = [
  {
    id: 0,
    name: "Flu (Influenza)",
  },
  {
    id: 1,
    name: "Heart diseases",
  },
  {
    id: 2,
    name: "Asthma",
  },
  {
    id: 3,
    name: "Heart attack",
  },
  {
    id: 4,
    name: "Heart attack",
  },
  {
    id: 5,
    name: "Flu (Influenza)",
  },
];

const dataRelatedQuestions = [
  {
    id: 0,
    question: `Why is it when i'm sick, it gets worse @ night.Wether it's flu or cold?`,
    numberAnswered: 5,
  },
  {
    id: 1,
    question: `Is it true that if you get a cold, flu etc. And you count 3days backwards, that is the day you caught the germ to...`,
    numberAnswered: 2,
  },
  {
    id: 2,
    question: `I've been getting excessive nose bleeds all day. Don't smoke, or do drugs, and don't drink, i don't have asthma...`,
    numberAnswered: 8,
  },
  {
    id: 3,
    question: `Why is it when i'm sick, it gets worse @ night.Wether it's flu or cold?`,
    numberAnswered: 5,
  },
  {
    id: 4,
    question: `Why is it when i'm sick, it gets worse @ night.Wether it's flu or cold?`,
    numberAnswered: 5,
  },
];
