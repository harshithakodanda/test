import React, { memo, useCallback } from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import { Colors, Routes } from "configs";
import scale from "utils/scale";
import ButtonLinear from "components/Buttons/ButtonLinear";
import { useNavigation } from "@react-navigation/native";
import Layout from "components/Layout/Layout";
import Container from "components/Layout/Container";

interface SignUpSuccessfulProps {
  route:any
}

const SignUpSuccessful = memo(({route}: SignUpSuccessfulProps) => {
  const { navigate } = useNavigation();
  const onPressFillProfile = useCallback(() => {
    navigate(Routes.BasicInformation);
  }, [navigate]);

  return (
    <Container style={styles.container}>
      <Image
        source={require("images/img_success_1.png")}
        style={styles.successImage}
      />
      <Text size={20} lineHeight={24} bold>
        Welcome to My Finance Wellness!
      </Text>
      <Text size={15} lineHeight={24} center marginTop={16}>
       Help us to know you better by filling out your profile. Thanks!
      </Text>
      <ButtonLinear
        white
        title={"Update Profile"}
        onPress={onPressFillProfile}
        style={styles.buttonLinear}
      /> 
     
    </Container>
  );
});

export default SignUpSuccessful;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Theme.center,
    paddingHorizontal: 24,
  },
  buttonLinear: {
    paddingHorizontal: 32,
    marginTop: 32,
  },
  buttonTop: {
    marginRight: 4,
    marginTop: 30,

  },
  successImage: {
    width: scale(160, true),
    height: scale(160, true),
    marginBottom: scale(55, true),
  },
});
