import React, { useState, useEffect, useCallback, memo } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Text from "components/Text";
import { Colors, Routes } from "configs";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import Theme from "style/Theme";
import scale from "utils/scale";
import InputApp from "components/InputApp";
import validationEmail from "utils/validation/email";
import ButtonLinear from "components/Buttons/ButtonLinear";
import { useNavigation } from "@react-navigation/native";
import HeaderButton from "components/HeaderButton";
import Container from "components/Layout/Container";
import { useTheme } from "configs/Theme";

interface ForgetPasswordProps {}

const ForgetPassword = memo((props: ForgetPasswordProps) => {
  const [email, setEmail] = useState("lehieuds@gmail.com");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const { theme } = useTheme();
  useEffect(() => {
    const validation = validationEmail(email);
    setIsValidEmail(validation);
  }, [email]);
  const { goBack, navigate } = useNavigation();

  const onSendEmail = useCallback(() => {
    navigate(Routes.RecoveryPassword);
  }, [navigate]);

  return (
    <Container style={styles.container}>
      <HeaderButton />
      <View style={styles.content}>
        <Text type={"H2"} bold>
          Recovery Password
        </Text>
        <Text type="P6" style={{ marginTop: 16 }}>
          Reset code was sent to your email. Please enter the code and create
          new password.
        </Text>
      </View>
      {/* <InputApp
        title={"Email"}
        value={email}
        onChangeText={setEmail}
        marginTop={scale(40)}
        borderColor={isValidEmail ? Colors.TealBlue : Colors.Isabelline}
        autoFocus
      /> */}
      <InputApp
        backgroundColor={theme.backgroundItem}
        title={"Email"}
        value={email}
        onChangeText={setEmail}
        icon={
          <Image source={require("images/ic_accept.png")} style={styles.icon} />
        }
        isShowIcon={isValidEmail}
      />
      <ButtonLinear
        title={"Send Email"}
        onPress={onSendEmail}
        styleButton={styles.bottom}
        white
      />
    </Container>
  );
});

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    ...Theme.container,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.Platinum,
    ...Theme.center,
  },
  content: {
    marginTop: scale(40),
  },
  description: {
    marginTop: 16,
  },
  bottom: {
    marginTop: 24,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
