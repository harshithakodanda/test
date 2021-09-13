import React, { memo, useCallback } from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import Theme from "style/Theme";
import Text from "components/Text";

interface NumberAnsweredProps {
  numberOfAnswers: number;
}

export default memo(({ numberOfAnswers }: NumberAnsweredProps) => {
  const onPressShowMoreAnswered = useCallback(() => {}, []);
  return (
    <TouchableOpacity
      style={{ ...Theme.flexRow, marginTop: 12, marginBottom: 16 }}
      onPress={onPressShowMoreAnswered}
    >
      <Image source={require("images/doctor-answer.png")} />
      <Text size={13} lineHeight={16} bold marginLeft={9}>
        {numberOfAnswers}
      </Text>
      <Text size={13} lineHeight={16} marginLeft={4}>
        doctors answered
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {},
});
