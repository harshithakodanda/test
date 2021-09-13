import React, { memo, useCallback } from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import { Colors, Routes } from "configs";
import ButtonLinear from "components/Buttons/ButtonLinear";
import scale from "utils/scale";
import ButtonBorder from "components/Buttons/ButtonBorder";
import { useNavigation } from "@react-navigation/native";
import Layout from "components/Layout/Layout";
import { useTheme } from "configs/Theme";
import Container from "components/Layout/Container";

interface EndCallProps {}

const EndCall = memo(({}: EndCallProps) => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();
  const onGoToDashBoard = useCallback(() => {
    navigate(Routes.MainTab);
  }, []);
  const onWriteAnAnswer = useCallback(() => {}, []);
  return (
    <Container style={[styles.container]}>
      <Text size={15} lineHeight={24} marginBottom={scale(88)}>
        Call Ended
      </Text>
      <View
        style={{ borderWidth: 3, borderRadius: 36, borderColor: Colors.White }}
      >
        <Image source={require("images/avatar/sarah.png")} />
      </View>
      <Text size={24} lineHeight={24} bold marginTop={scale(44)}>
        Inez Byrd
      </Text>
      <ButtonBorder
        title="Go to Home Dashboard"
        style={{ width: scale(230), marginTop: 32 }}
        onPress={onGoToDashBoard}
        borderColor={theme.innearColor}
      />
      <ButtonLinear
        white
        title="Write an Answer"
        style={{ width: scale(230), marginTop: 16 }}
        onPress={onWriteAnAnswer}
      />
    </Container>
  );
});

export default EndCall;

const styles = StyleSheet.create({
  container: {
    ...Theme.container,
    ...Theme.center,
  },
});
